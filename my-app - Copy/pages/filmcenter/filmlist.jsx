import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutSidebar from "../../components/layout-sidebar"
import Film from './film';
import ReactPaginate from 'react-paginate';
import  XLSX from 'xlsx';

function FilmList() {
    let [films, setFilms] = useState(null);
    let [loading, setLoading] = useState(true);
    let [search, setSearch] = useState({
        "value": "",
        "category": "",
        "pageNo": 1
    });
    let filmId;
    let router = useRouter()
    const [numberSto, setNumberSto] = useState(0)

    useEffect(() => {
        fetchData();
        fetchNumberPage();
    }, [])
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/films/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(search)
            });
            const films = await response.json();
            setFilms(films);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const fetchNumberPage = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/films/countsearch/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(search)
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
        console.log(filmId)
        router.push({
            pathname: '/film/filmdetail',
            query: { id: filmId }
        })

    }
    async function handleClickButton(e) {
        search.pageNo = e
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/films/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(search)
            });
            const films = await response.json();
            setFilms(films);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleSearch({ target, category }) {
        console.log(search)
        if (typeof target !== "undefined")
            search.value = target.value;
        if (typeof category !== "undefined")
        search.category = category;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/films/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(search)
            });
            const films = await response.json();
            setFilms(films);
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/films/countsearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(search)
            });
            const number = await response.json();
            setNumberSto(number);
        } catch (error) {
            console.log(error);
        }
        console.log(films)
    }

    async function handleExport() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/film/download`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'customers.xlsx';
            a.click();

        } catch (error) {
            console.log(error);
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
                                    <h4 className="card-title"> Film List</h4>
                                    <form>
                                        <div className="input-group no-border">
                                            <div className="col-md-3 px-1">
                                                <div className="form-group">
                                                    <label>Film name</label>
                                                    <input type="text" className="form-control" placeholder="Search" value={search.value} onChange={(e) => handleSearch({ target: e.target})} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label >Category</label>
                                                    <input type="text" className="form-control" value={search.category} onChange={(f) => handleSearch({ category: f.target.value })} placeholder="Search" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button className="btn btn-primary" onClick={handleExport}>Export excel</button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <tr>
                                                    <th style={{width: '40%'}}>Tên phim</th>
                                                    <th>Thể loại</th>
                                                    <th>Giá</th>
                                                    <th >Chi tiết</th>
                                                </tr>
                                            </thead>
                                            {!loading && (
                                                <tbody >
                                                    {films?.map((film) => (
                                                        <Film film={film} key={film.id} handleClick={handleClick} />
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

export default FilmList;


