import React from "react";
import {Modal, Button} from 'react-bootstrap';
import './TicketModal.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class TicketModal extends React.Component {

    constructor(props, showComponent, showModalHandler, ticketObject){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            show: null,
            newTicketObject: null
        }
        this.formTicketObject();
    }
    handleClose = () => {
        this.props.showModalHandler(false);
        this.setState({
            isLoaded: false
        })
    } 

    componentDidMount(){
        this.setState({
            isLoaded: true,
        })
        console.log("TicketModal mounted");
    }

    handleSave = () => {
        console.log(this.state.newTicketObject)
        fetch("http://localhost:8081/ticket/createTicket", {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: '{"subject":"test from react","note":"hello from react","priority":"Low","status":"New"}'
        })
        .then(res => res.json())
        .then((data)=> {
            console.log(data);
        })
        this.handleClose();
    }

    formTicketObject(){
        const ticket = JSON.parse('{"subject":"test from react","note":"holle from react","priority":"Low","status":"New"}');
        this.setState({
            newTicketObject: ticket
        });
    }

    render(){
        const {ticketObject} = this.props;
        const options = ['Low', 'Medium', 'High'];
        return (
            this.state.isLoaded === true ? 
            <Modal show={this.props.showComponent} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{ticketObject ? ticketObject.subject : 'New Ticket'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>{ticketObject ? ticketObject.status : 'New'}</span>
                        <br />
                        <span>{ticketObject ? ticketObject.priority : 
                            <Dropdown options={options} onChange={this._onSelect} value={options[0]} placeholder="Select an option" />
                        }</span>
                        <br />
                        <textarea name="note" id="note" cols="30" rows="10" defaultValue={ticketObject ? ticketObject.note : ''} placeholder="Enter Text"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            :
            <span style={{color:"white"}}>Error loading modal</span>
            );
    }

}

export default TicketModal;
