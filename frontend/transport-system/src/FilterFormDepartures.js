import React from 'react';
import {PropTypes} from 'prop-types';

let FilterFormDepartures = React.createClass({

    getInitialState : function() {
        return { DepartsAt: '', TravelsTo: '', CompanyName: '', Currency: 'USD' };
    },

    propTypes : {
        onFilterSubmit: PropTypes.func
    },

    handleSubmit : function(e) {

        e.preventDefault();

        var DepartsAt = this.state.DepartsAt;
        var TravelsTo = this.state.TravelsTo.trim();
        var CompanyName = this.state.CompanyName.trim();
        var Currency = this.state.Currency.trim();

        var filters = [];

        if (DepartsAt) {
            filters.push({
                Property: 'InitialStop.DepartureDate',
                Value: (new Date(DepartsAt)).getTime(), 
                Operator: 'eq'
            })
        }

        if (TravelsTo) {
            filters.push({
                Property: 'FinalStop.City',
                Value: TravelsTo, 
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

    handleDepartsAtChange : function(e) {
        this.setState({ DepartsAt: e.target.value });
    },

    handleTravelsToChange : function(e) {
        this.setState({ TravelsTo: e.target.value });
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
                    <label htmlFor="DepartsAt">Departs at:</label>
                    <input
                        id="DepartsAt"
                        type="date"
                        value={this.state.DepartsAt}
                        onChange={this.handleDepartsAtChange}
                    />
                    <label htmlFor="TravelsTo">Travels to:</label>
                    <input
                        id="TravelsTo"
                        type="text"
                        value={this.state.TravelsTo}
                        onChange={this.handleTravelsToChange}
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
                      <option value="GBP">GBP</option>
                      <option value="CZK">CZK</option>
                    </select> 
                    <input className="button" type="submit" /*disabled={!this.state.ArrivesAt && !this.state.ArrivesFrom && !this.state.CompanyName}*/ value="Search" />
                </form>
            </div>
        );
    }
});

export default FilterFormDepartures;