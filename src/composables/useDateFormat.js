import dayjs from "dayjs";
import uk from 'dayjs/locale/uk'
dayjs.locale(uk)
export const useDateFormat = () => {
    const setDateFormat = (date, format) => {
        return dayjs(date).format(format)
    }

    return {
        setDateFormat
    }
}
