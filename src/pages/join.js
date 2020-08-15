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
			<div>
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
				<hr />
				<div id="local-videos-container"></div>
				<hr />
				<div id="remote-videos-container"></div>
				<video autoPlay></video>
			</div>
		);
	}
}

export default Join;
