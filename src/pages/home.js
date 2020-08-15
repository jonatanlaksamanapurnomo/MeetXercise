import React, {Component} from 'react';
import {Button} from "react-bootstrap";

class Home extends Component {
    render() {
        return (
            <div className="container h-100">
                <div className="row h-100  justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>MeetXercise</h1>
                        </div>
                        <div className="col-12 text-center ">
                            <p>Fun Exercise with your friend, classmate and all other people</p>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6 text-right">
                                    <Button size="sm">Host</Button>
                                </div>
                                <div className="col-6">
                                    <Button size="sm">Join</Button>
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