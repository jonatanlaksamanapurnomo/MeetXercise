import captureVideoFrame from "capture-video-frame"
import {poseSimiliarity} from "./utill";
import {v4 as uuidv4} from 'uuid';
import { Container } from "react-bootstrap";

// import posenet from "@tensorflow-models/posenet"
const posenet = require('@tensorflow-models/posenet');
var randomstring = require("randomstring");

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

//open
function createAndOpenConnection(connection) {
    let localVideosContainer = document.getElementById('local-videos-container')
    let remoteVideosContainer = document.getElementById('remote-videos-container')
    let anyClient = false

    connection.onstream = function (event) {
        let video = event.mediaElement
        video.controls = false
        video.muted = true;
        video.style.border = "thick solid black";

        if (event.type === 'local') {
            video.id = "host"
            localVideosContainer.appendChild(video)
        } else if (event.type === 'remote') {
            anyClient = true
            video.id = uuidv4()
            console.log(video)

            // var temp = document.createElement('div');
            // temp.innerHTML = "<Card>" + video.outerHTML + "</Card>"
            // console.log(temp)

            remoteVideosContainer.appendChild(video)
        }
    };

    const randomRoomId = randomstring.generate(5)
    alert("ROOM ID : " + randomRoomId)
    let predefinedRoomId = randomRoomId;

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
                        client.style.border = "thick solid green";
                    } else {
                        client.style.border = "thick solid red";
                    }
                })
            })
        })
    }, 1000)
}


//join
function createAndJoinConnection(connection, room) {
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

    let predefinedRoomId = room;
    connection.join(predefinedRoomId);
}

export {createAndOpenConnection, createAndJoinConnection, createConnection}