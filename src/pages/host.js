import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import {createAndOpenConnection, createConnection} from "../rtc";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Dictaphone from './speech2';

class Host extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conn: null
		}
	}

	componentDidMount() {
		this.setState({
			conn: new createConnection()
		})
	}

	render() {
		return (
			<div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
					<div className="row">
						<div className="col-12 text-center">
							<h1>MeetXercise</h1>
						</div>
						<div className="col-12 text-center ">
							<p>Fun Exercise with your friend, classmate and all other people</p>
						</div>
						<div className="col-12 text-center ">
							<button id="btn-open-room" onClick={() => createAndOpenConnection(this.state.conn)}>Open Room</button>
						</div>
						<div className="col-12 text-center ">
							<Dictaphone></Dictaphone>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
                            <div className="row">
                                <div className="col-6">
									<div className="" id="local-videos-container"></div>
								</div>
                                <div className="col-6  text-right">
									<div id="remote-videos-container"></div>
								</div>
                            </div>
                        </div>
						<img id="my-screenshot-host" alt="" style={{display: "none"}}/>
						<img id="my-screenshot-client" alt="" style={{display: "none"}}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Host;