const initialState = {
    filter: ''
}

const filterReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'SET_FILTER':
        return { filter: action.filter }
    case 'CLEAT_FILTER':
        return { filter: '' }
    default:
        break
    }
    return store
}

export const setFilter = (value) => {
    return {
        type: 'SET_FILTER',
        filter: value
    }
}

export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export default filterReducer