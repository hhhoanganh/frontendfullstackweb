import React from "react";
const Cinema = ({ cinema, handleClick, handleMap }) => {

    return (
      <tr key={cinema.id}>
        <td>
          <div><h6>{cinema.name}</h6></div>
        </td>
        <td>
          <div>{cinema.cinemaType}</div>
        </td>
        <td>
          <div>{cinema.address}</div>
        </td>
        <td>
          <button className="btn btn-primary btn-block" onClick={() => handleMap(cinema)}>🗺️</button>
        </td>
        <td>
          <button className="btn btn-primary btn-block" onClick={() => handleClick(cinema.id)}>📜</button>
        </td>
      </tr>
    )
  }

export default Cinema;
