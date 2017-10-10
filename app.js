var gameStats = [];
//gameStats[0] = {
		"playername":"Johann",
		"timedate":"",
		"map":"de_cbble",
		"rank":"DMG",
		"kills":23,
		"assists":4,
		"deaths":14,
		"mvps":4,
		"points":"50"
}
//gameStats[1] = {
		"playername":"Johann",
		"timedate":"",
		"map":"de_cbble",
		"rank":"DMG",
		"kills":21,
		"assists":1,
		"deaths":17,
		"mvps":1,
		"points":"43"
}
function submitForm() {
	var 
	gameStats[gameStats.length]
}
function playerKillDeaths (stats) {
		let dataArray = [];
		titles = ['Player', 'KD'];
		dataArray[0] = titles;
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

google.charts.load('current', {
		'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
		var data = google.visualization.arrayToDataTable(playerKillDeaths(gameStats));

		var options = {
				title: 'Rank/KD',
				curveType: 'function',
				legend: {
						position: 'bottom'
				}
		};

		var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
}