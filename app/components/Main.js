import React from 'react'

const Main = React.createClass({
    render: function () {
        return (
            <div>
                This is main!
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;