// import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const Dictaphone = () => {
//   const commands = [
//     {
//         command: 'reset',
//         callback: ({ resetTranscript }) => {console.log("reset"); resetTranscript()}
//     }
//   ]
  
//   const { transcript, resetTranscript } = useSpeechRecognition(commands)
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null
//   }

//   return (
//     <div>
//       <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
//       <button onClick={() => SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   )
// }
// export default Dictaphone