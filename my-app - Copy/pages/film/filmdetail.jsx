/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutSidebar from "../../components/layout-sidebar";


const FilmDetail = ({ }) => {
    const [content, setContent] = useState(null)
    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
        console.log(id)
        if (!(typeof id == "undefined"))
            fetchProfile();
    }, [id]);

    async function fetchProfile() {
        try {
            const res = await fetch(`http://localhost:8080/film/films/id/` + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            const json = await res.json()
            setContent(json)


        } catch (error) { }

    }
    console.log(content)
    async function handleClick() {

        router.push({
            pathname: "/film/vexemphim",
            query: { id: content.id, type: 1 }
        })
    }
    return (
        <>
            <LayoutSidebar>
                
                <div className="content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-12 pr-1">
                                                <div className="form-group">
                                                    <label><h3>Tên phim:{content && content.name}</h3></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5 pr-1">
                                                <div className="form-group">
                                                    <label><h4>Thể loại: {content && content.category}</h4></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Miêu tả</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 pr-1">
                                                <div className="form-group">
                                                    <p>{content && content.desciption}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <button className="btn btn-primary btn-block" onClick={() => handleClick()}>Đặt vé</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card card-user">
                                <img src={content && content.linkimage} alt={content && content.name} width="550" />


                            </div>
                        </div>
                    </div>
                </div>

            </LayoutSidebar>

        </>
    )
}

export default FilmDetail;
