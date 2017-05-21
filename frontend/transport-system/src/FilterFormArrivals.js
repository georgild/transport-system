import React from 'react';
import {PropTypes} from 'prop-types';

let FilterFormArrivals = React.createClass({

    getInitialState : function() {
        return { ArrivesAt: '', ArrivesFrom: '', CompanyName: '' };
    },

    propTypes : {
        onFilterSubmit: PropTypes.func
    },

    handleSubmit : function(e) {

        e.preventDefault();

        var ArrivesAt = this.state.ArrivesAt.trim();
        var ArrivesFrom = this.state.ArrivesFrom.trim();
        var CompanyName = this.state.CompanyName.trim();

        var filters = [];

        if (ArrivesAt) {
            filters.push({
                Property: 'FinalStop.ArrivalDate',
                Value: ArrivesAt, 
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

        this.props.onFilterSubmit(filters);
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

    render : function() {
        return (
            <div>
                <form className="filterForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="ArrivesAt">Arrives at:</label>
                    <input
                        id="ArrivesAt"
                        type="text"
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
                    <input className="button" type="submit" /*disabled={!this.state.ArrivesAt && !this.state.ArrivesFrom && !this.state.CompanyName}*/ value="Search" />
                </form>
            </div>
        );
    }
});

export default FilterFormArrivals;