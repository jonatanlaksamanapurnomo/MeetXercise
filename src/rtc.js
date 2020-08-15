import captureVideoFrame from "capture-video-frame";
import { poseSimiliarity } from "./utill";
import { v4 as uuidv4 } from "uuid";

const posenet = require("@tensorflow-models/posenet");
var randomstring = require("randomstring");

async function getPose(frame) {
	const net = await posenet.load({
		architecture: "MobileNetV1",
		outputStride: 16,
		inputResolution: { width: 600, height: 500 },
		multiplier: 1,
	});

	const pose = await net.estimateSinglePose(frame, {
		flipHorizontal: true,
	});
	return pose;
}

function createConnection(
	host = "https://rtcmulticonnection.herokuapp.com:443/"
) {
	let connection = new window.RTCMultiConnection();
	connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

	connection.session = {
		audio: false,
		video: true,
	};

	connection.sdpConstraints.mandatory = {
		OfferToReceiveAudio: false,
		OfferToReceiveVideo: true,
	};
	return connection;
}

//open
function openConnection(connection) {
	let localVideosContainer = document.getElementById("local-videos-container");
	let remoteVideosContainer = document.getElementById(
		"remote-videos-container"
	);
	let anyClient = false;

	connection.onstream =  (event)=> {
		let video = event.mediaElement;
		video.controls = false;
		video.muted = true;
		video.style.border = "thick solid #154B7D";
		video.style.padding = "0";

		if (event.type === "local") {
			video.id = "host";
			video.className = "col-12";
			localVideosContainer.appendChild(video);
		} else if (event.type === "remote") {
			anyClient = true
			video.id = uuidv4();
			video.className = "col-6 mt-1 mb-1";

			remoteVideosContainer.appendChild(video);
		}
	};

	const randomRoomId = randomstring.generate(5);
	// alert("ROOM ID : " + randomRoomId);
	let predefinedRoomId = randomRoomId;
	predefinedRoomId = "abc";

	localStorage.setItem("room", predefinedRoomId);

	connection.extra = {
		role: "coach",
	}
	connection.autoCloseEntireSession = true;
	connection.open(predefinedRoomId, (isOpen, roomId, err) => {
		if (isOpen) {
			console.log("mantap");
		}
	});

	setInterval(() => {
		if (!anyClient) {
			return;
		}

		let clients = remoteVideosContainer.querySelectorAll("video");

		let frameHost = captureVideoFrame("host", "jpeg");
		if (frameHost) {
			let imgHost = document.getElementById("my-screenshot-host");
			imgHost.setAttribute("src", frameHost.dataUri);
			let poseHost = getPose(imgHost);

			console.log("Total Client : " + clients.length)
			clients.forEach((client) => {
		
				let frameClient = captureVideoFrame(client.id, "jpeg");
				if (frameClient) {
					let imgClient = document.getElementById("my-screenshot-client");
					imgClient.setAttribute("src", frameClient.dataUri);
					let poseClient = getPose(imgClient);

					poseHost.then((pose) => {
						poseClient.then((target) => {
							// console.log("Host dengan client " + client.id)
							let result = poseSimiliarity(pose, target);
							// document.getElementById("debug").innerHTML = result;

							if (result > 0.70) {
								client.style.border = "thick solid green";
							} else {
								client.style.border = "thick solid red";
							}
						});
					});
				}
			});
		}
	}, 250);
}

//join
function joinConnection(connection, room) {
	let coachVideosContainer = document.getElementById("coach-videos-container");
	let clientVideosContainer = document.getElementById("client-videos-container");

	connection.onstream = function (event) {
		let video = event.mediaElement;
		video.style.border = "thick solid #154B7D";
	

		if (event.extra.role === "coach") {
			
			coachVideosContainer.appendChild(video);
		} else {
			video.className="col-3 mr-1 mb-1"
			clientVideosContainer.appendChild(video);
		}
	};

	connection.onleave = function(user) {
		var role = user.extra.role;
		console.log("role yang leave : " + role)
		if (role === "coach"){
			connection.closeSocket();
			window.location.href = "../";
		}
	};

	let predefinedRoomId = room;
	predefinedRoomId = "abc";
	
	connection.extra = {
		role: "client",
	}
	connection.join(predefinedRoomId);

}

function getUsersConn(connection) {
	let numberOfUsers = connection.getAllParticipants().length;
	return numberOfUsers;
}

export { openConnection, joinConnection, createConnection, getUsersConn };