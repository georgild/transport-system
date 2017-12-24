
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

class TicketDialog extends React.Component {

    static propTypes = {
        onCloseClick: PropTypes.func
    }

    closeModal = (e) => {
        
        e.preventDefault();
        this.props.onCloseClick();
    }

    render() {
        return (
            <Modal
                    isOpen={this.props.dialogIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                <button className="button" onClick={this.closeModal}>close</button>
            </Modal>
        );
    }
}

export default TicketDialog;