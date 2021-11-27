import React, { useState } from "react";
import {Modal, Button} from 'react-bootstrap';

class TicketModal extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         isLoaded: false,
    //         error: null
    //     }
    // }

    handleClose = () => {
        return "false";
    }

    render(){
        console.log("Called TicketModal");
        return (
            <Modal show="true" onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            );
    }

}

export default TicketModal;
