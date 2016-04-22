function getHttpObject(){
    if(typeof XMLHttpRequest == "undefined"){
	    XMLHttpRequest = function(){
		    try{return new ActivXObject("Msxml2.HTTPXML.6.0")}
			catch(e){}
			try{return new ActivXObject("Msxml2.HTTPXML.3.0")}
			catch(e){}
			try{return new ActivXObject("Msxml2.HTTPXML")}
			catch(e){}
			return false;
		}
	}
	return new XMLHttpRequest;
}



function addLoadEvent(func){
    var oldLoad = window.onload;
	if(typeof window.onload != 'function'){
	    window.onload = func;
	}else{
	    window.onload = function(){
		    oldLoad();
		    func();
		}
	}
}



function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
	    parent.appendChild(newElement,targetElement);
	}else{
	    parent.insertBefore(newElement,targetElement.nextSibling);
	}
}



function getNewContent(){
	var request = getHttpObject();
	if(request){
		//alert("request received");
		request.open("GET","example.txt",true);
		request.onreadystatechange = function(){
		if(request.readyState == 4){
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementsByTagName("body")[0].appendChild(para);
			}
		}
		request.send(null);
	}else{
		alert("Sorry, your browser doesn't support XMLHttpRequest!");
	}
	//alert("FUNCTION DOME");
}

//addLoadEvent(getNewContent);



function abbrList(){
	var abbrs=document.getElementsByTagName("abbr");
	var define=[];
	if(abbrs.length<1) return false;
	for(var i=0;i<abbrs.length;i++){
		define[abbrs[i].lastChild.nodeValue]=abbrs[i].getAttribute("title");
	}
	var dl=document.createElement("dl");
	for(var key in define){
		var dt=document.createElement("dt");
		var dd=document.createElement("dl");
		var dt_txt=document.createTextNode(key);
		var dd_txt=document.createTextNode(define[key]);
		dt.appendChild(dt_txt);
		dd.appendChild(dd_txt);
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	document.getElementsByTagName("body")[0].appendChild(dl);
}

addLoadEvent(abbrList);