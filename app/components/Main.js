import React from 'react'

const Main = React.createClass({
    render() {
        return (
            <div>
                This is main!
                {this.props.children}
            </div>
        )
    }
});

export default Main