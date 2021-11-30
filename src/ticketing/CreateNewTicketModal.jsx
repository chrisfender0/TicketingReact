import React from "react";
import {Modal, Button} from 'react-bootstrap';
import './TicketModal.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class TicketModal extends React.Component {

    constructor(props, showCreateNewModal, showCreateNewModalHandler, showReceivedUpdateHandler){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            show: null,
            ticket: null
        }
    }
    handleClose = () => {
        this.props.showCreateNewModalHandler(false);
        this.props.showReceivedUpdateHandler();
        this.setState({
            isLoaded: false
        })
    } 

    componentDidMount(){
        this.setState({
            isLoaded: true,
        })
        this.formTicketObject();
        console.log("TicketModal mounted");
    }

    handleSave = () => {
        this.hydrateTicketObject();
        console.log(this.state)
        fetch("https://chrisfender0-ticketing-rest.herokuapp.com/ticket/createTicket", {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.ticket)
        })
        .then(res => res.json())
        .then((res)=> {
            console.log(res);
        })
        this.handleClose();
    }

    formTicketObject = () => {
        const ticket = JSON.parse('{}');
        ticket.status = "New";
        console.log(ticket);
        this.setState({
            ticket: ticket
        });
    }

    hydrateTicketObject = () => {
        const tempTicket = this.state.ticket;
        const subject = document.getElementById('ticketSubject');
        const priority = document.getElementsByClassName('is-selected');
        const note = document.getElementById('ticketNote');
        tempTicket.subject = subject.value;
        tempTicket.priority = priority[0].getInnerHTML();
        tempTicket.note = note.value;
        this.setState({
            ticket: tempTicket
        });
    }

    render(){
        const options = ['Low', 'Medium', 'High'];
        return (
            this.state.isLoaded === true ? 
            <Modal show={this.props.showCreateNewModal} onHide={this.handleClose} id="CreateNewTicketModal">
                <Modal.Header closeButton>
                    <Modal.Title>{'New Ticket'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="ticketSubject">Subject:</label>
                        <br />
                        <input type="text" id="ticketSubject" name="ticketSubject"/>
                        <br />
                        <span>Priority:</span>
                        <br />
                        <span>{
                            <Dropdown 
                                id="ticketPriority" 
                                options={options} 
                                value={options[0]} 
                                placeholder="Select an option" />
                        }</span>
                        <label>Note:</label>
                        <br />
                        <textarea name="note" id="ticketNote" cols="30" rows="10" placeholder="Enter Text"></textarea>
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
