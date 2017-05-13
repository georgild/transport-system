import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';

class Departures extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    static propTypes = {
        url: PropTypes.string,
        pollInterval: PropTypes.number
    }

    columns = [{ 
        key: 'DepartsAt', 
        name: 'Departs At' 
    }, { 
        key: 'TravelsTo', 
        name: 'Travels To' 
    }, { 
        key: 'CompanyName', 
        name: 'Company Name' 
    }, { 
        key: 'TicketPrice', 
        name: 'Ticket Price' 
    }]

    loadArrivals() {

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadArrivals();
        //setInterval(this.loadArrivals, this.props.pollInterval);
    }

    render() {
        return (
            <ReactDataGrid
                columns={this.columns}
                rowGetter={rowNumber => this.state.data[rowNumber]}
                rowsCount={this.state.data.length}
                minHeight={500}
            />

        );
    }
}

export default Departures;