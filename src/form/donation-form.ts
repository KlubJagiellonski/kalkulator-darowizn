import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT } from '../donations/pit-calculations';
import { calculateForCIT } from '../donations/cit-calculations';
import { CurrencyFormatter } from '../utils/currency-formatter';
import { applyValidation, isPositiveNumber, isValidNumber } from './form-validation';

import '../styles/reset.scss';
import './donation-form.scss';
import './radio-option.scss';

interface IDonationFormState {
    selectedTax?: Tax;
    selectedIncome?: IncomeType;
    monthlyIncome?: number;
    annualIncome?: number;
}

class DonationForm extends HTMLElement {
    private shadow: ShadowRoot;
    private state: IDonationFormState;
    private formatter: CurrencyFormatter;

    private taxRadio = ['.tax-pit .text', '.tax-pit19 .text', '.tax-cit .text'];

    constructor() {
        super();

        this.state = {};
        this.shadow = this.attachShadow({ mode: 'open' });
        this.formatter = new CurrencyFormatter('PLN', 'pl-PL');
    }

    updateState(newState: Partial<IDonationFormState>) {
        this.state = {
            ...this.state,
            ...newState,
        };
        this.render();
    }

    /**
     * Invoked when web component is rendered into HTML document
     */
    async connectedCallback() {
        const template = await getTemplate('./form.html');
        this.shadow.appendChild(template?.content.cloneNode(true));

        this.setChangeHandler(
            '.tax-pit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.PIT, '.tax-pit .text')),
        );
        this.setChangeHandler(
            '.tax-pit19 .radio-input',
            preventPropagationInvoke(() => this.showIncorectTaxMessage(true, '.tax-pit19 .text')),
        );
        this.setChangeHandler(
            '.tax-cit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.CIT, '.tax-cit .text')),
        );

        this.setInputHandler('.month-income .income-input', this.handleMonthIcomeInput);

        this.setInputHandler('.annual-income .income-input', this.handleAnnualIncomeInput);

        this.setClickHandler('#calculate-donation-btn', preventPropagationInvoke(this.handleCalculation));

        this.render();
    }

    addSelectedClass = (selectors: string[], selectedValue: string): void => {
        selectors.forEach((selector: string) => {
            const classes = this.find(selector)?.classList;
            if (classes) {
                selector === selectedValue ? classes.add('selected') : classes?.remove('selected');
            }
        });
    };

    setChangeHandler = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('change', callback);
    };
    setInputHandler = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('input', callback);
    };
    setClickHandler = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('click', callback);
    };

    find = (selector: string) => {
        return this.shadow.querySelector(selector);
    };

    isValid = (value: any) => isValidNumber(value) && isPositiveNumber(value);

    handleMonthIcomeInput = (e: Event) => {
        if (e.currentTarget) {
            this.updateState({
                monthlyIncome: e.currentTarget.value,
                annualIncome:
                    !!e.currentTarget.value && this.isValid(e.currentTarget.value)
                        ? 12 * e.currentTarget.value
                        : undefined,
            });
        }
    };

    handleAnnualIncomeInput = (e: Event) => {
        if (e.currentTarget) {
            this.updateState({
                monthlyIncome:
                    !!e.currentTarget.value && this.isValid(e.currentTarget.value)
                        ? (e.currentTarget.value / 12).toFixed(2)
                        : undefined,
                annualIncome: e.currentTarget.value,
            });
        }
    };

    handleTaxSelection = (tax: Tax, selector: string) => {
        this.showIncorectTaxMessage(false, selector);
        this.addSelectedClass(this.taxRadio, selector);

        this.updateState({ selectedTax: tax });
    };

    showIncorectTaxMessage = (visible: boolean, selector: string) => {
        const incorrectTax = this.find('section.incorrect-tax');
        const incomeInput = this.find('section.income-input');
        this.addSelectedClass(this.taxRadio, selector);

        if (visible) {
            incorrectTax?.classList.add('visible');
            incomeInput?.classList.remove('visible');
        } else {
            incorrectTax?.classList.remove('visible');
            incomeInput?.classList.add('visible');
        }
    };

    handleCalculation = () => {
        if (this.state.selectedTax && isValidNumber(this.state.annualIncome)) {
            const taxOutput = this.find('.tax-output')!;
            const result =
                this.state.selectedTax === Tax.PIT
                    ? calculateForPIT(this.state.annualIncome || 0)
                    : calculateForCIT(this.state.annualIncome || 0);
            const donation = this.formatter.format(result.donationSum);
            const taxFree = this.formatter.format(result.taxDeduction);

            taxOutput.innerHTML = `
                <p>Od podatku możesz odliczyć darowizny w maksymalnej kwocie: <strong>${donation}</strong></p>
                <p>W ten sposób zapłacisz nawet o <strong>${taxFree}</strong> mniej podatku!</p>
            `;
        }
    };

    /**
     * Update component rendering
     */
    async render() {
        this.renderInput(
            '.month-income',
            this.state.monthlyIncome || 0,
            [isValidNumber, 'Miesięczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Miesięczny dochód powinien być dodatni'],
        );

        this.renderInput(
            '.annual-income',
            this.state.annualIncome || 0,
            [isValidNumber, 'Roczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Roczny dochód powinien być dodatni'],
        );

        const button = this.find('#calculate-donation-btn')! as HTMLButtonElement;
        button.disabled = !this.state.selectedTax || !this.state.annualIncome;
    }

    renderInput = (selector: string, value: number, ...validators: Validator<number>[]) => {
        const inputElement = this.find(selector + ' .income-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = value ? value.toString() : '';
            const wrapper = this.find(`${selector} .validation`);
            if (wrapper) {
                applyValidation(wrapper, value, validators);
            }
        }
    };
}

if (!customElements.get('donation-form')) {
    customElements.define('donation-form', DonationForm);
}
