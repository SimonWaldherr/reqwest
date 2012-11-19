<?php

if(isset($_POST['timestamp']))
    {
      ob_start();
      echo $_POST['timestamp'].' #$$$# '.'data1 = '.$_POST['data1']."\n".'data2 = '.$_POST['data2']."\n".'data3 = '.$_POST['data3']."\n".'data4 = '.$_POST['data4']."\n"."\n \n";
      $data = nl2br(ob_get_clean());
      echo $data.md5($data);
      var_dump($_POST);
      die();
    }

if($_GET['validate'] == 'true')
  {
    include('./repos/FormMate/validate/formmate.php');
    ob_start();
    
    echo 'Hello ';
    echo fm_converttxt($_POST['username']);
    echo "\n".'your password is ';
    if(fm_password($_POST['password'])>640)
      {
        echo md5(fm_hashmix($_POST['password'], $salt='!Sc&§5GalShQ9e!1', $rounds=5123));
      }
    else
      {
        echo 'insecure';
      }
    
    echo "\n".'this is your eMail-adress:  ';
    echo fm_email($_POST['emailadr'], 1);
    echo "\n".'the timestamp of your birthday is ';
    echo fm_since(strtotime($_POST['birthday']), 'sec');
    
    echo nl2br(ob_get_clean());
    die();
  }

$textvar  = 'Neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit ...';
$textvar .= rand(100, 900000);

ob_start();

echo "SERVER TIME: ".time()."\n";
echo "\n RANDOM SHA256 HASH: ".hash("SHA256", $textvar)."\n";
echo "RANDOM MD5 HASH: ".hash("MD5", $textvar)."\n";
echo "RANDOM CRC32 HASH: ".hash("CRC32", $textvar)."\n";
echo "\n GET: \n";
var_dump($_GET);
echo "\n \n POST: \n";
var_dump($_POST);

echo nl2br(ob_get_clean());

?>