import React from "react";
import { Table } from "react-bootstrap";
import "./TicketTable.css";
import UpdateTicketModal from "./UpdateTicketModal";
import format from "date-fns/format";

class TicketTable extends React.Component{

    constructor(props, receivedUpdate, showModalHandler){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items:[],
            tModal: null,
            showComponent: false,
            showReceivedUpdateHandler: this.props.showReceivedUpdateHandler,
            ticketObject: null
        }
    }

    componentDidMount(){
        fetch("http://localhost:8081/ticket/getAllTickets")
        .then(res=>res.json())
        .then(
            (data) => {
                console.log(data);
                this.setState({
                    isLoaded: true,
                    items: data
                });
            },
            (error) => {
                console.log(error);
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    pickTicket = (event) => {
        const id = event.target.closest("tr").getAttribute("id");
        console.log(id);
        this.state.items.forEach((item) => {
            if(item.id === id){
                console.log("matched");
                this.setState({
                    ticketObject: item,
                    showComponent: true
                })
            }
        });
    }

    showComponentHandler = (show) => {
        this.setState({
            showComponent: show
        })
        if(show===false){
            this.props.showReceivedUpdateHandler()
        }
    }

    formatDate = (datePassed) => {
        const date = new Date(datePassed);
        return format(date, 'MM-dd-yyyy hh:mm a');
    }

    render(){
        const {items, showComponent, ticketObject} = this.state;
        return (
            <div>
                <div>
                {showComponent ?
                    <UpdateTicketModal 
                        showComponent={showComponent} 
                        showComponentHandler={this.showComponentHandler} 
                        key={showComponent}
                        ticketObject={ticketObject}
                        /> :
                    null
                }
                </div>
                <Table className="table-hover">
                    <thead>
                        <tr>
                            <th><span>Subject</span></th>
                            <th><span>Status</span></th>
                            <th><span>Priority</span></th>
                            <th><span>Note</span></th>
                            <th><span>Date Created</span></th>
                            <th><span>Date Modified</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} id={item.id} onClick={this.pickTicket}>
                                <td><span>{item.subject}</span></td>
                                <td><span>{item.status}</span></td>
                                <td className="pill-parent"><span className={`pill pill-${item.priority}`}>{item.priority}</span></td>
                                <td className="note"><span>{item.note}</span></td>
                                <td className="date"><span>{this.formatDate(item.dateCreated)}</span></td>
                                <td className="date"><span>{this.formatDate(item.dateModified)}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default TicketTable;
