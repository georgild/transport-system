import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import FilterFormDepartures from './FilterFormDepartures';

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

    loadArrivals(filters) {

        $.ajax({
            url: this.props.url,
            data: 'filters=' + JSON.stringify(this.props.initialFilters.concat(filters)),
            dataType: 'json',
            cache: false,
            success: function (data) {
                var parsedData = [];

                if (data) {
                    data.forEach(function(route) {
                        parsedData.push({
                            DepartsAt: route.InitialStop.DepartureDate,
                            TravelsTo: route.FinalStop.City,
                            CompanyName: route.CompanyName,
                            TicketPrice: route.TicketPrice + ' $'
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

    handleFiltersSubmit = (filters) => {
        this.loadArrivals(filters);
    }

    componentDidMount = () => {
        this.loadArrivals([]);
        //setInterval(this.loadArrivals, this.props.pollInterval);
    }

    render() {
        return (
            <div>
                <FilterFormDepartures onFilterSubmit={this.handleFiltersSubmit}/>
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

export default Departures;