import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const create = async (anecdote) => {
    const result = await axios.post(
        baseUrl, 
        anecdote, 
        { headers: {'Content-type': 'application/json'} }
    )
    return result.data
}

const update = async (anecdote) => {
    const result = await axios.put(
        `${baseUrl}/${anecdote.id}`, 
        anecdote, 
        { headers: {'Content-type': 'application/json'} }
    )
    return result.data
}

export default { getAll, create, update }