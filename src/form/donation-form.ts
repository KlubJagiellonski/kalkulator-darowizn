import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT } from '../donations/pit-calculations';
import { calculateForCIT } from '../donations/cit-calculations';

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

        const taxPIT = this.find('.tax-pit .radio-input');
        taxPIT?.addEventListener(
            'change',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.PIT)),
        );

        const taxPIT19 = this.find('.tax-pit19 .radio-input');
        taxPIT19?.addEventListener(
            'change',
            preventPropagationInvoke(() => this.setIncorectTaxMessage(true)),
        );

        const taxCIT = this.find('.tax-cit .radio-input');
        taxCIT?.addEventListener(
            'change',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.CIT)),
        );

        const monthIncomeRadio = this.find('.month-income .radio-input');
        monthIncomeRadio?.addEventListener('change', this.handleIcomeSelection(IncomeType.MONTHLY));

        const monthIncomeInput = this.find('.month-income .income-input');
        monthIncomeInput?.addEventListener('input', this.handleMonthIcomeInput);

        const annualIncomeRadio = this.find('.annual-income .radio-input');
        annualIncomeRadio?.addEventListener('change', this.handleIcomeSelection(IncomeType.ANNUAL));

        const annualIncomeInput = this.find('.annual-income .income-input');
        annualIncomeInput?.addEventListener('input', this.handleAnnualIncomeInput);

        const button = this.find('#calculate-donation-btn');
        button?.addEventListener('click', preventPropagationInvoke(this.handleCalculation));

        this.render();
    }

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
        this.setIncorectTaxMessage(false);

        this.updateState({ selectedTax: tax });
    };

    setIncorectTaxMessage = (visible: boolean) => {
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

        const formatter = new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
            minimumFractionDigits: 2,
        });

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
