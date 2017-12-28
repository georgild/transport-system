
import React from 'react';
import Modal from 'react-modal';
import {PropTypes} from 'prop-types';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class OrderDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            seatClassMap : []
        };
    }

    static propTypes = {
        dialogIsOpen: PropTypes.bool,
        onCloseClick: PropTypes.func,
        routeID: PropTypes.string,
        reservedSeats: PropTypes.array,
        rowsCount: PropTypes.number,
        colsCount: PropTypes.number

    }

    closeModal = (e) => {
        e.preventDefault();
        this.props.onCloseClick();
    }

    onAfterOpen = () => {
        this.loadReservedSeats();
    }

    handleSeatClick = (e) => {
        e.preventDefault();

        var seatClassMap = this.state.seatClassMap;

        switch (seatClassMap[e.target.parentNode.rowIndex][e.target.cellIndex]) {
            case 'selected': 
                seatClassMap[e.target.parentNode.rowIndex][e.target.cellIndex] = '';
                break;
            case '': 
                seatClassMap[e.target.parentNode.rowIndex][e.target.cellIndex] = 'selected';
                break;
            default:
                break;
        }
        
        this.setState({ seatClassMap: seatClassMap });
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    loadReservedSeats() {
        /*var self = this;
        $.ajax({
            url: this.props.url + '/seats',
            data: 'routeID=' + this.props.routeID,
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
        });*/
    }

    componentWillMount = () => {

        var seatClassMap = [];

        for (var i =0; i < this.props.rowsCount; i++) {

            seatClassMap[i] = [];
            //this.setState({ seatClassMap: arrayvar })

            for (var j=0; j < this.props.colsCount; j++) {
                seatClassMap[i][j] = '';
            }
        }
        this.props.reservedSeats.forEach(function(item, i){   
            seatClassMap[item.row][item.col] = 'reserved';
        });
        this.setState({ seatClassMap: seatClassMap })
    }

    render() {
        var rows = new Array(this.props.rowsCount),
            cols = new Array(this.props.colsCount);
        return (
            <Modal
                    isOpen={this.props.dialogIsOpen}
                    onAfterOpen={this.onAfterOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                <p>Order ticket</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="E-Mail">E-Mail:</label>
                    <input
                        id="E-Mail"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <br></br>
                    <label htmlFor="Phone">Phone:</label>
                    <input
                        id="Phone"
                        type="text"
                    />
                    <br></br>
                </form>
                <table className="ticket-table">
                    <tbody>
                        
                        {Array.apply(null, rows).map(function(item, i){                                        
                            return (
                                <tr key={i} >
                                    {Array.apply(null, cols).map(function(item, j){                                        
                                        return (
                                            <td key={i+j} onClick={this.handleSeatClick} className={this.state.seatClassMap[i][j]}></td>
                                        );                
                                    }, this)} 
                                </tr>
                            );
                        }, this)} 
                    </tbody>
                </table> 
                <input className="button" type="submit" value="Order" />
                <button className="button" onClick={this.closeModal}>close</button>
            </Modal>
        );
    }
}

export default OrderDialog;