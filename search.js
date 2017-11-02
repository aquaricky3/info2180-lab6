window.onload = function() {
    
    var s = document.getElementById("button");
    s.addEventListener("click", function(element) {
        
        var httpRequest = new XMLHttpRequest();
        var look_for = document.getElementById("word").value;
        
        if (look_for == 'ajax' || look_for == 'definition' || look_for == 'bar' || look_for == 'html' || look_for == 'css'|| look_for == 'javascript'|| look_for == 'php'){
            httpRequest.open('GET', 'request.php?q=' + look_for);
            
            httpRequest.onload = function() {
                
                if (httpRequest.status === 200) {
                    document.getElementById('result').innerHTML = (httpRequest.responseText);
                }
                
                else {
                    alert('There was a problem with the request.');
                }

            };

        }    
        
        else{
            alert("Definition not found");  
        }

    httpRequest.send();
    });
    
    var a = document.querySelector('#all');
    a.addEventListener('click', function() {
        var httpRequest = new XMLHttpRequest();
        var url = "request.php?=&all=true";
        httpRequest.onreadystatechange = all;
        httpRequest.open('GET', url);
        httpRequest.send();

        function all() {
            
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
            
              if (httpRequest.status === 200) {
                var response = httpRequest.responseXML;
                var result = document.querySelector('#result');
                var entries = response.getElementsByTagName('definition');

                var defs = document.createElement('ol');
                result.appendChild(defs);
            
                for (var x = 0; x < entries.length; x++) {
                    var def = document.createElement('li');
                    var def1 = document.createElement('h3');
                    var def2 = document.createElement('p');
                    var def3 = document.createElement('p');
                    var name = document.createTextNode(entries[x].getAttribute("name"));
                    var text = document.createTextNode(entries[x].childNodes[0].nodeValue);
                    var author = document.createTextNode(entries[x].getAttribute("author"));
                    def1.appendChild(name);
                    def2.appendChild(text);
                    def3.appendChild(author);
                    def.appendChild(def1);
                    def.appendChild(def2);
                    def.appendChild(def3);
                    defs.appendChild(def);
                }

              } 

              else {
                alert('There was a problem with the request.');
              }

            }
        
        }
    
    });

};