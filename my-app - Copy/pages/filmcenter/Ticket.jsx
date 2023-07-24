import React from 'react'

const Ticket = ({ticket, deleteTicket}) => {
    console.log(ticket)
    return (
        <tr key= {ticket.id}>
            <td >
                <div >{ticket.filmName}</div>
            </td>
            <td >
                <div >{ticket.time}</div>
            </td>
            <td >
                <div >{ticket.cinemaName}</div>
            </td>
            <td >
                <div >{ticket.codeTicket}</div>
            </td>
            <td >
                <button onClick={(e,id)=>deleteTicket(e,ticket.id)}>✘</button>
            </td>
        </tr>
    )
}

export default Ticket;
