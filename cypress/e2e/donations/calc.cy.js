describe('About Page', () => {
    const monthlyIncome = 9000;

    // required as each call on result of shadow function has its own navigation
    // inside web component's SDOM
    const form = () => cy.get('donation-form').shadow();

    beforeEach(() => {
        const baseUrl = 'http://localhost:5173';
        cy.visit(baseUrl);
    });

    it('should show website title', () => {
        cy.title().should('eq', 'Kalkulator Darowizn');
    });

    it('should count PIT correctly', () => {
        form().find('h3').should('contain.text', 'Jesteś podatnikiem PIT czy CIT?');
        form().find('div.option.tax-pit').find('.radio-option').click();

        form()
            .find('div.option.month-income')
            .find('.income-input')
            .invoke('val', monthlyIncome)
            .trigger('input')
            .should('have.value', monthlyIncome);

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .should('have.value', monthlyIncome * 12);

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains('6 480,00 zł');
        form().find('.tax-output').find('.tax-result').contains('2 156,00 zł');
    });

    it('should count PPE correctly', () => {
        form().find('h3').should('contain.text', 'Jesteś podatnikiem PIT czy CIT?');
        form().find('div.option.tax-pit19').find('.radio-option').click();

        form()
            .find('div.option.month-income')
            .find('.income-input')
            .invoke('val', monthlyIncome)
            .trigger('input')
            .should('have.value', monthlyIncome);

        form()
            .find('div.option.annual-income')
            .find('.income-input')
            .should('have.value', monthlyIncome * 12);

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains('6 480,00 zł');
        form().find('.tax-output').find('.tax-result').contains('972,00 zł');
    });

    it('should count CIT correctly', () => {
        form().find('h3').should('contain.text', 'Jesteś podatnikiem PIT czy CIT?');
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
            .should('have.value', monthlyIncome * 12);

        form().find('#calculate-donation-btn').click();

        form().find('.tax-output').find('.donation-result').contains('10 800,00 zł');
        form().find('.tax-output').find('.tax-result').contains('972,00 zł');
    });
});
