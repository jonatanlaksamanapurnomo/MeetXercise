
import $ from "jquery"
import captureVideoFrame from "capture-video-frame"
import {poseSimiliarity} from "./utill";
import { v4 as uuidv4 } from 'uuid';

// import posenet from "@tensorflow-models/posenet"
const posenet = require('@tensorflow-models/posenet');

async function getPose(frame){
    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
      });

      const pose = await net.estimateSinglePose(frame, {
        flipHorizontal: false
      });
      return pose;
}

function createAndOpenConnection(){
    var connection = new window.RTCMultiConnection();
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.session = {
        audio: false,
        video: true
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: true
    };

    var localVideosContainer = document.getElementById('local-videos-container')
    var remoteVideosContainer = document.getElementById('remote-videos-container')
    var anyClient = false

    connection.onstream = function(event) {
        var video = event.mediaElement
        video.controls = false
        video.muted= true;

        if (event.type === 'local'){
            video.id = "host"
            localVideosContainer.appendChild(video)
        }
        else if (event.type === 'remote'){
            anyClient = true
            video.id = uuidv4()
            remoteVideosContainer.appendChild(video)
        }
    };

    var predefinedRoomId = 'YOUR_Namee';
    connection.open( predefinedRoomId );

    
    setInterval(() => {
        if (!anyClient){
            return
        }

        var frameHost = captureVideoFrame('host', 'jpeg');
        
        var clients = remoteVideosContainer.querySelectorAll("video")
        clients.forEach((client) => {
            var frameClient = captureVideoFrame(client.id, 'jpeg');
            // Show the image
            var imgHost = document.getElementById('my-screenshot-host');
            imgHost.setAttribute('src', frameHost.dataUri);

            var imgClient = document.getElementById('my-screenshot-client');
            imgClient.setAttribute('src', frameClient.dataUri);
            
            let poseHost = getPose(imgHost)
            let poseClient = getPose(imgClient)

            poseHost.then((pose) => {
                poseClient.then((target) => {
                    console.log("Host dengan client " + client.id)
                    
                    let result = poseSimiliarity(pose, target)
                    console.log(result) 
                    if (result > 0.1){
                        client.style.border = "thick solid red";
                    } 
                })
            })
        })
    }, 1000)
}

function createAndJoinConnection(){
    var connection = new window.RTCMultiConnection();
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.session = {
        audio: false,
        video: true
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: true
    };

    var localVideosContainer = document.getElementById('local-videos-container')
    var remoteVideosContainer = document.getElementById('remote-videos-container')

    connection.onstream = function(event) {
        var video = event.mediaElement

        if (event.type === 'local'){
            localVideosContainer.appendChild(video)
        }
        else if (event.type === 'remote'){
            remoteVideosContainer.appendChild(video)
        }

        document.body.appendChild( event.mediaElement );
    };

    var predefinedRoomId = 'YOUR_Namee';
    connection.join( predefinedRoomId );
    
}

export {createAndOpenConnection,createAndJoinConnection}