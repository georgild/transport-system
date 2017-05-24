import React from 'react';
import {PropTypes} from 'prop-types';

let FilterFormArrivals = React.createClass({

    getInitialState : function() {
        return { ArrivesAt: '', ArrivesFrom: '', CompanyName: '', Currency: 'USD' };
    },

    propTypes : {
        onFilterSubmit: PropTypes.func
    },

    handleSubmit : function(e) {

        e.preventDefault();

        var ArrivesAt = this.state.ArrivesAt;
        var ArrivesFrom = this.state.ArrivesFrom.trim();
        var CompanyName = this.state.CompanyName.trim();
        var Currency = this.state.Currency.trim();

        var filters = [];

        if (ArrivesAt) {
            filters.push({
                Property: 'FinalStop.ArrivalDate',
                Value: (new Date(ArrivesAt)).getTime(), 
                Operator: 'eq'
            })
        }

        if (ArrivesFrom) {
            filters.push({
                Property: 'InitialStop.City',
                Value: ArrivesFrom, 
                Operator: 'eq'
            })
        }

        if (CompanyName) {
            filters.push({
                Property: 'CompanyName',
                Value: CompanyName, 
                Operator: 'eq'
            })
        }

        this.props.onFilterSubmit(filters, Currency);
    },

    handleArrivesAtChange : function(e) {
        this.setState({ ArrivesAt: e.target.value });
    },

    handleArrivesFromChange : function(e) {
        this.setState({ ArrivesFrom: e.target.value });
    },

    handleCompanyNameChange : function(e) {
        this.setState({ CompanyName: e.target.value });
    },

    handleCurrencyChange : function(e) {
        this.setState({ Currency: e.target.value });
    },

    render : function() {
        return (
            <div>
                <form className="filterForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="ArrivesAt">Arrives at:</label>
                    <input
                        id="ArrivesAt"
                        type="date"
                        value={this.state.ArrivesAt}
                        onChange={this.handleArrivesAtChange}
                    />
                    <label htmlFor="ArrivesFrom">Arrives from:</label>
                    <input
                        id="ArrivesFrom"
                        type="text"
                        value={this.state.ArrivesFrom}
                        onChange={this.handleArrivesFromChange}
                    />
                    <label htmlFor="CompanyName">Company name:</label>
                    <input
                        id="CompanyName"
                        type="text"
                        value={this.state.CompanyName}
                        onChange={this.handleCompanyNameChange}
                    />
                    <label htmlFor="Currency">Ticket Currency:</label>
                    <select id="Currency" onChange={this.handleCurrencyChange}>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select> 
                    <input className="button" type="submit" /*disabled={!this.state.ArrivesAt && !this.state.ArrivesFrom && !this.state.CompanyName}*/ value="Search" />
                </form>
            </div>
        );
    }
});

export default FilterFormArrivals;