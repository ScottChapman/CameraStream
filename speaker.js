// Load the SDK
const AWS = require('aws-sdk')
const Stream = require('stream')
const Speaker = require('speaker')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})


function speak(text) {
  let params = {
      Text: text,
      OutputFormat: 'pcm',
      VoiceId: 'Kimberly'
  }
  return new Promise(function(resolve,reject) {
    Polly.synthesizeSpeech(params, (err, data) => {
	// Create the Speaker instance
	const Player = new Speaker({
	  channels: 1,
	  bitDepth: 16,
	  sampleRate: 16000
	})

      if (err)
        reject(err);
      if (data) {
      	console.log("Got speech back");
        if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough()
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream)
            // Pipe into Player
            bufferStream.pipe(Player)
            resolve();
        }
      }
    })
  })
}

/*
// speak("Hello, my name is Marge Simpson").catch(err => {
speak("the first person looks undefined").catch(err => {
  console.dir(err);
});
*/

module.exports.speak = speak;
