const initialState = {
    text: ''
}

const notificationReducer = (store = initialState, action) => {
    switch (action.type) {
    case 'SHOW':
        return { text: action.text }
    case 'CLEAR':
        return { text: '' }
    default:
        break
    }
    return store
}

export const showNotificationAsync = (text, timeout) => {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, timeout)

        dispatch({
            type: 'SHOW',
            text: text
        })
    }
}

export const displayNotification = (text) => {
    return {
        type: 'SHOW',
        text: text
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer