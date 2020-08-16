

![alt text][logo]

[logo]: https://ik.imagekit.io/nwiq66cx3pvsy/Group_3.png "Logo Title Text 2"

![alt text][pict]

[pict]: https://ik.imagekit.io/nwiq66cx3pvsy/messageImage_1597539880359.jpg

# Demo
Link Youtube : https://youtu.be/wf_AZKN8BY0 <br />
Google Drive Link (if the video got taken down by youtube) : https://drive.google.com/file/d/1nKwpkjud6s5p_LsZW-g0lj3b2dXyBqXy/

# Inspiration
Dealing with the Covid-19 virus, schools must carry out their teaching and learning activities from home. We've discovered that some of the subjects are difficult to do with the limitations of learning from home, and one of them is a sports subject. We wanted to solve this issue with a video conference exercise that can help sports teachers to monitor their students with the support of the auto-detection of the student movement.

# What is does
meetXercise is a video conference application where users have to follow instructor pose until they are similar. Users need to follow the instructor pose within the time set by the instructor. The instructor will be notified if one of the users still have a different pose.

# Our Technology
We use React to handle flow data in  client side , in server side we use framework called **rtcmulticonnection** to handle comunication between client using socket programming , and for model we use **PoseNet** model in tensorflow to help us give pose prediction

## Accomplishments that we're proud of
It's fun to build an application that can help other people. We're excited that apart from solving the problem, this application also fun.

## Challenges we ran into
Before this project, none of us had any experience with WebSockets, and it was difficult to set up since we all had to adjust to a different communication protocol. We had to use some hacks to get it hosted correctly 

## What we learned
We have learned how to build a video conference application using React as Front-End, RTCMultiConnection library for peer-to-peer video conferencing, and also how to use **PoseNet** to acquire the information about pose from the video. 

## What's next for Our Project
We will add more features! Such as providing pose templates so that users can use the application without an instructor and implement gamification so the application becomes more fun.


## prerequisite
1. Node Js >= 12.18.3
2. NPM  (yarn) >= 6.14.6


## Installation

```bash
git clone <this repo url>
cd <this repo> 
npm install 
npm start 
```
