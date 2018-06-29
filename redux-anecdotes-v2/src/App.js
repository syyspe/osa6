import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInit, anecdoteInitAsync } from './reducers/anecdoteReducer'

class App extends React.Component {
    componentDidMount = async () => {
        this.props.anecdoteInitAsync()
    }

    render() {
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification />
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        anecdoteInit: (data) => {
            dispatch(anecdoteInit(data))
        },
        anecdoteInitAsync: () => {
            dispatch(anecdoteInitAsync())
        }
    }
}

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App)

export default ConnectedApp