import React, { Component } from "react";
import { createConnection, joinConnection } from "../rtc";
import Navbar from "../components/navbar";
import "./home.css"

class Join extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conn: null
		}
	}

	componentDidMount() {
		this.setState({
			conn: new createConnection()
		}, () => {
			joinConnection(this.state.conn)
		})
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
										<div className="col-12 mr-1 mt-1 ml-1 d-flex justify-content-center">
											<div id="coach-videos-container">

											</div>
										</div>
										<div className="col-12 mr-1 mb-1">
											<div id="client-videos-container">

											</div>
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

export default Join;
