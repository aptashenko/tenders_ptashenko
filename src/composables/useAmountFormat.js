export const useAmountFormat = () => {
    const formatAmount = (value, currency) => {
        const amount = value.toLocaleString('uk-UA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).replace('.', ',')

        return `${amount} ${currency}`
    }

    const unformatAmount = (value, currency) => {
        const unformatValue = value.replace(` ${currency}`, '');
        return Number(unformatValue)
    }

    return {
        formatAmount,
        unformatAmount
    }
}
