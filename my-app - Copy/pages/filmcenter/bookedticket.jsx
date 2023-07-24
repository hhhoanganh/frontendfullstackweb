import { useRouter } from "next/router"
import { useState, React, useEffect } from "react"
import Ticket from "./Ticket"
import LayoutSidebar from "../../components/layout-sidebar"

const BookedTickets = (props) => {
    const router = useRouter()
    const [tickets, setTickets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!requestSent) {
            fetchProfile()

        }
        if (profile && profile.id) {
            setRequestSent(true)
            fetchData(profile && profile.id)
        }
    }, [profile, requestSent])

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
    const fetchData = async (id) => {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/ticket/bookedtickets` + `/` + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const tickets = await response.json();
        setTickets(tickets);
        setLoading(false);
    }
    // const ticket = tickets ? tickets.filter(item => item.filmName.toLowerCase().includes(props.searchTerm.toLowerCase())) : [];

    const deleteTicket = (e, id) => {
        // delete
        console.log(id)
        fetch("http://localhost:8080/ticket/ticket" + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if (tickets) {
                setTickets((prevElement) => {
                    return prevElement.filter((ticket) => ticket.id !== id);
                })
            }
        });
    }
    const ticket = tickets ? tickets.filter(item => item.filmName.toLowerCase().includes(searchTerm.toLowerCase())) : [];


    return (
        <>
            <LayoutSidebar>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title "> Booked Ticket</h4>
                                    <form>
                                        <div className="input-group no-border">
                                            <input
                                                type="text"
                                                defaultValue=""
                                                className="form-control"
                                                placeholder="Search..."
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <i className="now-ui-icons ui-1_zoom-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className=" text-primary">
                                                <tr>
                                                    <th>Tên phim</th>
                                                    <th>Thời gian</th>
                                                    <th>Tên rạp</th>
                                                    <th>Mã vẽ</th>
                                                    <th>Hủy vé</th>
                                                </tr>
                                            </thead>
                                            {!loading && (
                                                <tbody className="bg-white">
                                                    {ticket?.map((ticket) => (
                                                        <Ticket ticket={ticket} key={ticket.id} deleteTicket={deleteTicket} />
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
export default BookedTickets;
