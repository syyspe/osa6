import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreationAsync } from './../reducers/anecdoteReducer'
import { showNotificationAsync } from './../reducers/notificationReducer'


class AnecdoteForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        this.props.anecdoteCreationAsync(content)
        this.props.showNotificationAsync(`you added ${content}`, 3000)
    }

    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.handleSubmit}>
                    <div><input name='anecdote' /></div>
                    <button>create</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        anecdoteCreationAsync: (content) => {
            dispatch(anecdoteCreationAsync(content))
        },
        showNotificationAsync: (text, timeout) => {
            dispatch(showNotificationAsync(text, timeout))
        }
    }
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
