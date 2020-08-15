import React, {useMemo, useState} from 'react';
import PoseNet from "react-posenet";
import {poseSimiliarity} from "../utill";

function Train(props) {
    const [pose, setPose] = useState({});
    const [target, setTarget] = useState({})
    const input = useMemo(() => {
        const image = new Image()
        image.crossOrigin = ""
        image.src = "https://ik.imagekit.io/nwiq66cx3pvsy/yoga.jpg"
        return image
    }, [])
    const input2 = useMemo(() => {
        const image = new Image()
        image.crossOrigin = ""
        image.src = "https://ik.imagekit.io/nwiq66cx3pvsy/650x350_the_health_benefits_of_yoga_ref_guide.jpg"
        return image
    }, [])
    // console.log(poseSimiliarity([1], [2]))
    
    return (
        <div className="row">
            <div className="col-6">
                <PoseNet inferenceConfig={{decodingMethod: "single-person"}}input={input2}  onEstimate={(e) => {
                    setPose(e[0])
                
                }}/>
                <button onClick={() => poseSimiliarity(pose, target)}>print
                </button>
            </div>
            <div className="col-6">
                 <PoseNet inferenceConfig={{decodingMethod: "single-person"}} input={input}  onEstimate={(e) => {
                    setTarget(e[0])
                }}/>
            </div>

        </div>
    );
}

export default Train;