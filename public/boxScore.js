var allTables = document.querySelectorAll('.scoreTables');
var i;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
  dd='0'+dd;
}; 
if(mm<10) {
  mm='0'+mm;
};

today = yyyy+mm+dd-1;

for(var i = 0; i < allTables.length;i++){

	$.ajax({
	      url:"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/game_boxscore.json?gameid="+today+"-"+allTables[i].id+"&teamstats=W,L,PTS,PTSA&playerstats=2PA,2PM,3PA,3PM,FTA,FTM",
	      headers: {"Authorization": "Basic " + btoa('ltl237' + ":" + 'student12')
	  }, success: function(data){
	  		console.log(data);
	  		var awayPlayerHolder = data.gameboxscore.awayTeam.awayPlayers;
	  		var homePlayerHolder = data.gameboxscore.homeTeam.homePlayers;
			console.log(awayPlayerHolder);
			console.log(homePlayerHolder);
			for(var j = 0; j < awayPlayerHolder.playerEntry.length; j++){
				// var tableData = document.querySelector('#'+allTables[i].id);
				// var awayPlayerName = allTables[i].querySelector('.awayPlayer');
				var awayPlayerName = document.createElement('tr');
				allTables[i].appendChild(awayPlayerName);
				var firstName = awayPlayerHolder.playerEntry[j].player.FirstName;
				var lastName = awayPlayerHolder.playerEntry[j].player.LastName;
			

				var td = document.createElement('td');
				var fgm = awayPlayerHolder.playerEntry[j].stats.Fg2PtMade['#text'];
				// td.textContent = firstName + ' o' + lastName + fgm;

				td.classList.add("modalData");
				awayPlayerName.appendChild(td);

				var tdFgm = document.createElement('td');
				console.log(awayPlayerHolder.playerEntry[j].stats.Fg2PtMade['#text']);
				// var fgm = awayPlayerHolder.playerEntry[j].player.FirstName
				// tdFgm.textContent = fgm;
				// awayPlayerName.appendChild(tdFgm);
				
			}
			
	    }, dataType: 'json', async:false});


} //end for loop 
