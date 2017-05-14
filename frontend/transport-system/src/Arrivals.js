import React from 'react';
import $ from 'jquery';
import {PropTypes} from 'prop-types';

import ReactDataGrid from 'react-data-grid';
import FilterForm from './FilterForm';

class Arrivals extends React.Component {

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

    loadArrivals(filters) {

        $.ajax({
            url: this.props.url,
            data: 'filters=' + JSON.stringify(this.props.initialFilters.concat(filters)),
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
                <FilterForm onFilterSubmit={this.handleFiltersSubmit}/>
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