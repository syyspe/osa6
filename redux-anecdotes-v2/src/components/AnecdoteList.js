import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { votingAsync } from './../reducers/anecdoteReducer'
import { showNotificationAsync } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {
    vote = async (event) => {
        event.preventDefault()
        const id = event.target.id
        const theOne = { ...this.props.anecdotes.find(a => a.id === id) }
        theOne.votes += 1
        this.props.votingAsync(theOne)
        this.props.showNotificationAsync(`you voted '${theOne.content}'`, 3000)
    }

    render() {
        const btnStyle = {
            marginLeft: 4
        }
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter store={this.props.store} />
                {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button id={anecdote.id} style={btnStyle} onClick={this.vote}>
                                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {

    return {
        anecdotes: anecdotesToShow(state.anecdotes, state.filter.filter),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        votingAsync: (anecdote) => {
            dispatch(votingAsync(anecdote))
        },
        showNotificationAsync: (text, timeout) => {
            dispatch(showNotificationAsync(text, timeout))
        }
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
