const DETAILS_URSL = {
    tender: 'tender',
}

export default (api) => ({
    detail: (id) => api.get(DETAILS_URSL.tender, {params: {id}}),
})
