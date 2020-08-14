import React, {Component} from 'react';
import {createAndOpenConnection,createAndJoinConnection} from "../rtc";

class Join extends Component {
    render() {
        return (
        <div>
          <button id="btn-join-room" onClick={() => createAndJoinConnection()}>Join Room</button>
          <hr />
          <div id="local-videos-container">
          </div>
          <hr />
          <div id="remote-videos-container">
          </div>
        </div>
        );
    }
}
  
export default Join;