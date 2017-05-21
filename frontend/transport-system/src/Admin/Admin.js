import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';
import Login from './Login';
import AdminPanel from './AdminPanel';

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoggedIn: true
        };
    }

    static propTypes = {
        url: PropTypes.string,
        //initialFilters: PropTypes.JSON,
        pollInterval: PropTypes.number
    }

    handleLoginSubmit = () => {
        /*$.ajax({
            url: this.props.url,
            data: 'filters=' + JSON.stringify(this.props.initialFilters.concat(filters)),
            dataType: 'json',
            async: true,
            cache: false,
            success: function (data) {
                var parsedData = [];
                
                this.setState({ data: parsedData });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });*/
        this.setState({isLoggedIn: true});
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoggedIn === false ?
                        <Login onLoginSubmit={this.handleLoginSubmit}/>
                    :
                        <AdminPanel/>
                }
            </div>
        );
    }
}

export default Admin;