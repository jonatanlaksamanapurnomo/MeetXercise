import similarity from 'compute-cosine-similarity';


function getPoseVector(pose) {
    let xPos = []
    let yPos = []
    const vector = [];
    if(pose.score > 0.3){
        pose.keypoints.forEach(item => {
            if(item.part === "leftShoulder" || item.part === "rightShoulder" || item.part === "leftElbow" || item.part === "rightElbow"
                || item.part === "leftWrist" || item.part === "rightWrist" || item.part === "leftHip" || item.part === "rightHip" || item.part === "leftKnee" || item.part === "rightKnee" || item.part === "leftAnkle" || item.part === "rightAnkle"){
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                    xPos.push(item.position.x)
                }
                xPos.push(item.position.x)
        });
        pose.keypoints.forEach(item => {
            if(item.part === "leftShoulder" || item.part === "rightShoulder" || item.part === "leftElbow" || item.part === "rightElbow"
            || item.part === "leftWrist" || item.part === "rightWrist" || item.part === "leftHip" || item.part === "rightHip" || item.part === "leftKnee" || item.part === "rightKnee" || item.part === "leftAnkle" || item.part === "rightAnkle"){
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
                yPos.push(item.position.y)
            }
            yPos.push(item.position.y)
        })
    
     
        for (let i = 0; i < xPos.length; i++) {
            vector.push(xPos[i])
            vector.push(yPos[i])
        }
    }
  
    return vector;
}

//and we use that [x1,y1,x2,y2 .... ,xn,yn] to find distance (imagine 3d space okkay) its like space vector model
function cosineDistanceMatching(vector1, vector2) {
    // let cosineSimilarity = Correlation.calc(vector1, vector2);
    let result = 0;
    if(vector1.length > 5  && vector2.length > 5){
         result = similarity(vector1, vector2);
    }

    return result;
}


function poseSimiliarity(pose1, pose2) {
    const poseVector = getPoseVector(pose1);
    const poseVector2 = getPoseVector(pose2);
    return cosineDistanceMatching(poseVector, poseVector2);
}

export {poseSimiliarity}