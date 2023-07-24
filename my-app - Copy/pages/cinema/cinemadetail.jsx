import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import LayoutSidebar from "../../components/layout-sidebar"
import Cinema from './cinema';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';

function CinemaList() {
    let [cinema, setCinema] = useState(null);
    let [loading, setLoading] = useState(true);
    let router = useRouter()
    let {id} = router.query

    useEffect(() => {
        if(!(typeof id == "undefined"))
           fetchProfile();
      }, [id]);
    async function fetchProfile() {
        const res = await fetch(`http://localhost:8080/cinema/cinemas/` + id, {
            method: "GET",
            headers: {
                "cinema-Type": "application/json",
                // "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        if (res.ok) {
            const json = await res.json()
            setCinema(json)

        }

    }
    function handleClick(e){
        router.push({
            pathname: "/film/vexemphim",
            query: { id: id, type: 2 }
        })

    }
    return (
        <>
            <LayoutSidebar>
            <div className="cinema">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-12 pr-1">
                                                    <div className="form-group">
                                                        <label><h3>Tên rạp:{cinema && cinema.name}</h3></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 pr-1">
                                                    <div className="form-group">
                                                        <label><h4>Địa chỉ: {cinema && cinema.address}</h4></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label>Hotline</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 pr-1">
                                                    <div className="form-group">
                                                        <p>{cinema && cinema.hotline}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div><button className="btn btn-primary btn-block" onClick={handleClick} >Đặt vé</button>
                                </div>
                            </div>
                            {/* <div className="col-md-3">
                                <div className="card card-user">
                                <img src={cinema&&cinema.linkimage} alt={cinema&&cinema.name} width="550"/>


                                </div>
                            </div> */}
                        </div>
                    </div>
            </LayoutSidebar>
        </>


    )
}

export default CinemaList;


