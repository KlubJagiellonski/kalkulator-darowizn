
export const formatInputValue = (value: string) => {
    const [integer, decimal] = value.split(".")

    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

    return decimal !== undefined
        ? `${formattedInteger}.${decimal}`
        : formattedInteger
}