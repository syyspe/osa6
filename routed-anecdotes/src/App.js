import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const Menu = () => {
    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '10px'
    }

    const activeStyle = {
        backgroundColor: 'lightgreen',
        padding: '10px'
    }
    return (
        <div style={divStyle}>
            <NavLink exact to='/' activeStyle={activeStyle}>anecdotes</NavLink>&nbsp;
            <NavLink exact to='/create' activeStyle={activeStyle}>create new</NavLink>&nbsp;
            <NavLink exact to='/about' activeStyle={activeStyle}>about</NavLink>&nbsp;
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <ListGroup>
                {
                    anecdotes.map(a =>
                        <ListGroupItem key={a.id}>
                            <Anecdote anecdote={a} />
                        </ListGroupItem>
                    )
                }
            </ListGroup>
        </div>
    )
}

const Anecdote = ({ anecdote }) => (
    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
)

const AnecdoteExpanded = ({ anecdote, vote }) => (
    <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes <button onClick={vote}>vote</button></p>
        <p>for more info, see: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
)

const About = () => (
    <div>
        <Grid>
            <Row>
                <Col xs={12} sm={8} md={9} lg={10}>
                    <p>According to Wikipedia:</p>
                    <em>
                        An anecdote is a brief, revealing account of an 
                        individual person or an incident.
                        Occasionally humorous, anecdotes differ from 
                        jokes because their primary purpose is not 
                        simply to provoke laughter but to reveal a 
                        truth more general than the brief tale itself,
                        such as to characterize a person by delineating 
                        a specific quirk or trait, to communicate 
                        an abstract idea about a person, place, 
                        or thing through the concrete details of 
                        a short narrative.
                        An anecdote is &quot;a story with a point.&quot;
                    </em>
                </Col>
                <Col xs={12} sm={4} md={3} lg={2}>
                    <img 
                        width='128' 
                        src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg' 
                        alt='A.T.' 
                    />
                </Col>
            </Row>
        </Grid>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.  
        See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
    </div>
)

class CreateNew extends React.Component {
    constructor() {
        super()
        this.state = {
            content: '',
            author: '',
            info: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNew({
            content: this.state.content,
            author: this.state.author,
            info: this.state.info,
            votes: 0
        })

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h2>create a new anecdote</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>content</ControlLabel>
                        <FormControl 
                            name='content'
                            type='text'
                            placeholder='Enter content' 
                            value={this.state.content} 
                            onChange={this.handleChange} />
                        <ControlLabel>author</ControlLabel>
                        <FormControl
                            name='author'
                            type='text'
                            placeholder='Enter author'
                            value={this.state.author}
                            onChange={this.handleChange} />
                        <ControlLabel>info</ControlLabel>
                        <FormControl
                            name='info'
                            type='text'
                            placeholder='Enter URL for more info'
                            value={this.state.info}
                            onChange={this.handleChange} />
                    </FormGroup>        
                    <button>create</button>
                </form>
            </div>
        )

    }
}

const Notification = ({ text }) => {
    const style = text === ''
        ? {}
        : {
            color: 'green',
            backgroundColor: 'lightgrey',
            borderStyle: 'solid',
            borderRadius: '6px',
            padding: '10px',
            margin: '5px'
        }

    return (
        <div style={style}>
            {text}
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            anecdotes: [
                {
                    content: 'If it hurts, do it more often',
                    author: 'Jez Humble',
                    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
                    votes: 0,
                    id: '1'
                },
                {
                    content: 'Premature optimization is the root of all evil',
                    author: 'Donald Knuth',
                    info: 'http://wiki.c2.com/?PrematureOptimization',
                    votes: 0,
                    id: '2'
                }
            ],
            notification: ''
        }
    }

    addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
        this.showNotification(`a new anecdote '${anecdote.content}' created`)
    }

    showNotification = (text, timeout = 10000) => {
        this.setState({ notification: text })
        setTimeout(() => {
            this.setState({ notification: '' })
        }, timeout)

    }

    anecdoteById = (id) => {
        return this.state.anecdotes.find(a => a.id === id)
    }

    voteHandler = (id) => {
        return () => {this.vote(id)}
    }

    vote = (id) => {
        const anecdote = this.anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

        this.setState({ anecdotes })
    }

    render() {
        return (
            <div className='container'>
                <h1>Software anecdotes</h1>
                <Router>
                    <div>
                        <Menu />
                        <Notification text={this.state.notification} />
                        <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                        <Route exact path='/create' render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
                        <Route exact path='/about' render={() => <About />} />
                        <Route exact path='/anecdotes/:id' render={({ match }) => <AnecdoteExpanded anecdote={this.anecdoteById(match.params.id)} vote={this.voteHandler(match.params.id)} />} />
                    </div>
                </Router>
                <Footer />
            </div>
        )
    }
}

export default App
