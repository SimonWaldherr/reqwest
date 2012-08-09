<?php

Header('X-Powered-By:0xBADCAB1E');
include './../../repos/easySQL/easysql_sqlite.php';
include './../../repos/easySQL/crypto.php';

$filename  = './../user.sqlite';
$username  = $_POST['name'];
$emailadr  = $_POST['mail'];
$hashdpwd1 = $_POST['hpwd1'];
$hashdpwd2 = $_POST['hpwd2'];

if(!file_exists($filename))
  {
    $create[0]           = $filename;
    $create[1]           = 'user';
    $create['id']        = 'integer PRIMARY KEY AUTOINCREMENT';
    $create['username']  = 'varchar NOT NULL UNIQUE';
    $create['password1'] = 'varchar NOT NULL';
    $create['password2'] = 'varchar NOT NULL';
    $create['emailadr']  = 'varchar NOT NULL UNIQUE';
    $create['timestam']  = 'integer';
    
    easysql_sqlite_create($create);
  }
if((isset($username)&&isset($emailadr)&&isset($hashdpwd1)&&isset($hashdpwd2)))
  {
    $insert[0]           = $filename;
    $insert[1]           = 'user';
    $insert['username']  = $username;
    $insert['password1'] = $hashdpwd1;
    $insert['password2'] = easysql_hashmix($hashdpwd2.$username);
    $insert['emailadr']  = $emailadr;
    $insert['timestam']  = time();
    
    $rowid = easysql_sqlite_insert($insert);
    echo $rowid;
  }
else
  {
    echo 'no';
  }

die();

?>