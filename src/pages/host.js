import React, {Component} from 'react';
import {createAndOpenConnection,createAndJoinConnection} from "../rtc";

class Host extends Component {
     render() {
        return (
        <div>
          <button id="btn-open-room" onClick={() => createAndOpenConnection()}>Open Room</button>
          <hr />
          <div id="local-videos-container">
          </div>
          <hr />
          <div id="remote-videos-container"></div>
          
          <img id="my-screenshot-host" style={{display:"none"}} />
          <img id="my-screenshot-client" style={{display:"none"}}/>
        </div>
        );
    }
}
  
export default Host;