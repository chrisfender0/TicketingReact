import React, { useEffect, useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import './TicketModal.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class TicketModal extends React.Component {

    constructor(props, showComponent, showComponentHandler, ticketObject){
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            show: null,
            ticket: null
        }
    }
    handleClose = () => {
        this.props.showComponentHandler(false);
        this.setState({
            isLoaded: false
        })
    } 

    componentDidMount(){
        this.setState({
            isLoaded: true,
        })
        this.formTicketObject()
        console.log("UpdateTicketModal mounted")
    }

    handleUpdateCall = () => {
        fetch("http://localhost:8081/ticket/updateTicket", {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.ticket)
        })
        .then(res => res.json())
        .then((data)=> {
            console.log(data);
        })
        this.handleClose();
    }

    handleResolvedCall = () => {
        fetch("http://localhost:8081/ticket/resolveTicket", {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.ticket)
        })
        .then(res => res.json())
        .then((data)=> {
            console.log(data);
        })
        this.handleClose();
    }

    formTicketObject(){
        const ticket = this.props.ticketObject;
        this.setState({
            ticket: ticket
        });
    }

    updateTicket = () => {
        const tempTicket = this.state.ticket;
        const priority = document.getElementsByClassName('is-selected');
        const note = document.getElementById('ticketNote');
        const status = "WIP";
        tempTicket.priority = priority[0].getInnerHTML();
        if(note.value !== null && note.value !== ""){
            tempTicket.note = tempTicket.note + "\n" + note.value;
        }
        tempTicket.status = status;
        this.setState({
            ticket: tempTicket
        })
        this.handleUpdateCall();
    }

    resolveTicket = () => {
        const tempTicket = this.state.ticket;
        const priority = document.getElementsByClassName('is-selected');
        const note = document.getElementById('ticketNote');
        tempTicket.priority = priority[0].getInnerHTML();
        if(note.value !== null && note.value !== ""){
            tempTicket.note = tempTicket.note + "\n" + note.value;
        }
        this.setState({
            ticket: tempTicket
        })
        this.handleResolvedCall();
    }

    render(){
        const {ticketObject} = this.props;
        const options = ['Low', 'Medium', 'High'];
        return (
            this.state.isLoaded === true ? 
            <Modal show={this.props.showComponent} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{ticketObject.subject}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>Status: {ticketObject.status}</span>
                        <br /><br />
                        <label>Priority:</label>
                        <span>{
                            <Dropdown 
                                id="ticketPriority" 
                                options={options} 
                                value={ticketObject.priority} 
                                placeholder="Select an option" />
                        }</span>
                        <br />
                        <span>Note:</span>
                        <br />
                        <textarea readOnly defaultValue={ticketObject.note} cols="60" rows="5"></textarea>
                        <br />
                        <textarea id="ticketNote" cols="50" rows="5"  placeholder="Add more notes"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.updateTicket}>
                        Save Changes
                    </Button>
                    <Button onClick={this.resolveTicket}>
                        Resolve Ticket
                    </Button>
                </Modal.Footer>
            </Modal>
            :
            <span style={{color:"white"}}>Error loading Update Ticket Modal</span>
            );
    }

}

export default TicketModal;
