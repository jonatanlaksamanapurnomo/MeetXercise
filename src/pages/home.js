import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { createConnection } from "../rtc";
import Swal from 'sweetalert2'
import "./home.css"

class Home extends Component {
    componentDidMount() {
        this.setState({
            conn: new createConnection()
        })
    }

    state = {
        conn: null,
        redirect: false,
        path: "",
        roomID: "",
        isExist: false
    }

    setRedirect = (path) => {
        this.setState({
            redirect: true,
            path: path
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.path,
                state: { roomID: this.state.roomID }
            }} />
        }
    }

    handleChange = (event) => {
        this.setState({ roomID: event.target.value });
    }

    render() {
        return (
            <div className="box">
                <div className="container h-100">
                    {this.renderRedirect()}
                    <div className="row h-100  justify-content-center align-items-center">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1>meetXercise</h1>
                            </div>
                            <div className="col-12 text-center ">
                                <p>Fun exercise with your friend, classmate and all other people</p>
                            </div>
                            <div className="col-12 text-center ">
                                <input type="text" value={this.state.roomID} onChange={this.handleChange}
                                    placeholder="Room ID" />
                            </div>
                            <br /><br />
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6 text-right">
                                        <Button className="class-button" size="lg" onClick={() => this.setRedirect('/host')}>Host</Button>
                                    </div>
                                    <div className="col-6">
                                        <Button size="lg" onClick={() => {
                                            this.state.conn.checkPresence(this.state.roomID, (isRoomExist, roomid) => {
                                                this.setState({
                                                    isExist: isRoomExist
                                                }, () => {
                                                    if (this.state.isExist) {
                                                        this.setRedirect('/join')
                                                    } else {
                                                        Swal.fire({
                                                            position: 'center',
                                                            icon: 'error',
                                                            title: "Room ID *" + this.state.roomID +  "* not found!",
                                                            showConfirmButton: false,
                                                            timer: 2500,
                                                            showClass: {
                                                                popup: 'animate__animated animate__fadeInDown'
                                                            },
                                                            hideClass: {
                                                                popup: 'animate__animated animate__fadeOutUp'
                                                            }
                                                        })
                                                    }
                                                })
                                            });

                                        }}>Join</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;