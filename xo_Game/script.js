$("#startGame").hide();
$(".endgame").hide();
$("#HTurn").hide();
$("#turnG").hide();
$(".reloadpage").hide();

function CheckNumber() {
  var inputSize = document.getElementById("checkSize").value;
  if (inputSize % 2 == 0) {
    document.getElementById("xosize").innerHTML = "*กรุณากรอกเลขคี่เท่านั้น";
    $("#startGame").hide();
  } else {
    document.getElementById("xosize").innerHTML = "";
    $("#startGame").show();
  }
}

function StartGame() {
  $(".fisrtpage").hide();
  $(".endgame").show();
  $("#HTurn").show();
  $("#turnG").show();
  var showTable;
  var inputSize = document.getElementById("checkSize").value;
  showTable = '<table id="myTable">';
  for (i = 0; i < inputSize; i++) {
    showTable += "<tr>";
    for (j = 0; j < inputSize; j++) {
      showTable +=
        '<td><div class="content emp" id="' + i + "_" + j + '"" onClick="getval(this.id)"></div></td>';
    }
    showTable += "</tr>";
  }
  showTable += "</table>";
  document.getElementById("Game").innerHTML = showTable;
}

let num = 0;
function getval(id) {
  var element = document.getElementById(id);
  num++;
  if (num % 2 == 1) {
    element.innerHTML = "X";
    element.classList.add("PlayerA");
    document.getElementById("HTurn").innerHTML = 'O Turn';
    findWinner("X", id);
  } else {
    element.innerHTML = "O";
    element.classList.add("PlayerB");
    document.getElementById("HTurn").innerHTML = 'X Turn';
    findWinner("O", id);
  }
  element.classList.remove("emp");
  element.removeAttribute("onclick");
}

let game = [], pointXtr = [], pointXtd = [], pointOtr = [], pointOtd = [];
let diaX = [0,0], diaO = [0,0];

function findWinner(player, id) {
  var inputSize = document.getElementById("checkSize").value;
  game.push(id);
  const rowGame = id.split("_");
  if(game.length==1){
    for(i = 0;i<inputSize;i++){
      pointXtr[i]=0;
      pointXtd[i]=0;
      pointOtr[i]=0;
      pointOtd[i]=0;
    }
  }
  if (player == "X") {
    if(+rowGame[0] + +rowGame[1]==inputSize-1){
      diaX[0]++;
    }
    for (i = 0; i < inputSize; i++) {
      if(rowGame[0] == i && rowGame[1] == i){
        diaX[1]++;
      }
      if (rowGame[0] == i) {
        p = pointXtr[i];
        pointXtr[i] = p + 1;
      }
      if(rowGame[1] == i){
        p = pointXtd[i];
        pointXtd[i] = p + 1;
      }
      if(diaX[0]==inputSize||diaX[1]==inputSize||pointXtr[i]==inputSize||pointXtd[i]==inputSize){
        setTimeout(function() {
          alert('X Win');  
          SaveGame();
        }, 100); 
        break; 
      }else if(num == inputSize*inputSize){
        setTimeout(function() {
          alert('Draw');  
          SaveGame();
        }, 100); 
        break; 
      }
    }
  } else {
    if(+rowGame[0] + +rowGame[1]==inputSize-1){
      diaO[0]++;
    }
    for (i = 0; i < inputSize; i++) {
      if(rowGame[0] == i && rowGame[1] == i){
        diaO[1]++;
      }
      if (rowGame[0] == i) {
        p = pointOtr[i];
        pointOtr[i] = p + 1;
      }
      if(rowGame[1] == i){
        p = pointOtd[i];
        pointOtd[i] = p + 1;
      }
      if(diaO[0]==inputSize||diaO[1]==inputSize||pointOtr[i]==inputSize||pointOtd[i]==inputSize){
        setTimeout(function() {
          alert('O Win');  
          SaveGame();
        }, 100); 
        break; 
      }
    }
  }
}

function SaveGame(){
  var inputSize = document.getElementById("checkSize").value;
  $.ajax({
    type: "POST",
    url: "todb.php",
    data: {
      Type: "New Game",
      table_size : inputSize,
      game: game.toString()
    },
    success: function () {
      location.reload();
    },
  });
}

function StopGame(){
  if(confirm("Game will not save")){
    location.reload();
  }
}

function ReplayGame(id,table_size,game){
  $(".reloadpage").show();
  $(".fisrtpage").hide();
  let point = 0;
  document.getElementById("ReplayHead").innerHTML = "Replay "+id;
  TableReplay = '<table id="ReplayGame'+id+'">';
  for (i = 0; i < table_size; i++) {
    TableReplay += "<tr>";
    for (j = 0; j < table_size; j++) {
      TableReplay +=
        '<td><div class="content emp" id="'+ i + "_" + j + '"></div></td>';
    }
    TableReplay += "</tr>";
  }
  TableReplay += "</table>";
  document.getElementById("Game").innerHTML = TableReplay;
  const myArray = game.split(",");
  for(i = 0; i < myArray.length; i++) {
    setTimeout(function() {
      var element = document.getElementById(myArray[point]);
      if (point % 2 == 0) {
        element.innerHTML = "X";
        element.classList.add("PlayerA");
      } else {
        element.innerHTML = "O";
        element.classList.add("PlayerB");
      }  
      point++; 
      }, 1000 * i);
  } 
}
