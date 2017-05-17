var React = require('react');
var PropsTypes = React.PropTypes;

function UserDetailsWrapper(props) {
    return (
        <div className='col-sm-6'>
            <p className='lead'>{props.header}</p>
            {props.children}
        </div>
    )
}

UserDetailsWrapper.PropTypes = {
    header: PropsTypes.string.isRequired,
}

module.exports = UserDetailsWrapper;