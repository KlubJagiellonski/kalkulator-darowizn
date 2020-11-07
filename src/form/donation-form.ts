import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT } from '../donations/pit-calculations';
import { calculateForCIT } from '../donations/cit-calculations';
import { CurrencyFormatter } from '../utils/currency-formatter';
import { applyValidation, isValidNumber } from './form-validation';

import '../styles/reset.scss';
import './donation-form.scss';

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
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.PIT)),
        );
        this.setChangeHandler(
            '.tax-pit19 .radio-input',
            preventPropagationInvoke(() => this.showIncorectTaxMessage(true)),
        );
        this.setChangeHandler(
            '.tax-cit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.CIT)),
        );

        this.setChangeHandler('.month-income .radio-input', this.handleIcomeSelection(IncomeType.MONTHLY));
        this.setInputHandler('.month-income .income-input', this.handleMonthIcomeInput);

        this.setChangeHandler('.annual-income .radio-input', this.handleIcomeSelection(IncomeType.ANNUAL));
        this.setInputHandler('.annual-income .income-input', this.handleAnnualIncomeInput);

        this.setClickHandler('#calculate-donation-btn', preventPropagationInvoke(this.handleCalculation));

        this.render();
    }

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

    handleMonthIcomeInput = (e: Event) => {
        if (e.currentTarget) {
            this.updateState({
                monthlyIncome: e.currentTarget.value,
                annualIncome: 12 * e.currentTarget.value,
            });
        }
    };

    handleAnnualIncomeInput = (e: Event) => {
        if (e.currentTarget) {
            this.updateState({
                monthlyIncome:
                    !!e.currentTarget.value && isValidNumber(e.currentTarget.value)
                        ? (e.currentTarget.value / 12).toFixed(2)
                        : undefined,
                annualIncome: e.currentTarget.value,
            });
        }
    };

    handleTaxSelection = (tax: Tax) => {
        this.showIncorectTaxMessage(false);

        this.updateState({ selectedTax: tax });
    };

    showIncorectTaxMessage = (visible: boolean) => {
        const incorrectTax = this.find('section.incorrect-tax');
        const incomeInput = this.find('section.income-input');

        if (visible) {
            incorrectTax?.classList.add('visible');
            incomeInput?.classList.remove('visible');
        } else {
            incorrectTax?.classList.remove('visible');
            incomeInput?.classList.add('visible');
        }
    };

    handleIcomeSelection = (type: IncomeType) => (e: Event) => {
        this.updateState({ selectedIncome: type });
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
                <p>Od podatku możesz odliczyć darowizny w maksymalnej kwocie:</p>
                <div class="max-donation">${donation}</div>
                <p>W ten sposób zapłacisz nawet o <strong>${taxFree}</strong> mniej podatku!</p>
            `;
        }
    };

    /**
     * Update component rendering
     */
    async render() {
        const monthlyInputDisable = this.state.selectedIncome !== IncomeType.MONTHLY;
        this.renderInput('.month-income', this.state.monthlyIncome || 0, monthlyInputDisable, [
            isValidNumber,
            'Miesięczny dochód powinien być liczbą',
        ]);
        const annualyIncomeDisable = this.state.selectedIncome !== IncomeType.ANNUAL;
        this.renderInput('.annual-income', this.state.annualIncome || 0, annualyIncomeDisable, [
            isValidNumber,
            'Roczny dochód powinien być liczbą',
        ]);

        const button = this.find('#calculate-donation-btn')! as HTMLButtonElement;
        button.disabled = !this.state.selectedTax || !this.state.annualIncome;
    }

    renderInput = (selector: string, value: number, disabled: boolean, ...validators: Validator<number>[]) => {
        const inputElement = this.find(selector + ' .income-input') as HTMLInputElement;
        if (inputElement) {
            inputElement.value = value ? value.toString() : '';
            inputElement.disabled = disabled;
            const wrapper = this.find(`${selector} .input-wrapper .validation`);
            if (wrapper) {
                applyValidation(wrapper, value, validators);
            }
        }
    };
}

if (!customElements.get('donation-form')) {
    customElements.define('donation-form', DonationForm);
}
