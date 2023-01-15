<?php include('connection.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="style.css">
  <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XO Game</title>
</head>

<body>
  <div class="container-fluid text-center fisrtpage mt-2">
    <h2>X O GAME</h2>
    <div class="row mt-2">
      <div class="col-4">
      </div>
      <div class="col-4">
        <div class="alert alert-success" role="alert">
            <h2>New Game</h2>
            <label>Choose X O Size</label>
            <input class="form-control mt-2" type="number" min="3" step="2" id="checkSize" onchange="CheckNumber()"><br>
            <i style="color:red" id="xosize"></i>
            <button type="button"  class = 'btn btn-dark mb-3 btn-lg' onclick="StartGame()" id="startGame">Start</button>
          </div>

        <div class="alert alert-warning" role="alert">
        <h2>Replay</h2>
        </div>
          <?php
            $select_stmt = $db->prepare("SELECT * FROM `xo` ORDER BY id");
            $select_stmt->execute();
            while($row = $select_stmt->fetch(PDO::FETCH_ASSOC)) {?>
              <button type="button" class ="btn btn-info mb-3 btn-lg text-white" onclick="ReplayGame('Game<?php echo $row['id'] ?>',<?php echo $row['table_size'] ?>,'<?php echo $row['game'] ?>')">Game<?php echo $row['id'] ?></button>
            <?php }?>
        </div>
        <div class="col-4">

      </div>
    </div>
  </div>
  <div class="container-fluid text-center">
  <div class="row reloadpage">
      <div class="col-2"></div>
      <div class="col-8">
      <div class="alert alert-danger mt-2" role="alert">
        <h2 id="ReplayHead"></h2>
      </div>
        <div id="Replay"></div>
      </div>
      <div class="col-2"></div>
  </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
      <div class="alert alert-danger mt-2" id="turnG" role="alert">
        <h2 id="HTurn">X Turn</h2>
      </div>
      </div>
      <div class="col-4">
      </div>
    </div>
    <div class="row">
      <div class="col" id="Game"></div>
    </div>
    <div class="row">
      <div class="col mt-2 endgame">
      <button type="button" class = 'btn btn-danger mb-3 btn-lg ' onclick="StopGame()">End</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
      <button type="button" class = 'btn btn-danger mt-3 btn-lg reloadpage' onclick="location.reload()">End</button>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>