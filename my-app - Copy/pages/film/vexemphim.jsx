import { useRouter } from "next/router"
import { useState, React, useEffect } from "react"
import Cinema from "./cinema";
import LayoutSidebar from "../../components/layout-sidebar"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vexemphim = () => {
    const router = useRouter()
    const [cinemas, setCinemas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState();
    const [numberSto, setNumberSto] = useState(0);
    let { id } = router.query;
    let { type } = router.query;

    const [state, setState] = useState({
        "idUser": 3,
        "idFilm": 301,
        "idRap": 301,
        "nameFilm": "CGV",
        "nameCinema": "CGV",
        "time":"00:00"
    })
    useEffect(() => {
        async function fetchProfile() {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/test/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (res.ok) {
                const json = await res.json()
                setProfile(json)
            } else {
                router.push("/")
            }

        }

        fetchProfile()
    }, [])
    useEffect(() => {

        if (!(typeof id == "undefined" && typeof type == "undefined")) {
            fetchData(id, type);
        }
    }, [id, type])
    const fetchData = async (id, type) => {

        setLoading(true);

        try {
            let urltest;
            if (type == 1) {
                urltest = `${process.env.NEXT_PUBLIC_API_URL}/film/filmcinema/` + id + `/1`
            } else { urltest = `${process.env.NEXT_PUBLIC_API_URL}/cinema/filmcinema/` + id + `/1` }
            console.log(urltest)

            const response = await fetch(urltest, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const cinemas = await response.json();
            console.log(cinemas)

            setCinemas(cinemas);
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/filmcinema/count/` + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
            });
            const number = await response.json();
            setNumberSto(number);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    console.log(cinemas)
    async function handleClickButton(e) {
        try {
            let urltest;
            if (type == 1) {
                urltest = `${process.env.NEXT_PUBLIC_API_URL}/film/filmcinema/` + id + `/` + e
            } else { urltest = `${process.env.NEXT_PUBLIC_API_URL}/cinema/filmcinema/` + id + `/` + e }
            const response = await fetch(urltest, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const cinemas = await response.json();
            setCinemas(cinemas);


        } catch (error) {
            console.log(error);
        }
    }


    async function handleClick(id, id_list, nameFilm, nameCinema,time) {
        state.idUser = profile.id
        state.idFilm = id
        state.idRap = id_list
        state.filmName = nameFilm
        state.cinemaName = nameCinema
        state.time=time

        const response = await fetch(`http://localhost:8080/ticket/save`, {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-Type": "application/json",
            }

        })
        if (response.ok) {
            toast("Success!", { hideProgressBar: true, type: 'success' });
        }
    }

    const buttons = Array.from({ length: Math.ceil(numberSto / 10) }, (_, i) => i + 1);
    return (
        <>

            <LayoutSidebar>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title"> Ticket List</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div>
                                            <h5 className="btn btn-primary">Số lượng: {numberSto}</h5>
                                        </div>
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <tr>
                                                    <th>Tên</th>
                                                    <th>Thời gian</th>
                                                    <th>Tên rạp</th>
                                                    <th className="text-right">Đặt vé</th>
                                                </tr>
                                            </thead>
                                            {!loading && (
                                                <tbody className="bg-white">
                                                    {cinemas?.map((cinema) => (
                                                        <Cinema cinema={cinema} key={cinema.id} handleClick={handleClick} ></Cinema>
                                                    ))}
                                                    {buttons.map((num) => (
                                                        <button className="btn btn-primary " key={num} onClick={() => handleClickButton(num)}>{num}</button>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutSidebar >
        </>
    )
}
export default Vexemphim;

// {!loading && (
//     <tbody className="bg-white">
//         {cinemas?.map((cinema) => (
//             <Cinema cinema={cinema} key={cinema.id_list} handleClick={handleClick} />
//         ))}
//     </tbody>
// )}
