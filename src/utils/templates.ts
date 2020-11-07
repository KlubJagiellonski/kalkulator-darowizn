export const getTemplate = async (filepath: string, rootElement: string = 'template'): Promise<Element | null> => {
    const response = await fetch(filepath);
    const templateString = await response.text();
    const templateHTML = new DOMParser().parseFromString(templateString, 'text/html');
    const templateElement = templateHTML.querySelector(rootElement);

    return templateElement;
};

export const preventPropagationInvoke = (callback: () => void) => (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
};

export const preventPropagation = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
};
