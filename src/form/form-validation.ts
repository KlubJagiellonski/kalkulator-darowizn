export type Validator<T> = [(value: T) => boolean, string];

export const isValidNumber = (value: any) => !!value && !isNaN(value);
export const isPositiveNumber = (value: any) => !!value && value > 0;

export const applyValidation = (
    element: Element,
    value: number | undefined,
    validators: Validator<number | undefined>[],
) => {
    element.innerHTML = '';
    for (let validator of validators) {
        const isValid = validator[0];
        const message = validator[1];
        if (!isValid(value)) {
            const messageContainer = document.createElement('div');
            messageContainer.className = `validation-message`;
            messageContainer.innerHTML = message;
            element?.appendChild(messageContainer);
            break;
        }
    }
};
