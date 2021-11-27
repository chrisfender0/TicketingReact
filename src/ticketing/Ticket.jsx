import React from "react";
import { Table } from "react-bootstrap";

class Ticket extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items:[]
        }
    }

    componentDidMount(){
        fetch("http://localhost:8081/ticket/getAllTickets")
        .then(res=>res.json())
        .then(
            (data) => {
                this.setState({
                    items: data
                });
                console.log(data);
            }
        )
    }

    render(){
        const {items} = this.state;
        return (
            <div>
                <Table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Note</th>
                        <th>Date Created</th>
                        <th>Date Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.subject}</td>
                            <td>{item.status}</td>
                            <td>{item.priority}</td>
                            <td>{item.note}</td>
                            <td>{item.dateCreated}</td>
                            <td>{item.dateModified}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </div>
        )
    }
};

export default Ticket;