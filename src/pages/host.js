import React, {Component} from 'react';
import {createAndOpenConnection, createConnection} from "../rtc";

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
            <div>
                <button id="btn-open-room" onClick={() => createAndOpenConnection(this.state.conn)}>Open Room</button>
                <hr/>
                <div id="local-videos-container">
                </div>
                <hr/>
                <div id="remote-videos-container"></div>
                <img id="my-screenshot-host" alt="" style={{display: "none"}}/>
                <img id="my-screenshot-client" alt="" style={{display: "none"}}/>
            </div>
        );
    }
}

export default Host;