import captureVideoFrame from "capture-video-frame"
import {poseSimiliarity} from "./utill";
import {v4 as uuidv4} from 'uuid';

// import posenet from "@tensorflow-models/posenet"
const posenet = require('@tensorflow-models/posenet');

async function getPose(frame) {
    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: {width: 640, height: 480},
        multiplier: 0.75
    });

    const pose = await net.estimateSinglePose(frame, {
        flipHorizontal: false
    });
    return pose;
}


function createConnection(host = "https://rtcmulticonnection.herokuapp.com:443/") {
    let connection = new window.RTCMultiConnection();
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.session = {
        audio: false,
        video: true
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: true
    };
    return connection;
}

function createAndOpenConnection(connection) {
    // let connection = new window.RTCMultiConnection();
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    //
    // connection.session = {
    //     audio: false,
    //     video: true
    // };
    //
    // connection.sdpConstraints.mandatory = {
    //     OfferToReceiveAudio: false,
    //     OfferToReceiveVideo: true
    // };

    let localVideosContainer = document.getElementById('local-videos-container')
    let remoteVideosContainer = document.getElementById('remote-videos-container')
    let anyClient = false

    connection.onstream = function (event) {
        let video = event.mediaElement
        video.controls = false
        video.muted = true;

        if (event.type === 'local') {
            video.id = "host"
            localVideosContainer.appendChild(video)
        } else if (event.type === 'remote') {
            anyClient = true
            video.id = uuidv4()
            remoteVideosContainer.appendChild(video)
        }
    };

    let predefinedRoomId = 'YOUR_Namee';
    connection.open(predefinedRoomId, (isOpen, roomId, err) => {
        if (isOpen) {
            console.log("mantap")
        }
    });


    setInterval(() => {
        if (!anyClient) {
            return
        }

        let frameHost = captureVideoFrame('host', 'jpeg');

        let clients = remoteVideosContainer.querySelectorAll("video")
        clients.forEach((client) => {
            let frameClient = captureVideoFrame(client.id, 'jpeg');
            // Show the image
            let imgHost = document.getElementById('my-screenshot-host');
            imgHost.setAttribute('src', frameHost.dataUri);

            let imgClient = document.getElementById('my-screenshot-client');
            imgClient.setAttribute('src', frameClient.dataUri);

            let poseHost = getPose(imgHost)
            let poseClient = getPose(imgClient)

            poseHost.then((pose) => {
                poseClient.then((target) => {
                    console.log("Host dengan client " + client.id)

                    let result = poseSimiliarity(pose, target)
                    console.log(result)
                    if (result > 0.1) {
                        client.style.border = "thick solid red";
                    }
                })
            })
        })
    }, 1000)
}

function createAndJoinConnection(connection) {
    // let connection = new window.RTCMultiConnection();
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    //
    // connection.session = {
    //     audio: false,
    //     video: true
    // };
    //
    // connection.sdpConstraints.mandatory = {
    //     OfferToReceiveAudio: false,
    //     OfferToReceiveVideo: true
    // };

    let localVideosContainer = document.getElementById('local-videos-container')
    let remoteVideosContainer = document.getElementById('remote-videos-container')

    connection.onstream = function (event) {
        let video = event.mediaElement

        if (event.type === 'local') {
            localVideosContainer.appendChild(video)
        } else if (event.type === 'remote') {
            remoteVideosContainer.appendChild(video)
        }

        document.body.appendChild(event.mediaElement);
    };

    let predefinedRoomId = 'YOUR_Namee';
    connection.join(predefinedRoomId);

}

export {createAndOpenConnection, createAndJoinConnection, createConnection}