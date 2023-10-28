import { basicRequest } from "./instance.js";
import GET from '@/api/services/getTenders.js'
import DETAILS from '@/api/services/getDetails'
export const API = {
    getTenders: GET(basicRequest),
    tenderDetails: DETAILS(basicRequest)
}
