class TestCase {
    constructor(annual, donation, taxFree) {
        this.annual = annual;
        this.monthly = parseFloat(annual / 12).toFixed(2);
        this.donation = donation;
        this.taxFree = taxFree;
    }
}

describe('About Page', () => {
    const monthlyIncome = 9000;

    // required as each call on result of shadow function has its own navigation
    // inside web component's SDOM
    const form = () => cy.get('donation-form').shadow();

    beforeEach(() => {
        const baseUrl = 'http://localhost:5173';
        cy.visit(baseUrl);
    });

    it('should show titles', () => {
        cy.title().should('eq', 'Kalkulator Darowizn');
        form().find('h3').should('contain.text', 'Jesteś podatnikiem PIT czy CIT?');
    });

    it('should count PIT for income 30001 correctly', () => {
        const data = new TestCase(30001, '1,00 zł', '0,00 zł');

        form().find('div.option.tax-pit').find('.radio-option').click();

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .invoke('val', data.annual)
            .trigger('input')
            .should('have.value', data.annual);
        form().find('div.option.month-income').find('.income-input').should('have.value', data.monthly);

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains(data.donation);
        form().find('.tax-output').find('.tax-result').contains(data.taxFree);
    });

    it('should count PIT for income 120001 correctly', () => {
        const data = new TestCase(120001, '7 200,00 zł', '864,00 zł');

        form().find('div.option.tax-pit').find('.radio-option').click();

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .invoke('val', data.annual)
            .trigger('input')
            .should('have.value', data.annual);
        form().find('div.option.month-income').find('.income-input').should('have.value', data.monthly);

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains(data.donation);
        form().find('.tax-output').find('.tax-result').contains(data.taxFree);
    });

    it('should count PIT (liniowy) correctly', () => {
        form().find('div.option.tax-pit19').find('.radio-option').click();

        form()
            .find('.incorrect-tax.visible')
            .contains('Uwaga - podatnikom rozliczającym się według liniowej stawki PIT');
    });

    it('should count PPE correctly', () => {
        form().find('div.option.tax-ppe').find('.radio-option').click();

        form()
            .find('.ppe-input .rate-dropdown')
            .select('12')
            .invoke('val', 12)
            .trigger('change')
            .should('have.value', '12');

        form()
            .find('div.option.month-income')
            .find('.income-input')
            .invoke('val', monthlyIncome)
            .trigger('input')
            .should('have.value', monthlyIncome);

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .should('have.value', monthlyIncome * 12 + '.00');

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains('6 480,00 zł');
        form().find('.tax-output').find('.tax-result').contains('778,00 zł');
    });

    it('should count CIT correctly', () => {
        form().find('div.option.tax-cit').find('.radio-option').click();

        form()
            .find('div.option.month-income')
            .find('.income-input')
            .invoke('val', monthlyIncome)
            .trigger('input')
            .should('have.value', monthlyIncome);

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .should('have.value', monthlyIncome * 12 + '.00');

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains('10 800,00 zł');
        form().find('.tax-output').find('.tax-result').contains('972,00 zł');
    });
});
