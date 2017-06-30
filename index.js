var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs-extra');
var path = require('path');
var vision = require('@google-cloud/vision')({
	keyFilename: './key.json',
	projectId: 'MyCamera'
});

var spawn = require('child_process').spawn;
var proc;
var streamFile = "./stream/stream.jpg";
var imageFile = "./stream/image.jpg";

//app.use('/', express.static(path.join(__dirname, 'stream')));
app.use('/stream', express.static(path.join(__dirname, 'stream')));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

	console.log("Socket connected...");
  socket.on('disconnect', function() {
		stopStreaming();
  });

  socket.on('take-photo', function() {
    takePhoto(io);
  });

	fs.watchFile(imageFile, {persistent: false, interval: 500}, function(current, previous) {
		if (fs.existsSync(imageFile)) {
		  console.log("Image taken!");
		  io.sockets.emit('takePhoto', imageFile + '?_t=' + (Math.random() * 100000));
			console.log("Checking with google machine...");
		  vision.detect(imageFile, [
				"crops",
				"document",
				"faces",
				"landmarks",
				"labels",
				"logos",
				"properties",
				"safeSearch",
				"similar",
				"text"
			],
			function(err, info, resp) {
				console.log("Got something back!");
				console.dir(err);
				console.log(JSON.stringify(info,null,2));
				console.dir(resp)
		  });
		}
	})

	fs.watchFile(streamFile, function(current, previous) {
		if (fs.existsSync(streamFile)) {
			console.log("Stream changed");
		  io.sockets.emit('liveStream', streamFile + '?_t=' + (Math.random() * 100000));
		}
	})

	startStreaming(io);
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

function stopStreaming() {
  console.log("Stopping streaming...");
  if (proc) {
		console.log("Killing proc");
		proc.kill();
  }
  fs.unwatchFile(streamFile);
}

function takePhoto(io) {
  console.log("Take photo!");
	fs.copy(streamFile,imageFile)
		.then(() => console.log("Photo Taken!"))
		.catch(err => console.dir(err))
}

function startStreaming(io) {
	console.log("Starting streaming");
	if (!proc || !proc.connected) {
	  var args = ["-w", "640", "-h", "480", "-n", "-vs", "-o", streamFile, "-t", "999999999", "-tl", "100"];
	  proc = spawn('raspistill', args);
	}
}
