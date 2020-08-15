import React, { Component } from "react";
import { createConnection, createAndJoinConnection } from "../rtc";

class Join extends Component {
	constructor(props) {
		super(props);
		this.state = {
			conn: null,
		};
	}

	componentDidMount() {
		this.setState({
			conn: new createConnection(),
		});
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
							<button
								id="btn-join-room"
								onClick={() => {
									alert("room id kiriman : " + this.props.location.state.roomID);
									createAndJoinConnection(
										this.state.conn,
										this.props.location.state.roomID
									);
								}}
							>
								Join Room
				</button>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="row">
								<div className="col-6 text-right">
									<div className="" id="local-videos-container"></div>
								</div>
								<div className="col-6">
									<div id="remote-videos-container"></div>
								</div>
							</div>
						</div>
						<img id="my-screenshot-host" alt="" style={{ display: "none" }} />
						<img id="my-screenshot-client" alt="" style={{ display: "none" }} />
					</div>
				</div>
			</div>
		);
	}
}

export default Join;
