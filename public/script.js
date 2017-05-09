var myModal = document.querySelector('#myModal');
var allTables = document.querySelectorAll('.gameTables');
var homeTab = document.querySelector('#homeTabLi');
var awayTab = document.querySelector('#awayTabLi');
var gameName = '';

homeTab.addEventListener('click', function(e){
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

  today = yyyy+mm+dd;

      $.ajax({
        url:"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/game_boxscore.json?gameid="+today+"-"+gameName+"&teamstats=W,L,PTS,PTSA&playerstats=2PA,2PM,3PA,3PM,FTA,FTM",
        headers: {"Authorization": "Basic " + btoa('ltl237' + ":" + 'student12')
    }, success: function(data){

      var awayPlayerHolder = data.gameboxscore.awayTeam.awayPlayers;
      var homePlayerHolder = data.gameboxscore.homeTeam.homePlayers;
      
      var myNode =  myModal.querySelector('tbody');

      while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild);
      }
      for(var j = 0; j < homePlayerHolder.playerEntry.length; j++){
        var tableData = document.querySelector('#innerModal');
        var tBody = tableData.querySelector('tbody');
        // var awayPlayerName = allTables[i].querySelector('.awayPlayer');
        var awayPlayerName = document.createElement('tr');
        tBody.appendChild(awayPlayerName);
        var firstName = homePlayerHolder.playerEntry[j].player.FirstName;
        var lastName = homePlayerHolder.playerEntry[j].player.LastName;
        
        var aFga = homePlayerHolder.playerEntry[j].stats.Fg2PtAtt['#text'];
        var aFtm = homePlayerHolder.playerEntry[j].stats.FtMade['#text'];
        var aFta = homePlayerHolder.playerEntry[j].stats.FtAtt['#text'];
        var aFgm = homePlayerHolder.playerEntry[j].stats.Fg2PtMade['#text'];
        

        var aFg3PtMade = homePlayerHolder.playerEntry[j].stats.Fg3PtMade['#text'];
        var aFg3PtAtt = homePlayerHolder.playerEntry[j].stats.Fg3PtAtt['#text'];
        var aPoints = +aFtm + (aFgm * 2) + (+aFg3PtMade*3);
        // var aFgP = (+aFgm + +aFg3PtMade) / (+aFga + +aFg3PtAtt);
        var aFG = +aFgm + +aFg3PtMade;
        var aFGA = +aFga + +aFg3PtAtt;
        var aFgP = ((aFG / aFGA) * 100).toFixed(1);
        
        var aTitle = document.querySelector('.modal-title');
        aTitle.textContent = data.gameboxscore.game.awayTeam.Abbreviation + '@' +data.gameboxscore.game.awayTeam.Abbreviation;

        var td = document.createElement('td');
        td.className = "modalDataNames";
        td.textContent =  lastName + ', ' + firstName;
        awayPlayerName.appendChild(td);

        var aPts = document.createElement('td');
        aPts.textContent = aPoints;
        awayPlayerName.appendChild(aPts);

        var aTdFgP = document.createElement('td');
        aTdFgP.textContent = aFgP + '% ' + '('+ aFG + '/' + aFGA +')';
        awayPlayerName.appendChild(aTdFgP);
        aTdFgP.className = "modalData";
        if(aTdFgP.textContent == "NaN% (0/0)"){
          aTdFgP.textContent = "0% (0/0)";
        }
       
        var aTd3P = document.createElement('td');
        aTd3P.textContent = (+aFg3PtMade / +aFg3PtAtt * 100).toFixed(1) + '% ' + '('+ aFg3PtMade + '/' + aFg3PtAtt +')';;
        awayPlayerName.appendChild(aTd3P);
        aTd3P.className = "modalData";
        if(aTd3P.textContent == "NaN% (0/0)"){
          aTd3P.textContent = "0% (0/0)";
        }


        var aFTP = document.createElement('td');
        aFTP.textContent =  (+aFtm / +aFta * 100).toFixed(1) + '% ' + '('+ aFtm + '/' + aFta +')';
        awayPlayerName.appendChild(aFTP);
        aFTP.className = "modalData";
        if(aFTP.textContent == "NaN% (0/0)"){
          aFTP.textContent = "0% (0/0)";
        }
      }
      
      }, dataType: 'json', async:false});
});

awayTab.addEventListener('click', function(e){
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

  today = yyyy+mm+dd;

      $.ajax({
        url:"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/game_boxscore.json?gameid="+today+"-"+gameName+"&teamstats=W,L,PTS,PTSA&playerstats=2PA,2PM,3PA,3PM,FTA,FTM",
        headers: {"Authorization": "Basic " + btoa('ltl237' + ":" + 'student12')
    }, success: function(data){

      var awayPlayerHolder = data.gameboxscore.awayTeam.awayPlayers;
      var homePlayerHolder = data.gameboxscore.homeTeam.homePlayers;
      
      var myNode =  myModal.querySelector('tbody');

      while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild);
      }
      for(var j = 0; j < awayPlayerHolder.playerEntry.length; j++){
        var tableData = document.querySelector('#innerModal');
        var tBody = tableData.querySelector('tbody');
        // var awayPlayerName = allTables[i].querySelector('.awayPlayer');
        var awayPlayerName = document.createElement('tr');
        tBody.appendChild(awayPlayerName);
        var firstName = awayPlayerHolder.playerEntry[j].player.FirstName;
        var lastName = awayPlayerHolder.playerEntry[j].player.LastName;
        
        var aFga = awayPlayerHolder.playerEntry[j].stats.Fg2PtAtt['#text'];
        var aFtm = awayPlayerHolder.playerEntry[j].stats.FtMade['#text'];
        var aFta = awayPlayerHolder.playerEntry[j].stats.FtAtt['#text'];
        var aFgm = awayPlayerHolder.playerEntry[j].stats.Fg2PtMade['#text'];
        

        var aFg3PtMade = awayPlayerHolder.playerEntry[j].stats.Fg3PtMade['#text'];
        var aFg3PtAtt = awayPlayerHolder.playerEntry[j].stats.Fg3PtAtt['#text'];
        var aPoints = +aFtm + (aFgm * 2) + (+aFg3PtMade*3);
        // var aFgP = (+aFgm + +aFg3PtMade) / (+aFga + +aFg3PtAtt);
        var aFG = +aFgm + +aFg3PtMade;
        var aFGA = +aFga + +aFg3PtAtt;
        var aFgP = ((aFG / aFGA) * 100).toFixed(1);
        
       

        var td = document.createElement('td');
        td.className = "modalDataNames";
        td.textContent =  lastName + ', ' + firstName;
        awayPlayerName.appendChild(td);

        var aPts = document.createElement('td');
        aPts.textContent = aPoints;
        awayPlayerName.appendChild(aPts);

        var aTdFgP = document.createElement('td');
        aTdFgP.textContent = aFgP + '% ' + '('+ aFG + '/' + aFGA +')';
        awayPlayerName.appendChild(aTdFgP);
        aTdFgP.className = "modalData";
        if(aTdFgP.textContent == "NaN% (0/0)"){
          aTdFgP.textContent = "0% (0/0)";
        }
       
        var aTd3P = document.createElement('td');
        aTd3P.textContent = (+aFg3PtMade / +aFg3PtAtt * 100).toFixed(1) + '% ' + '('+ aFg3PtMade + '/' + aFg3PtAtt +')';;
        awayPlayerName.appendChild(aTd3P);
        aTd3P.className = "modalData";
        if(aTd3P.textContent == "NaN% (0/0)"){
          aTd3P.textContent = "0% (0/0)";
        }


        var aFTP = document.createElement('td');
        aFTP.textContent =  (+aFtm / +aFta * 100).toFixed(1) + '% ' + '('+ aFtm + '/' + aFta +')';
        awayPlayerName.appendChild(aFTP);
        aFTP.className = "modalData";
        if(aFTP.textContent == "NaN% (0/0)"){
          aFTP.textContent = "0% (0/0)";
        }
      }
      
      }, dataType: 'json', async:false});
});

// console.log(allTables[0]);
for(var i = 0; i < allTables.length; i++){
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

  today = yyyy+mm+dd;
  allTables[i].addEventListener('click', function(e){

    $('#myModal').modal('show');
    gameName = this.getAttribute("game");

    $.ajax({
        url:"https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/game_boxscore.json?gameid="+today+"-"+gameName+"&teamstats=W,L,PTS,PTSA&playerstats=2PA,2PM,3PA,3PM,FTA,FTM",
        headers: {"Authorization": "Basic " + btoa('ltl237' + ":" + 'student12')
    }, success: function(data){

      var awayPlayerHolder = data.gameboxscore.awayTeam.awayPlayers;
      var homePlayerHolder = data.gameboxscore.homeTeam.homePlayers;
      
      var myNode =  myModal.querySelector('tbody');

      while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild);
      }
      for(var j = 0; j < homePlayerHolder.playerEntry.length; j++){
        var tableData = document.querySelector('#innerModal');
        var tBody = tableData.querySelector('tbody');
        // var awayPlayerName = allTables[i].querySelector('.awayPlayer');
        var awayPlayerName = document.createElement('tr');
        tBody.appendChild(awayPlayerName);
        var firstName = homePlayerHolder.playerEntry[j].player.FirstName;
        var lastName = homePlayerHolder.playerEntry[j].player.LastName;
        
        var aFga = homePlayerHolder.playerEntry[j].stats.Fg2PtAtt['#text'];
        var aFtm = homePlayerHolder.playerEntry[j].stats.FtMade['#text'];
        var aFta = homePlayerHolder.playerEntry[j].stats.FtAtt['#text'];
        var aFgm = homePlayerHolder.playerEntry[j].stats.Fg2PtMade['#text'];
        

        var aFg3PtMade = homePlayerHolder.playerEntry[j].stats.Fg3PtMade['#text'];
        var aFg3PtAtt = homePlayerHolder.playerEntry[j].stats.Fg3PtAtt['#text'];
        var aPoints = +aFtm + (aFgm * 2) + (+aFg3PtMade*3);
        // var aFgP = (+aFgm + +aFg3PtMade) / (+aFga + +aFg3PtAtt);
        var aFG = +aFgm + +aFg3PtMade;
        var aFGA = +aFga + +aFg3PtAtt;
        var aFgP = ((aFG / aFGA) * 100).toFixed(1);
        
        var aTitle = document.querySelector('.modal-title');
        aTitle.textContent = data.gameboxscore.game.awayTeam.Abbreviation + ' @ ' +data.gameboxscore.game.homeTeam.Abbreviation;


        var td = document.createElement('td');
        td.className = "modalDataNames";
        td.textContent =  lastName + ', ' + firstName;
        awayPlayerName.appendChild(td);

        var aPts = document.createElement('td');
        aPts.textContent = aPoints;
        awayPlayerName.appendChild(aPts);

        var aTdFgP = document.createElement('td');
        aTdFgP.textContent = aFgP + '% ' + '('+ aFG + '/' + aFGA +')';
        awayPlayerName.appendChild(aTdFgP);
        aTdFgP.className = "modalData";
        if(aTdFgP.textContent == "NaN% (0/0)"){
          aTdFgP.textContent = "0% (0/0)";
        }
       
        var aTd3P = document.createElement('td');
        aTd3P.textContent = (+aFg3PtMade / +aFg3PtAtt * 100).toFixed(1) + '% ' + '('+ aFg3PtMade + '/' + aFg3PtAtt +')';;
        awayPlayerName.appendChild(aTd3P);
        aTd3P.className = "modalData";
        if(aTd3P.textContent == "NaN% (0/0)"){
          aTd3P.textContent = "0% (0/0)";
        }


        var aFTP = document.createElement('td');
        aFTP.textContent =  (+aFtm / +aFta * 100).toFixed(1) + '% ' + '('+ aFtm + '/' + aFta +')';
        awayPlayerName.appendChild(aFTP);
        aFTP.className = "modalData";
        if(aFTP.textContent == "NaN% (0/0)"){
          aFTP.textContent = "0% (0/0)";
        }
  
      }
      
      }, dataType: 'json', async:false});

  });
};

$('#myModal').on('shown.bs.modal', function(){

});



(function poll(){
  // console.log('sup');
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

  today = yyyy+mm+dd;

  setTimeout(function(){
    $.ajax({
      
      url:'https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/scoreboard.json?fordate='+
      today,
      headers: {"Authorization": "Basic " + btoa('ltl237' + ":" + 'student12')
  }, success: function(data){
        //update your dashboard gauge
        var gameData = data.scoreboard.gameScore;

        // var tableID = document.getElementById('');
        for(var i = 0; i < gameData.length; i++){
          var tableData = document.getElementById(gameData[i].game.ID);
          var awayScore = tableData.querySelector('.awayScore');
          var homeScore = tableData.querySelector('.homeScore');
          var time = tableData.querySelector('.timeTd');

          awayScore.textContent = gameData[i].awayScore;
          homeScore.textContent = gameData[i].homeScore;
          if(gameData[i].isCompleted == "true" || (gameData[i].isCompleted == "false" && gameData[i].isUnplayed == "false")) {
            time.textContent = 'END';
            time.style.color = 'red';
          } 
          if(gameData[i].isInProgress == "true"){
            time.textContent = 'LIVE'
            time.style.color = 'green';
          }
        }
        //setup the next poll recursively
        poll();
      }, dataType: 'json'});
    }, 2000)
})();






