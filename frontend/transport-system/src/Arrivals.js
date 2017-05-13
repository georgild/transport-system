import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';

class Arrivals extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    static propTypes = {
        url: PropTypes.string,
        pollInterval: PropTypes.number
    }

    columns = [{ 
        key: 'ArrivesAt', 
        name: 'Arrives At' 
    }, { 
        key: 'ArrivesFrom', 
        name: 'Arrives From' 
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
            <div>
                <label for="edit-flight">Полет: </label>
                <input name="flight" id="edit-flight" type="text" maxlength="64" value=""/>
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={rowNumber => this.state.data[rowNumber]}
                    rowsCount={this.state.data.length}
                    minHeight={500}
                />
            </div>
        );
    }
}

export default Arrivals;