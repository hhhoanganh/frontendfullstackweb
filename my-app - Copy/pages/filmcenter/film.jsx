import { React, useState } from 'react'
// import ReactPaginate from 'react-paginate';

const Film = ({ film, handleClick }) => {

  return (
    <tr key={film.id}>
      <td>
        <div><h6>{film.name}</h6></div>
      </td>
      <td>
        <div>{film.category}</div>
      </td>
      <td>
        <div>{film.price}</div>
      </td>
      <td>
        <button className="btn btn-primary btn-block" onClick={() => handleClick(film.id)}>📜</button>
      </td>
    </tr>
  )
}

export default Film;
