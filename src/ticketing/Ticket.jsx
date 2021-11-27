import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import TicketTable from "./TicketTable";
import "./Ticket.css"

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
    }

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col><h3>Welcome to the ticketing system</h3></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <div>
                            <TicketTable />
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        )

    }
};

export default Ticket;