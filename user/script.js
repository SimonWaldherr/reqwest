function getValue(id)
  {
    return document.getElementById(id).value;
  }

function getHTML(id)
  {
    return document.getElementById(id).innerHTML;
  }

function getSalt(id)
  {
    reqwest(
      {
          url: './salt/'
        , type: 'html'
        , method: 'post'
        , data: { timestamp: gettimestamp() }
        , success: function (resp)
            {
              document.getElementById(id).innerHTML = resp
            }
      })
  }

function getHPW(idmail, idpwd)
  {
    var SHA512 = new Hashes.SHA512;
    var mail   = getValue(idmail);
    var pwd    = getValue(idpwd);
    var str    = 'X'+pwd+'X'+mail+'X';
    var hpwd   = SHA512.b64(str);
    return hpwd;
  }

function getHSHPW(idmail, idpwd, salt)
  {
    var SHA512 = new Hashes.SHA512;
    var mail   = getValue(idmail);
    var pwd    = getValue(idpwd);
    var str    = 'X'+pwd+'X'+mail+'X';
    var hpwd   = SHA512.b64(str);
    var hshpwd = SHA512.b64('PW'+hpwd+salt+'/PW');
    return hshpwd;
  }

function ajaxsignup()
  {
    var hpw = getHPW('email', 'pass');
    var hpw1 = hpw.substr(0,48);
    var hpw2 = hpw.substr(48);
    if((getValue('email')=='')||(getValue('name')=='')||(getValue('pass')==''))
      {
        alert('Please fill every field');
        return false;
      }
    reqwest(
      {
          url: './signup/'
        , type: 'html'
        , method: 'post'
        , data: { mail: getValue('email'), hpwd1: hpw1, hpwd2: hpw2, name: getValue('name') }
        , success: function (resp)
            {
              if(resp == 0)
                {
                  alert('Your email-adress or username already exist in the database, please choose an other.')
                  return false;
                }
              else
                {
                  if(resp == 'no')
                    {
                      alert('Please fill every field');
                      return false;
                    }
                  else
                    {
                      alert('Your User-ID is: '+resp);
                      return true;
                    }
                }
            }
      })
  }

function ajaxlogin()
  {
    var SHA512 = new Hashes.SHA512;
    var hpw = getHPW('lemail', 'lpass');
    var hpw1 = SHA512.hex(hpw.substr(0,48)+getHTML('saltdiv'));
    var hpw2 = hpw.substr(48);
    reqwest(
      {
          url: './login/'
        , type: 'html'
        , method: 'post'
        , data: { mail: getValue('lemail'), hpwd1: hpw1, hpwd2: hpw2 }
        , success: function (resp)
            {
              alert(resp);
            }
      })
  }

function gettimestamp()
  {
    var nowts = new Date();
    return nowts.getTime();
  }

function getdata()
  {
    reqwest(
      {
          url: 'data.php?get=parameter'
        , type: 'html'
        , method: 'post'
        , data: { foo: 'bar', int: 100 }
        , success: function (resp)
            {
              document.getElementById('content1').innerHTML = resp
            }
      })
    }

