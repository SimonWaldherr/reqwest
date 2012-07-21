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
      
      function getdataduration()
        {
          var datatransmit = new Array();
          datatransmit[1] = document.getElementById('data1').value;
          datatransmit[2] = document.getElementById('data2').value;
          datatransmit[3] = document.getElementById('data3').value;
          datatransmit[4] = document.getElementById('data4').value;
          
          reqwest(
            {
                url: 'data.php'
              , type: 'html'
              , method: 'post'
              , data: { data1: datatransmit[1], data2: datatransmit[2], data3: datatransmit[3], data4: datatransmit[4], timestamp: gettimestamp() }
              , success: function (resp)
                  {
                    var getdata = new Array();
                    getdata = resp.split(" #$$$# ");
                    document.getElementById('content7').innerHTML = 'time in millisec: '+(gettimestamp()-getdata[0])+"\n \n \n \n <br>"+getdata[1]+"\n";
                  }
            })
        }
      
      function getdataduration2()
        {
          document.getElementById('timestamp').innerHTML = gettimestamp();
          
          reqwest(
            {
                url: 'data.php?data=lorem-ipsum-dolar-sit-amet;'
              , type: 'html'
              , method: 'post'
              , data: { timestampdata: gettimestamp() }
              , success: function (resp)
                  {
                    document.getElementById('content8').innerHTML = (gettimestamp()-((document.getElementById('timestamp').innerHTML)-1));
                    document.getElementById('content8').innerHTML += "<br><br>"+gettimestamp()+"<br>"+document.getElementById('timestamp').innerHTML;
                  }
            })
        }
      
      function savedatatoid(id)
        {
          reqwest(
            {
                url: 'data.php?get=parameter'
              , type: 'html'
              , method: 'get'
              , success: function (resp)
                  {
                    document.getElementById(id).innerHTML = resp
                  }
            })
        }
      
      function ajaxreqwest(uri, id)
        {
          reqwest(
            {
                url: uri
              , type: 'html'
              , method: 'get'
              , success: function (resp)
                  {
                    document.getElementById(id).innerHTML = resp
                  }
            })
        }
      
      function ajaxsend(idfrom, uri, idto)
        {
          reqwest(
            {
                url: uri
              , type: 'html'
              , method: 'post'
              , data: { data: document.getElementById(idfrom).value }
              , success: function (resp)
                  {
                    document.getElementById(idto).value = resp
                  }
            })
        }
      
      function formtransmit(uri, idto)
        {
          reqwest(
            {
                url: uri
              , type: 'html'
              , method: 'post'
              , data: { username: document.getElementById('username').value
                      , password: document.getElementById('password').value
                      , emailadr: document.getElementById('emailadr').value
                      , birthday: document.getElementById('birthday').value
                      }
              , success: function (resp)
                  {
                    document.getElementById(idto).innerHTML = resp
                  }
            })
        }
      
      function deleteinnerHTML(id)
        {
          document.getElementById(id).innerHTML = "<br><br>";
        }
