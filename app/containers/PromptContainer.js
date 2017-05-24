// app/containers/PromptContainer.js
import React from 'react'
import Prompt from '../components/Prompt'

const PromptContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            username: ''
        }
    },
    handleUpdateUser(event) {
        this.setState({
            username: event.target.value
        });
    },
    handleSubmitUser(e) {
        e.preventDefault();
        const { username } = this.state.username;
        this.setState({
            username: ''
        });

        if (this.props.routeParams.playerOne) {
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: username,
                }
            })
        } else {
            this.context.router.push(`/playerTwo/${username}`)
        }
    },
    render() {
        return (
            <Prompt
                onSubmitUser={this.handleSubmitUser}
                onUpdateUser={this.handleUpdateUser}
                header={this.props.route.header}
                username={this.state.username}
            />
        )
    }
});

export default PromptContainer