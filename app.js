var gameStats = [];
document.getElementsByName("submitbutton")[0].addEventListener("click", submitForm);

// to be executed when the submit button is pressed. Adds the new data to the array of JSON objects gameStats
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
  if (newData.playername != null | newData.kills < -3) {
    gameStats[gameStats.length] = newData;
    google.charts.setOnLoadCallback(drawKdOverTime); // draws (or redraws) the chart. That function calls kdOverTime.
  }
  playerKD(gameStats);
}

// This procedure implements a search to remove duplicate names, placing them into the View Stats tab.
function playerKD (stats) {
  players = [];
  for (let x = 0; x < stats.length; x++) {
    let count = 0;
    for (let i = 0; i < stats.length; i++) {
      if (stats[x].playername != players[i]){
        count++;
      }
    }
    if (count = stats.length) {
      players[players.length] = stats[x].playername;
    }
  }
  let playerText = ""
  for (let x = 0; x < players.length; x++) {
    playerText = playerText + players[x] + '\n';
  }
  document.getElementById(playerfield).innerHTML = playerText;
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
      kd[x] = "9999";
    }
    finalArray[x + 1] = [timestamp[x], kd[x]]


  }
  console.log(finalArray)
  return finalArray
}

google.charts.load('current', {
    'packages': ['corechart']
});
// Google chart drawing functionality for KD/Time graph.
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
