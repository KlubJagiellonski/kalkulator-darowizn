export class StyleBuilder {
    private styles: CSSStyleSheet[] = [];
    public addStyleSheet(css: string) {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replace(css);
        this.styles.push(styleSheet);
        return this;
    }
    public build() {
        return this.styles;
    }
}
