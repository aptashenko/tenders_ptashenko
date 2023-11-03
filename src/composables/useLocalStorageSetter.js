export const useLocalStorageSetter = () => {

    const setToLocaleStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))

        return JSON.parse(localStorage.getItem(key))
    }

    return {setToLocaleStorage}
}
