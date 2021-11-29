import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import TicketTable from "./TicketTable";
import CreateNewTicketModal from "./CreateNewTicketModal";
import "./Ticket.css"
import { tSParenthesizedType } from "@babel/types";

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            showCreateNewModal: false,
            receivedUpdate: false
        }
    }

    createNewTicket = () => {
        this.setState({
            showCreateNewModal:true
        })
    }

    showCreateNewModalHandler = (show) => {
        this.setState({
            showCreateNewModal: show
        })
    }

    showReceivedUpdateHandler = () => {
        if(this.state.receivedUpdate === true){
            this.setState({
                receivedUpdate: false
            })
        } else {
            this.setState({
                receivedUpdate: true
            })
        }
    }

    render(){
        const {showCreateNewModal, receivedUpdate} = this.state;
        return(
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col><h3>Welcome to the ticketing system</h3></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}><button onClick={this.createNewTicket}>Create New Ticket</button></Col>
                    <Col><div>
                        {showCreateNewModal ?
                            <CreateNewTicketModal showCreateNewModal={showCreateNewModal} showCreateNewModalHandler={this.showCreateNewModalHandler} key={showCreateNewModal}/> :
                        null}
                        </div></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <div>
                            <TicketTable  showReceivedUpdateHandler={this.showReceivedUpdateHandler} key={receivedUpdate}/>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )

    }
};

export default Ticket;