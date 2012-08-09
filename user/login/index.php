<?php

Header('X-Powered-By:0xBADCAB1E');
session_name('sessionid');
session_start();

if((!isset($_SESSION['salt']))||((time() - $_SESSION['timestamp']) > 600))
{
  echo 'cookie error, please reload this page';
}

include './../../repos/easySQL/easysql_sqlite.php';
include './../../repos/easySQL/crypto.php';

$filename       = './../user.sqlite';
$emailadr       = $_POST['mail'];
$hashdpwd1      = $_POST['hpwd1'];
$hashdpwd2      = $_POST['hpwd2'];

if(file_exists($filename))
  {
    $select[0] = $filename;
    $select[1] = 'user';
    $select['emailadr'] = $emailadr;
    
    $returnarray = easysql_sqlite_select($select, 1);
    
    if(easysql_hashmix($hashdpwd2.$returnarray[0][1]) == $returnarray[0][3])
      {
        if(hash("SHA512", $returnarray[0][2].$_SESSION['salt']) == $hashdpwd1)
          {
            echo 'Hello '.$returnarray[0][1]."\n";
          }
        else
          {
            echo 'not you';
          }
      }
    else
      {
        echo 'not you';
      }
  }
else
  {
    echo 'their is no user in the database';
  }

?>