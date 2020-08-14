import similarity from 'compute-cosine-similarity';


function keyPointParser(pose) {
    return pose.keypoints.filter(item => {
        return (item.part === "leftShoulder" || item.part === "rightShoulder" || item.part === "leftElbow" || item.part === "rightElbow"
            || item.part === "leftWrist" || item.part === "rightWrist" || item.part === "leftHip" || item.part === "rightHip" || item.part === "leftKnee" || item.part === "rightKnee" || item.part === "leftAnkle" || item.part === "rightAnkle");
    });
}

function getPoseVector(pose) {
    pose.keypoints = keyPointParser(pose)
    // console.log(pose)
    const xPos = pose.keypoints.map(item => item.position.x)
    const yPos = pose.keypoints.map(item => item.position.y)
    let minX = Math.min(...xPos)
    let minY = Math.min(...yPos)
    const vector = [];
    // we want make [x1,y1,x2,y2] <- this part call normalize data structure not value
    for (let i = 0; i < xPos.length; i++) {
        vector.push(xPos[i] - minX)
        vector.push(yPos[i] - minY)
    }
    return vector;
}

//and we use that [x1,y1,x2,y2 .... ,xn,yn] to find distance (imagine 3d space okkay) its like space vector model
function cosineDistanceMatching(vector1, vector2) {
    const cosineSimilarity = similarity(vector1, vector2);
    // console.log(cosineSimilarity)
    return cosineSimilarity;
}


function poseSimiliarity(pose1, pose2) {
    const poseVector = getPoseVector(pose1);
    const poseVector2 = getPoseVector(pose2);
    return cosineDistanceMatching(poseVector, poseVector2);
}

export {poseSimiliarity}