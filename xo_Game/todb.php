<?php  
    include('connection.php'); 

    if($_POST['Type']=='New Game'){
        $insert_stmt = $db->prepare("INSERT INTO `xo`(`table_size`,`game`) VALUES (".$_POST['table_size'].",'".$_POST['game']."')");
        $insert_stmt->execute();
    }
?>