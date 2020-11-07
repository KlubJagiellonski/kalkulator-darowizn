import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT } from '../donations/pit-calculations';
import { calculateForCIT } from '../donations/cit-calculations';
import { CurrencyFormatter } from '../utils/currency-formatter';

import '../styles/reset.scss';
import './donation-form.scss';

interface IDonationFormState {
    selectedTax?: Tax;
    selectedIncome?: IncomeType;
    monthlyIncome?: number;
    annualIncome?: number;
}

const isValidNumber = (value: any) => !value || value.length === 0 || (!Number.isNaN(value) && value > -1);

class DonationForm extends HTMLElement {
    private shadow: ShadowRoot;
    private state: IDonationFormState;

    constructor() {
        super();

        this.state = {};
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    updateState(newState: Partial<IDonationFormState>) {
        this.state = {
            ...this.state,
            ...newState,
        };
        this.render();
    }

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
        this.updateState({
            monthlyIncome: e.currentTarget.value,
            annualIncome: 12 * e.currentTarget.value,
        });
    };

    handleAnnualIncomeInput = (e: Event) => {
        this.updateState({
            monthlyIncome:
                !!e.currentTarget.value && isValidNumber(e.currentTarget.value)
                    ? (e.currentTarget.value / 12).toFixed(2)
                    : undefined,
            annualIncome: e.currentTarget.value,
        });
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
        const taxOutput = this.find('.tax-output');

        const formatter = new CurrencyFormatter('PLN', 'pl-PL');

        if (this.state.selectedTax && this.state.annualIncome) {
            const result =
                this.state.selectedTax === Tax.PIT
                    ? calculateForPIT(this.state.annualIncome)
                    : calculateForCIT(this.state.annualIncome);
            const donation = formatter.format(result.donationSum);
            const taxFree = formatter.format(result.taxDeduction.toFixed(2));

            taxOutput?.innerHTML = `
                <p>Od podatku możesz odliczyć darowizny w maksymalnej kwocie:</p>
                <div class="max-donation">${donation}</div>
                <p>W ten sposób zapłacisz nawet o <strong>${taxFree}</strong> mniej podatku!</p>
            `;
        }
    };

    validateNumberInput = (elementClass: string, value: number, message: string) => {
        const wrapper = this.find(`${elementClass} .input-wrapper .validation`);
        wrapper?.innerHTML = '';
        if (!isValidNumber(value)) {
            const validationMessage = document.createElement('div');
            validationMessage.className = `validation-message ${elementClass}`;
            validationMessage?.innerHTML = message;
            wrapper?.appendChild(validationMessage);
        }
    };

    async render() {
        const monthIncomeInput = this.find('.month-income .income-input');
        monthIncomeInput?.value = this.state.monthlyIncome || '';
        monthIncomeInput.disabled = this.state.selectedIncome !== IncomeType.MONTHLY;
        this.validateNumberInput('.month-income', this.state.monthlyIncome, 'Miesięczny dochód powinien być liczbą');

        const annualIncomeInput = this.find('.annual-income .income-input');
        annualIncomeInput?.value = this.state.annualIncome || '';
        annualIncomeInput.disabled = this.state.selectedIncome !== IncomeType.ANNUAL;
        this.validateNumberInput('.annual-income', this.state.annualIncome, 'Roczny dochód powinien być liczbą');

        const button = this.find('#calculate-donation-btn');
        button.disabled = !this.state.selectedTax || !this.state.annualIncome;
    }
}

if (!customElements.get('donation-form')) {
    customElements.define('donation-form', DonationForm);
}
