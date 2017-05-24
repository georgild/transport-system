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
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <br></br>
                        <label htmlFor="CompanyName">Company Name:</label><br></br>
                        <input
                            id="CompanyName"
                            type="text"
                            value={this.state.ArrivesAt}
                            onChange={this.handleArrivesAtChange}
                        /><br></br>
                        
                        <label htmlFor="DepartsFrom">Departs from:</label><br></br>
                        <input
                            id="DepartsFrom"
                            type="text"
                            value={this.state.ArrivesFrom}
                            onChange={this.handleArrivesFromChange}
                        /><br></br>

                        <label htmlFor="ArrivesAt">Arrives at:</label><br></br>
                        <input
                            id="ArrivesAt"
                            type="text"
                            value={this.state.ArrivesFrom}
                            onChange={this.handleArrivesFromChange}
                        /><br></br>
                        <input className="button" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminPanel;