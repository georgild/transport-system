import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import FilterFormDepartures from './FilterFormDepartures';
import OrderDialog from './Orders/OrderDialog';

class Departures extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: [{TicketPrice: 122}], // for test
            filters : [],
            currency: 'USD',
            dialogIsOpen: false,
            selectedRowId: ''
        };
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
    }, { 
        key: 'Options', 
        name: '',
        getRowMetaData: (row) => row,
        formatter: ({ dependentValues }) => (
          <span>
            <button className="button" onClick={() => this.handleBuyClick(dependentValues)}>Order</button>
          </span>
        ),
    }]

    handleBuyClick = (row) => {
        this.setState({ dialogIsOpen: true });
    }

    handleModalCloseClick = () => {
        this.setState({dialogIsOpen: false});
      }

    loadArrivals(filters, currency) {
        var self = this;
        $.ajax({
            url: this.props.url,
            data: 'filters=' + JSON.stringify(this.props.initialFilters.concat(filters)) + '&currency=' + currency,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var parsedData = [];

                if (data) {
                    data.forEach(function(route) {
                        parsedData.push({
                            DepartsAt: (new Date(route.InitialStop.DepartureDate)).toLocaleString(),
                            TravelsTo: route.FinalStop.City,
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
                <h2>Departures</h2>
                <FilterFormDepartures onFilterSubmit={this.handleFiltersSubmit}/>
                <ReactDataGrid
                    columns={this.columns}
                    rowGetter={rowNumber => this.state.data[rowNumber]}
                    rowsCount={this.state.data.length}
                    minHeight={500}
                />
                <OrderDialog 
                    routeID={this.state.selectedRowId}
                    dialogIsOpen={this.state.dialogIsOpen} 
                    onCloseClick={this.handleModalCloseClick}
                    rowsCount={10}
                    colsCount={4}
                    reservedSeats={[{row: 0, col: 1}]}
                />
            </div>
        );
    }
}

export default Departures;