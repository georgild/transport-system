import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import FilterFormArrivals from './FilterFormArrivals';

class Arrivals extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [], 
            filters : [],
            currency: 'USD'
        };
    }

    static propTypes = {
        url: PropTypes.string,
        //initialFilters: PropTypes.JSON,
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

    loadArrivals(filters, currency) {
        var self = this;
        $.ajax({
            url: this.props.url,
            data: 'filters=' + JSON.stringify(this.props.initialFilters.concat(filters)) + '&currency=' + currency,
            dataType: 'json',
            async: true,
            cache: false,
            success: function (data) {
                var parsedData = [];

                if (data) {
                    data.forEach(function(route) {
                        parsedData.push({
                            ArrivesAt: (new Date(route.FinalStop.ArrivalDate)).toLocaleString(),
                            ArrivesFrom: route.InitialStop.City,
                            CompanyName: route.CompanyName,
                            TicketPrice: route.TicketPrice + ' ' + self.state.currency
                        });
                    });
                }
                
                this.setState({ data: parsedData });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleFiltersSubmit = (filters, currency) => {
        this.setState({ filters: filters });
        this.setState({ currency: currency });
        this.loadArrivals(filters, currency);
    }

    componentDidMount = () => {
        this.loadArrivals(this.state.filters, this.state.currency);
        //setInterval(this.loadArrivals, this.props.pollInterval);
    }

    render() {
        return (
            <div>
                <h2>Arrivals</h2>
                <FilterFormArrivals onFilterSubmit={this.handleFiltersSubmit}/>
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