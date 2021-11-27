import React from "react";
import { Table } from "react-bootstrap";
import "./TicketTable.css";
import TicketModal from "./TicketModal";

class TicketTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items:[],
            tModal: null
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
        console.log(event);
        let test = event.target.closest("tr");
        console.log(test.getAttribute("id"));
        this.setState({showComponent:true})
   }

    render(){
        const {items, showComponent} = this.state;
        return (
            <div>
                <div>
                {showComponent ?
                    <TicketModal /> :
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
                                <td><span className={`pill pill-${item.priority}`}>{item.priority}</span></td>
                                <td><span>{item.note}</span></td>
                                <td><span>{item.dateCreated}</span></td>
                                <td><span>{item.dateModified}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default TicketTable;
