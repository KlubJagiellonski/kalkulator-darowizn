import { Tax, IncomeType } from '../donations/types';
import { getTemplate, preventPropagationInvoke } from '../utils/templates';
import { calculateForPIT2022 } from '../donations/2022/pit-calculations-2022';
import { calculateForCIT2022 } from '../donations/2020/cit-calculations';
import { CurrencyFormatter } from '../utils/currency-formatter';
import { applyValidation, isPositiveNumber, isValidNumber, Validator } from './form-validation';

import resetStyles from '../styles/reset.scss';
import formStyles from './donation-form.scss';
import radioStyles from './radio-option.scss';
import { StyleBuilder } from '../utils/style-builder';
import { calculateForPPE2022 } from '../donations/2022/ppe-calculations-2022';
import { IncomeValue } from './income-value';

interface IDonationFormState {
    selectedTax?: Tax;
    selectedIncome?: IncomeType;
    ppeRate?: number;
    monthly: IncomeValue;
    annual: IncomeValue;
}

class DonationForm extends window.HTMLElement {
    private shadow: ShadowRoot;
    public state: IDonationFormState = { monthly: IncomeValue.fromString(), annual: IncomeValue.fromString() };
    private readonly formatter: CurrencyFormatter = new CurrencyFormatter('PLN', 'pl-PL');

    private selectors: { [key: string]: Element } = {};

    private taxRadioSelectors = ['.tax-pit .text', '.tax-pit19 .text', '.tax-ppe .text', '.tax-cit .text'];

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
            preventPropagationInvoke(() => this.showIncorectTaxMessage('.tax-pit19 .text')),
        );
        this.onRadioChange(
            '.tax-ppe .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.PPE, '.tax-ppe .text')),
        );
        this.onRadioChange(
            '.tax-cit .radio-input',
            preventPropagationInvoke(() => this.handleTaxSelection(Tax.CIT, '.tax-cit .text')),
        );

        this.onSelectChange('.ppe-dropdown .rate-dropdown', this.handlePpeRateDropdown);

        this.onInputChange('.month-income .income-input', this.handleMonthIncomeInput);

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

    toggleClass = (selectors: string[], selectedValue: string): void => {
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
    onSelectChange = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('change', callback);
    };
    onClick = (selector: string, callback: (e: Event) => void) => {
        const element = this.find(selector);
        element?.addEventListener('click', callback);
    };

    find = (selector: string) => {
        return this.shadow.querySelector(selector);
    };

    isValid = (value: number | undefined) => !!value && isValidNumber(value) && isPositiveNumber(value);
    isValidPercentage = (value: number | undefined) => !!value && this.isValid(value) && value < 100;

    countNumber = (input: HTMLInputElement) => {
        const inputValue = input.value;
        const formattedValue = inputValue.replaceAll(' ', '').replace(',', '.').replace(/\.$/, '.0');
        return isValidNumber(formattedValue) ? parseFloat(formattedValue) : undefined;
    };

    roundNumber = (value: number, decimals: number) => {
        var scale = Math.pow(10, decimals);
        var rounded = Math.round((value + Number.EPSILON) * scale) / scale;
        return rounded;
    };

    handlePpeRateDropdown = (e: Event) => {
        if (e.currentTarget) {
            const element = e.currentTarget as HTMLInputElement;
            const value = this.countNumber(element);
            this.updateState({
                ppeRate: value,
            });
        }
    };

    handleMonthIncomeInput = (e: Event) => {
        if (e.currentTarget) {
            const element = e.currentTarget as HTMLInputElement;
            const value = this.countNumber(element);
            this.updateState({
                monthly: IncomeValue.fromString(element.value),
                annual: IncomeValue.fromNumber(!!value ? 12 * value : undefined),
            });
        }
    };

    handleAnnualIncomeInput = (e: Event) => {
        if (e.currentTarget) {
            const element = e.currentTarget as HTMLInputElement;
            const value = this.countNumber(element);
            this.updateState({
                monthly: IncomeValue.fromNumber(!!value ? value / 12 : undefined),
                annual: IncomeValue.fromString(element.value),
            });
        }
    };

    handleTaxSelection = (tax: Tax, selector: string) => {
        this.hideIncorectTaxMessage(selector);
        this.addSelectedClass(this.taxRadioSelectors, selector);

        if (tax === Tax.PPE) {
            this.selectors.ppeInput?.classList.add('visible');
            this.selectors.ppeInput?.classList.remove('hidden');
        } else {
            this.selectors.ppeInput?.classList.remove('visible');
            this.selectors.ppeInput?.classList.add('hidden');
        }
        this.updateState({ selectedTax: tax });
    };

    showIncorectTaxMessage = (selector: string) => {
        this.addSelectedClass(this.taxRadioSelectors, selector);

        this.selectors.incorrectTax?.classList.add('visible');
        this.selectors.incomeInput?.classList.remove('visible');
        this.hidePPETaxRate();
    };

    hideIncorectTaxMessage = (selector: string) => {
        this.addSelectedClass(this.taxRadioSelectors, selector);

        this.selectors.incorrectTax?.classList.remove('visible');
        this.selectors.incomeInput?.classList.add('visible');
        this.showPPETaxRate();
    };

    handleCalculation = () => {
        if (this.state.selectedTax && isValidNumber(this.state.annual.value)) {
            let result = this.calculateResult(this.state.selectedTax);
            const donation = this.formatter.format(result.donationSum);
            const taxFree = this.formatter.format(result.taxDeduction);

            this.hideIncomeForm();
            this.showResultPanel(donation, taxFree);
        }
    };

    calculateResult = (tax: Tax) => {
        switch (tax) {
            case Tax.PIT:
                return calculateForPIT2022(this.state.annual.value || 0);
            case Tax.PPE:
                return calculateForPPE2022(this.state.annual.value || 0, this.state.ppeRate || 0);
            case Tax.CIT:
                return calculateForCIT2022(this.state.annual.value || 0);
        }
    };

    handleChangeData = () => {
        this.showIncomeForm();
        this.hideResultPanel();
    };

    showIncomeForm = () => {
        this.showPPETaxRate();
        this.selectors.taxSelection?.classList.add('visible');
        this.selectors.incomeInput?.classList.add('visible');
        this.selectors.calculateButton?.classList.add('visible');
    };

    hideIncomeForm = () => {
        this.hidePPETaxRate();
        this.selectors.taxSelection?.classList.remove('visible');
        this.selectors.incomeInput?.classList.remove('visible');
        this.selectors.calculateButton?.classList.remove('visible');
    };

    showPPETaxRate = () => {
        this.selectors.ppeInput?.classList.add('visible');
        this.selectors.ppeInput?.classList.remove('hidden');
    };
    hidePPETaxRate = () => {
        this.selectors.ppeInput?.classList.remove('visible');
        this.selectors.ppeInput?.classList.add('hidden');
    };

    showResultPanel = (donation: string, taxFree: string) => {
        this.selectors.actions?.classList.add('visible');
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
    };

    hideResultPanel = () => {
        this.selectors.actions?.classList.remove('visible');
        this.selectors.changeButton?.classList.remove('visible');
        this.selectors.taxOutput.innerHTML = '';
        if (this.state.selectedTax !== Tax.PPE) {
            this.hidePPETaxRate();
        }
    };

    /**
     * Update component rendering
     */
    async render() {
        this.selectors.taxSelection = this.find('section.tax-type-select')!;
        this.selectors.ppeInput = this.find('section.ppe-input')!;
        this.selectors.incomeInput = this.find('section.income-input')!;
        this.selectors.incorrectTax = this.find('section.incorrect-tax')!;
        this.selectors.actions = this.find('section.actions')!;
        this.selectors.taxOutput = this.find('.tax-output')!;
        this.selectors.calculateButton = this.find('button#calculate-donation-btn')! as HTMLButtonElement;
        this.selectors.changeButton = this.find('button#change-data-btn')! as HTMLButtonElement;

        this.renderInputField(
            '.month-income',
            this.state.monthly,
            [isValidNumber, 'Miesięczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Miesięczny dochód powinien być dodatni'],
        );

        this.renderInputField(
            '.annual-income',
            this.state.annual,
            [isValidNumber, 'Roczny dochód powinien być liczbą'],
            [isPositiveNumber, 'Roczny dochód powinien być dodatni'],
        );

        (this.selectors.calculateButton as HTMLButtonElement).disabled =
            !this.state.selectedTax ||
            !this.isValid(this.state.annual.value) ||
            (this.state.selectedTax === Tax.PPE && !this.isValidPercentage(this.state.ppeRate));
    }

    renderInputField = (selector: string, field: IncomeValue, ...validators: Validator<number | undefined>[]) => {
        const inputElement = this.find(`${selector} .income-input`) as HTMLInputElement;
        if (inputElement && field.text) {
            inputElement.value = field.text || '';
            const wrapper = this.find(`${selector} .validation`);
            if (wrapper) {
                applyValidation(wrapper, field.value, validators);
            }
        }
    };

    renderDropdown = (slector: string, value: number) => {};
}

if (!customElements.get('donation-form')) {
    customElements.define('donation-form', DonationForm);
}
