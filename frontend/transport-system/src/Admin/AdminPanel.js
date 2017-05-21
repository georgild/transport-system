import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

class AdminPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [], 
            filters : []
        };
    }

    static propTypes = {
        url: PropTypes.string,
        //initialFilters: PropTypes.JSON,
        pollInterval: PropTypes.number
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">

                <h2>Transport System</h2>
                </div>
                
            </div>
        );
    }
}

export default AdminPanel;