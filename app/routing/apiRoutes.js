var path = require("path");
var friendsArray = require('../data/friends.js');

module.exports = function (app) {
	//whenever the user goes to the api/tables url go ahead and display the tableData in json format
	app.get('/api/friends', function (req, res) {
		res.json(friendsArray);
	});

	app.post('/api/friends', function (req, res) {
		
		var bestMatch = {
			name: "",
			photo: "",
			difference: 100
		};

		var newFriend = req.body;
		newFriend.scores = newFriend.scores.split(",");
		friendsArray.push(newFriend);
		
		var newScores = newFriend.scores;
		// minus 1 s.t. it does not iterate over itself
		for (var i = 0; i < (friendsArray.length - 1); i++) {
			var difference = 0;
			for (var j = 0; j < friendsArray[i].scores.length; j++) {
				//this takes the abolute difference between the two scores and adds it to friendCalc
				difference += Math.abs(friendsArray[i].scores[j] - parseInt(newScores[j]));
			}
			if (difference < bestMatch.difference) {
				bestMatch.name = friendsArray[i].name;
				bestMatch.photo = friendsArray[i].photo;
				bestMatch.difference = difference;
				// console.log("bestMatch.name: " + bestMatch.name);
				// console.log("bestMatch.difference: " + bestMatch.difference);
			}
		}
		console.log(bestMatch);
		res.json(bestMatch);
	});
}