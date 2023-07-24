import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutSidebar from "../../components/layout-sidebar"
import Cinema from './cinema';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';

function CinemaList() {
    let [cinemas, setCinemas] = useState(null);
    let [loading, setLoading] = useState(true);
    let [search, setSearch] = useState({
        "value": "",
        "cinematype": "",
        "pageNo": 1
    });
    let filmId;
    let router = useRouter()
    let name = router.query.name
    const [numberSto, setNumberSto] = useState(0)

    useEffect(() => {
        console.log(name)
        if(typeof name !="undefined" &&name.length>0){
            console.log(name)
            search.value=name
            console.log(search)
            handleSearch({target: name,})
        } else fetchData();
        fetchNumberPage();
    }, [])
    async function fetchData() {
        setLoading(true)
        console.log(search)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/cinemas/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(search),
            });

            const cinema = await response.json()
            setCinemas(cinema);

        } catch (error) {
            console.error
        }

        setLoading(false)
    }
    const fetchNumberPage = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/cinemas/countsearch`, {
                method: "POST",
                body: JSON.stringify(search),
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
    const handleClick = (film) => {

        filmId = film
        router.push({
            pathname: '/cinema/cinemadetail',
            query: { id: filmId }
        })

    }
    async function handleClickButton(e) {
        search.pageNo = e;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/cinemas/search`, {
                method: "POST",
                body: JSON.stringify(search),
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

    async function handleSearch({ target, cinemaType }) {
        console.log(search)
        if(typeof target.value !== "undefined")
            search.value = target.value;
        if(typeof cinemaType !== "undefined")
            search.cinematype = cinemaType;
        console.log(search)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/cinemas/search`, {
                method: "POST",
                body: JSON.stringify(search),
                headers: {
                    "Content-Type": "application/json",

                },
            });
            const cinemas = await response.json();
            setCinemas(cinemas);
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/cinemas/countsearch`, {
                method: "POST",
                body: JSON.stringify(search),
                headers: {
                    "Content-Type": "application/json",

                },
            });
            const number = await response.json();
            setNumberSto(number);
        } catch (error) {
            console.log(error);
        }

    }
    function handleMap(e){
        let namepush=e.name
        router.push({
            pathname:"/map/map",
            query: {namepush: namepush}
        })
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
                                    <h4 className="card-title"> Cinema List</h4>
                                    <form>
                                        <div className="input-group no-border">
                                            <div className="col-md-3 px-1">
                                                <div className="form-group">
                                                    <label>Cinema namee</label>
                                                    <input type="text" className="form-control" placeholder="Search" value={search.value} onChange={(e) => handleSearch({ target: e.target})} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label >Cinema type</label>
                                                    <input type="text" className="form-control" placeholder="Search" value={search.cinematype} onChange={(f) => handleSearch({ cinemaType: f.target.value })}  />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div><h6 className='btn btn-primary'>Số lượng: {numberSto}</h6></div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <tr>
                                                    <th>Tên rạp</th>
                                                    <th>Rạp</th>
                                                    <th style={{width: '40%'}}>Địa chỉ</th>
                                                    <th style={{textAlign:'center'}}>Map</th>
                                                    <th>Thông tin</th>
                                                </tr>
                                            </thead>
                                            {!loading && (
                                                <tbody >
                                                    {cinemas?.map((cinema) => (
                                                        <Cinema cinema={cinema} key={cinema.id} handleClick={handleClick} handleMap={handleMap}/>
                                                    ))}
                                                    {buttons.map((num) => (
                                                        <button className="btn btn-primary " key={num} onClick={() => handleClickButton(num)}>{num}</button>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </LayoutSidebar>
        </>


    )
}

export default CinemaList;


