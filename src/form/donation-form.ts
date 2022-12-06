import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT } from '../donations/pit-calculations';
import { calculateForCIT } from '../donations/cit-calculations';
import { CurrencyFormatter } from '../utils/currency-formatter';
import { applyValidation, isPositiveNumber, isValidNumber, Validator } from './form-validation';

import resetStyles from '../styles/reset.scss';
import formStyles from './donation-form.scss';
import radioStyles from './radio-option.scss';
import { StyleBuilder } from '../utils/style-builder';

interface IDonationFormState {
    selectedTax?: Tax;
    selectedIncome?: IncomeType;
    monthlyIncome?: number;
    annualIncome?: number;
}

class DonationForm extends window.HTMLElement {
    private shadow: ShadowRoot;
    public state: IDonationFormState = {};
    private readonly formatter: CurrencyFormatter = new CurrencyFormatter('PLN', 'pl-PL');

    private selectors: { [key: string]: Element } = {};

    private taxRadio = ['.tax-pit .text', '.tax-pit19 .text', '.tax-cit .text'];

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const styleBuilder = new StyleBuilder();

        this.shadow.adoptedStyleSheets = styleBuilder
            .addStyleSheet(resetStyles)
            .addStyleSheet(formStyles)
            .addStyleSheet(radioStyles)
            .build();
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
        const template = (await getTemplate(
            process.env.NODE_ENV === 'development' ? 'src/form/form.html' : './form.html',
        )) as Element & { content: any };
        this.shadow.appendChild(template?.content.cloneNode(true));

        this.onRadioChange(
            '.tax-pit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.PIT, '.tax-pit .text')),
        );
        this.onRadioChange(
            '.tax-pit19 .radio-input',
            preventPropagationInvoke(() => this.showIncorectTaxMessage(true, '.tax-pit19 .text')),
        );
        this.onRadioChange(
            '.tax-cit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.CIT, '.tax-cit .text')),
        );

        this.onInputChange('.month-income .income-input', this.handleMonthIcomeInput);

        this.onInputChange('.annual-income .income-input', this.handleAnnualIncomeInput);

        this.onClick('#calculate-donation-btn', preventPropagationInvoke(this.handleCalculation));
        this.onClick('#change-data-btn', preventPropagationInvoke(this.handleChangeData));

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

    onRadioChange = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('change', callback);
    };
    onInputChange = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('input', callback);
    };
    onClick = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('click', callback);
    };

    find = (selector: string) => {
        return this.shadow.querySelector(selector);
    };

    isValid = (value: any) => !!value && isValidNumber(value) && isPositiveNumber(value);

    handleMonthIcomeInput = (e: Event) => {
        if (e.currentTarget) {
            const inputValue = (e.currentTarget as HTMLInputElement).value;
            const formattedValue = inputValue.replaceAll(',', '.');
            const numericValue = parseFloat(formattedValue);
            this.updateState({
                monthlyIncome: numericValue,
                annualIncome: !!numericValue && this.isValid(numericValue) ? 12 * numericValue : undefined,
            });
        }
    };

    handleAnnualIncomeInput = (e: Event) => {
        if (e.currentTarget) {
            const inputValue = (e.currentTarget as HTMLInputElement).value;
            const formattedValue = inputValue.replaceAll(',', '.');
            const numericValue = parseFloat(formattedValue);
            this.updateState({
                monthlyIncome:
                    !!numericValue && this.isValid(numericValue)
                        ? parseFloat((numericValue / 12).toFixed(2))
                        : undefined,
                annualIncome: numericValue,
            });
        }
    };

    handleTaxSelection = (tax: Tax, selector: string) => {
        this.showIncorectTaxMessage(false, selector);
        this.addSelectedClass(this.taxRadio, selector);

        this.updateState({ selectedTax: tax });
    };

    showIncorectTaxMessage = (visible: boolean, selector: string) => {
        this.addSelectedClass(this.taxRadio, selector);

        if (visible) {
            this.selectors.incorrectTax?.classList.add('visible');
            this.selectors.incomeInput?.classList.remove('visible');
        } else {
            this.selectors.incorrectTax?.classList.remove('visible');
            this.selectors.incomeInput?.classList.add('visible');
        }
    };

    handleCalculation = () => {
        if (this.state.selectedTax && isValidNumber(this.state.annualIncome)) {
            const result =
                this.state.selectedTax === Tax.PIT
                    ? calculateForPIT(this.state.annualIncome || 0)
                    : calculateForCIT(this.state.annualIncome || 0);
            const donation = this.formatter.format(result.donationSum);
            const taxFree = this.formatter.format(result.taxDeduction);

            this.selectors.taxSelection?.classList.remove('visible');
            this.selectors.incomeInput?.classList.remove('visible');
            this.selectors.actions?.classList.add('visible');
            this.selectors.calculateButton?.classList.remove('visible');
            this.selectors.changeButton?.classList.add('visible');

            this.selectors.taxOutput.innerHTML = `
                <h3>Twój wynik</h3>
                <p>
                    <span>W zeznaniu podatkowym możesz odliczyć darowizny w maksymalnej kwocie około* </span>
                    <strong class="donation-result">${donation}</strong>
                </p>
                <p>
                    <span>W ten sposób szacunkowo* zapłacisz nawet o </span>
                    <strong class="tax-result">${taxFree}</strong>
                    <span> mniej podatku!</span>
                </p>
            `;
        }
    };

    handleChangeData = () => {
        this.selectors.taxSelection?.classList.add('visible');
        this.selectors.incomeInput?.classList.add('visible');
        this.selectors.actions?.classList.remove('visible');
        this.selectors.calculateButton?.classList.add('visible');
        this.selectors.changeButton?.classList.remove('visible');
        this.selectors.taxOutput.innerHTML = '';
    };

    /**
     * Update component rendering
     */
    async render() {
        this.selectors.taxSelection = this.find('section.tax-type-select')!;
        this.selectors.incomeInput = this.find('section.income-input')!;
        this.selectors.incorrectTax = this.find('section.incorrect-tax')!;
        this.selectors.actions = this.find('section.actions')!;
        this.selectors.taxOutput = this.find('.tax-output')!;
        this.selectors.calculateButton = this.find('button#calculate-donation-btn')! as HTMLButtonElement;
        this.selectors.changeButton = this.find('button#change-data-btn')! as HTMLButtonElement;

        this.renderInputField(
            '.month-income',
            this.state.monthlyIncome || 0,
            [isValidNumber, 'Miesięczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Miesięczny dochód powinien być dodatni'],
        );

        this.renderInputField(
            '.annual-income',
            this.state.annualIncome || 0,
            [isValidNumber, 'Roczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Roczny dochód powinien być dodatni'],
        );

        (this.selectors.calculateButton as HTMLButtonElement).disabled =
            !this.state.selectedTax || !this.isValid(this.state.annualIncome);
    }

    renderInputField = (selector: string, value: number, ...validators: Validator<number>[]) => {
        const inputElement = this.find(`${selector} .income-input`) as HTMLInputElement;
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
