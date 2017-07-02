var fs = require('fs-extra');
var fs = require('fs');
var _ = require('lodash');
var numberToWords = require('number-to-words');
var humanize = require('humanize-plus');

/*
{
	"joy": true,
	"joyLikelihood": 4,
	"sorrow": false,
	"sorrowLikelihood": 0,
	"anger": false,
	"angerLikelihood": 0,
	"surprise": false,
	"surpriseLikelihood": 0,
	"underExposed": false,
	"underExposedLikelihood": 0,
	"blurred": false,
	"blurredLikelihood": 0,
	"headwear": false,
	"headwearLikelihood": 0
}
*/

var emotionMap = {
	joy: "happy",
	sorrow: "sad",
	anger: "angry"
}

function emotions(info,callback) {
	return new Promise(function(resolve,reject) {
			var result = {
			faces: []
		};
		var count = 1;
		info.faces.forEach(face => {
			var emotions = [];
			_.keys(emotionMap).forEach(emotion => {
				if (face[emotion] && face[emotion + 'Likelihood'] >= 3) emotions.push(emotionMap[emotion])
			})
			result.faces.push({
				confidence: face.confidence,
				text: "the " + numberToWords.toWordsOrdinal(count) + " person looks " + emotions[0],
				emotions: emotions,
				headwear: face.headwear
			})
			count++;
		})
		result.text = humanize.oxford(_.map(result.faces,'text'));
		resolve(result);
	});
}

emotions(JSON.parse(fs.readFileSync('./faces.json'))).then(emotions => {
	console.dir(emotions);
});
