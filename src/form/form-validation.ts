export type Validator<T> = [(value: T) => boolean, string];

export const isValidNumber = (value: any) => !value || (!isNaN(value) && value > -1);

export const applyValidation = (element: Element, value: number, validators: Validator<number>[]) => {
    element.innerHTML = '';
    validators.forEach((validator: Validator<number>) => {
        const isValid = validator[0];
        const message = validator[1];
        if (!isValid(value)) {
            const messageContainer = document.createElement('div');
            messageContainer.className = `validation-message`;
            messageContainer.innerHTML = message;
            element?.appendChild(messageContainer);
        }
    });
};
