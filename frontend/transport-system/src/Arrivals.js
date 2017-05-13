import React from 'react';
/*import $ from 'jquery';*/
import ReactDataGrid from 'react-data-grid';

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
const rows = [{ id: 1, title: 'Title 1' }];
const rowGetter = rowNumber => rows[rowNumber];

class Arrivals extends React.Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    loadArrivals() {

        /*$.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function (data) {
            this.setState({ data });
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
        });*/
    }

    render() {
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={rowGetter}
                rowsCount={rows.length}
                minHeight={500}
            />

        );
    }
}

export default Arrivals;