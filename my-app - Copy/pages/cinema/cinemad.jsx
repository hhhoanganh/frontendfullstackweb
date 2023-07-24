import React from "react";

const FilmD = ({filmd}) => {
return (
    <tr key={filmd.id}>
                <td>
                    <div><p>check</p></div>
                </td>
                <tr>
                    <td>{filmd.name}</td>
                    <td>{filmd.category}</td>
                    <td>{filmd.desciption}</td>
                    <td>{filmd.price}</td>
                    <td>Đặt vé</td>
                </tr>
            </tr>
)
}
export default FilmD;
