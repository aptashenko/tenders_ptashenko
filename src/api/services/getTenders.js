const FILTERS_URLS = {
    buyers: 'buyers',
    tendersList: 'tenders'
}

export default (api) => ({
    tendersList: (reqData) => api.get(FILTERS_URLS.tendersList, {params: {...reqData}}),
    buyers: (reqData) => api.get(FILTERS_URLS.buyers, {params: {...reqData}}),
})
