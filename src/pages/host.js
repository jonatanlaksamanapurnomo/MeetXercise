import React, { Component } from 'react';
import { openConnection, createConnection } from "../rtc";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import Dictaphone from './speech2';
import "./style.css"
import Navbar from "../components/navbar";
import "./home.css"
import { Button } from "react-bootstrap"
import Swal from 'sweetalert2'

class Host extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conn: null,
			time: 10
		}
	}

	componentDidMount() {
		this.setState({
			conn: new createConnection()
		}, () => {
			openConnection(this.state.conn)
		})

	}

	handleChange = (event) => {
		this.setState({ time: parseInt(event.target.value) });
	}

	render() {
		return (
			<>
				<div className="box">
					<Navbar></Navbar>
					<div className="container-fluid h-100">
						<div className="h-100 justify-content-center align-items-center">
							<div>
								<div>
									<div className="row">
										<div className="col-3 mr-5 mt-5 ml-1  ">
											<div id="local-videos-container"></div>
											<input type="text" value={this.state.time} onChange={this.handleChange} placeholder="Time" style={{width: "345px", textAlign:"center"}} />
											<Button variant="success" block onClick={() => {
												let idVar = setInterval(() => {
													if(this.state.time > 0) {
														this.setState({ time: this.state.time - 1 })
													} else {
														Swal.fire({
															position: 'bottom-start',
															icon: 'success',
															title: 'Next!',
															showConfirmButton: false,
															timer: 2500,
															showClass: {
																popup: 'animate__animated animate__fadeInDown'
															},
															hideClass: {
																popup: 'animate__animated animate__fadeOutUp'
															}
														})
														clearInterval(idVar)
													}
												}, 1000);

											}}>Start</Button>
											<p className="mt-5">Time Left : {this.state.time}</p>

										</div>
										<div className="col-8 ">
											<div className="row" id="remote-videos-container"></div>
										</div>
									</div>
								</div>
								<img id="my-screenshot-host" alt="" style={{ display: "none" }} width="500" height="400" />
								<img id="my-screenshot-client" alt="" style={{ display: "none" }} width="500" height="400" />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Host;