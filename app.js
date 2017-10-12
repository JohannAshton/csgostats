var gameStats = [];
document.getElementsByName("submitbutton")[0].addEventListener("click", submitForm);

// to be executed when the submit button is pressed.
function submitForm() {
	let d = new Date();
	let newData = {
		"playername":document.getElementById("playername").value,
		"timedate":d.getTime(),
		"map":document.getElementById("map").value,
		"rank":document.getElementById("rank").value,
		"kills":document.getElementById("kills").value,
		"assists":document.getElementById("assists").value,
		"deaths":document.getElementById("deaths").value,
		"mvps":document.getElementById("mvps").value,
		"points":document.getElementById("points").value
	}
	// Makes sure playername is not undefined, kills is not less that the minimum of -3,
	if (newData.playername != null | newData.kills < -3 | ) {
		gameStats[gameStats.length] = newData;
		google.charts.setOnLoadCallback(drawKdOverTime); // draws (or redraws) the chart. That function calls kdOverTime.
	}

}
function kdForEachPlayer (stats) {
		let dataArray = [];
		let kd = [];
		let playernames = [];
		/*for (let x = 0; x < stats.length; x++) {
				kd[x] = stats[x].kills / stats[x].deaths;
				dataArray[x + 1] = [stats[x].playername, kd[x]];
				console.log(dataArray);
		}*/
		for (let x = 0; x < stats.length; x++) {
				kd[x] = stats[x].kills / stats[x].deaths;
				playernames[x] = stats[x].playername;
		}
		let count = 0
		for (let x = 0; x < stats.length; x++) {
				for (let i = 0; x < stats.length; x++) {
						if (stats[x].playername === stats[i].playername) {
								count++
								dataArray[x] = [stats[x].playername, (stats[x].kd + stats[i].kd) / 2];
						}
				}
		}
		console.log(dataArray);
		return dataArray;
}
// This function calculates the KD of each game and then formats it so that it can be used in Google Charts.
function kdOverTime (stats) {
	let finalArray = []
	finalArray[0] = ["KD", "Timestamp"]
	let kd = []
	let timestamp = []
	for (let x = 0; x < stats.length; x++) {
		timestamp[x] = stats[x].timedate
		// validation to make sure that a divide by zero error does not occur
		if (stats[x].deaths != 0) {
			kd[x] = stats[x].kills / stats[x].deaths;
		}
		else {
			kd[x] = 0;
		}
		finalArray[x + 1] = [timestamp[x], kd[x]]


	}
	console.log(finalArray)
	return finalArray
}

google.charts.load('current', {
		'packages': ['corechart']
});
//google.charts.setOnLoadCallback(drawKdOverTime);

function drawKdOverTime() {
		var data = google.visualization.arrayToDataTable(kdOverTime(gameStats));
		var options = {
				title: 'KD/Time',
				curveType: 'function',
				legend: {
						position: 'bottom'
				}
		};

		var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
}
