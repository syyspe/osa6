import anecdoteService from './../services/anecdotes'

const reducer = (store = [], action) => {
    let old, voted
    switch (action.type) {
    case 'VOTE':
        old = store.filter(a => a.id !== action.id)
        voted = store.find(a => a.id === action.id)
        return [...old, { ...voted, votes: voted.votes + 1 }]
    case 'CREATE':
        return [...store, { ...action.data }]
    case 'INIT':
        return [...action.data]
    default:
        break
    }

    return store
}

export const anecdoteCreationAsync = (content) => {
    return async (dispatch) => {
        const newAnecdote = { content: content, votes: 0 }
        const result = await anecdoteService.create(newAnecdote)
        dispatch({
            type: 'CREATE',
            data: result
        })
    }
}

export const anecdoteCreation = (data) => {
    return {
        type: 'CREATE',
        data: data
    }
}

export const anecdoteInitAsync = () => {
    return async (dispatch) => {
        const data = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: data
        })
    }
}

export const anecdoteInit = (data) => {
    return {
        type: 'INIT',
        data: data
    }
}

export const votingAsync = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.update(anecdote)
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}

export const voting = (id) => {
    return {
        type: 'VOTE',
        id: id
    }
}

export default reducer