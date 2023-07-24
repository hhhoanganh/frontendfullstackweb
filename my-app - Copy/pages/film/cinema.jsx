import React from 'react'

const Cinema = ({cinema, handleClick}) => {
    return (
        <tr key= {cinema.id}>
            <td >
                <div >{cinema.nameFilm}</div>
            </td>
            <td >
                <div >{cinema.time}</div>
            </td>
            <td >
                <div >{cinema.nameCinema}</div>
            </td>
            <td className="text-right px6 py-4 whitespace-nowrap">

                <button className='btn' onClick={(id)=>handleClick(cinema.idFilm,cinema.idCinema,cinema.nameFilm,cinema.nameCinema,cinema.time)}>Đặt vé </button>
            </td>
        </tr>
    )
}

export default Cinema;
