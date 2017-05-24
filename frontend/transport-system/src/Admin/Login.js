import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [], 
            filters : []
        };
    }

    static propTypes = {
        onLoginSubmit: PropTypes.func
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onLoginSubmit();
    }

    render() {
        return (
            <div id="login-panel">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="Username">Username:</label>
                    <input
                        id="Username"
                        type="text"
                        value="admin@admin.com"
                        onChange={this.handleArrivesAtChange}
                    />
                    
                    <label htmlFor="Password">Password:</label>
                    <input
                        id="Password"
                        type="password"
                        value="1234"
                        onChange={this.handleArrivesFromChange}
                    />
                    <input className="button" type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;