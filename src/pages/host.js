import React, {Component } from 'react';
import {openConnection, createConnection} from "../rtc";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
// import Dictaphone from './speech2';
import "./style.css"
import Navbar from "../components/navbar";

class Host extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conn: null
		}

	}

	componentDidMount(){
		this.setState({
			conn: new createConnection()
		}, () => {
			openConnection(this.state.conn)
		})
	
	}

	
	render() {
		return (
			<>
				<Navbar></Navbar>
			<div className="container-fluid h-100">
                <div className="h-100 justify-content-center align-items-center">
					<div className="row">
						<div className="col-12">
                            <div className="row">
                                <div className="col-3 mr-1 mt-1 ml-1">
									<div  id="local-videos-container"></div>
								</div>
                                <div className="col-12 text-right mr-1 mb-1">
									<div className="row" id="remote-videos-container"></div>
								</div>
                            </div>
                        </div>
						<img id="my-screenshot-host" alt="" style={{display: "none"}} width="500" height="400"/>
						<img id="my-screenshot-client" alt="" style={{display: "none"}} width="500" height="400" />
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default Host;