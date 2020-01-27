// select next element of element selected
HTMLElement.prototype.next = function() {
	return this.nextElementSibling;
}
// select previous element of element selected
HTMLElement.prototype.pre = function() {
	return this.previousElementSibling;
}
// select parent element of element selected
HTMLElement.prototype.parent = function() {
	return this.parentElement;
}
// select child of element selected
HTMLElement.prototype.child = function(q) {
	var s = this.querySelectorAll(q);
	if (s.length==1)
		return s[0]
	else
		return s;
}

// get index of child
HTMLElement.prototype.index = function() {
	return Array.prototype.indexOf.call(this.parentNode.children, this);
}

// lop of element selected
HTMLElement.prototype.for = function(f) {
		f.call(this,0);
	return this;
}

// add Event Listener for element selected
HTMLElement.prototype.on = function(t,f) {
    this.addEventListener(t,f);
    return this;
}
// add Event Listener for element selected once
HTMLElement.prototype.one = function(t,f) {
    this.addEventListener(t,f,{once: true});
    return this;
}

// options for class attribute of element selected
HTMLElement.prototype.class = function(n,v) {
	if (v==undefined) {
		this.classList.add(n);
	}else if (v=="") {
		this.classList.remove(n);		
	}else {
		this.classList.remove(n);
		this.classList.add(v);
	}
	return this
}

// check class attribute of element selected
HTMLElement.prototype.cls = function(n) {
	return this.classList.contains(n);
}

// shortening some necessary option
HTMLElement.prototype.w = function(i) {
	if(typeof i=="number")
		this.style.width=i+"px"
	else if (typeof i=="string")
		this.style.width=i
	return this.offsetWidth;
}
HTMLElement.prototype.h = function(i) {
	if(typeof i=="number")
		this.style.height=i+"px"
	else if (typeof i=="string")
		this.style.height=i
	return this.offsetHeight;
}
HTMLElement.prototype.x =  function(i) {
	if(typeof i=="number")
		this.style.left=i+"px"
	else if (typeof i=="string")
		this.style.left=i
	return this.offsetLeft;
}
HTMLElement.prototype.y =  function(i) {
	if(typeof i=="number")
		this.style.top=i+"px"
	else if (typeof i=="string")
		this.style.top=i
	return this.offsetTop;
}
// append into or after and befor of element selected
HTMLElement.prototype.append = function(t,f) {
	if(f !=undefined){
		if (t=="before") {
			this.insertAdjacentHTML('beforebegin', f)
			return this.previousSibling;
		}else if (t=="after") {
			this.insertAdjacentHTML('afterend', f);
			return this.nextSibling;
		}else if(t=="end"){
			this.insertAdjacentHTML('beforeend', f);
			return this.lastChild;
		}else {
			this.insertAdjacentHTML('afterbegin', f);
			return this.firstChild;
		}
	}else{
		this.insertAdjacentHTML('afterbegin', t);
		return this.firstChild;
	}
}

// set of get attribute of element selected
HTMLElement.prototype.attr = function(name ,value) {
	if (value!=undefined) {
	   	this.setAttribute(name, value)	
	}
	if(this.attributes[name])
		return this.attributes[name].value;
	else
		return undefined;
}
// remove element selected
HTMLElement.prototype.rem = function() {
	this.remove();
}
// append into or after and befor of element selected
NodeList.prototype.append = function(t,f) {
	var type;
	if(f !=undefined){
		if (t=="before") {
			type='beforebegin'
		}else if (t=="after") {
			type='afterend'
		}else if(t=="end"){
			type='beforeend'
		}else {
			type='afterbegin'
		}
	}else{
		type='afterbegin'
		f=t;
	}
	for (var i = 0; i < this.length; i++) {
		this[i].insertAdjacentHTML(type, f)
	}
}
// remove elements selected
NodeList.prototype.rem = function() {
	for (var i = 0; i < this.length; i++) {
		this[i].remove();
	}
}

// add Event Listener for elements selected
NodeList.prototype.on = function(t,f) {
	for (var i = 0; i < this.length; i++) {
    	this[i].addEventListener(t,f);
	}
	return this;
}
// set of get attribute of elements selected
NodeList.prototype.attr = function(name ,value) {
	if (value!=undefined) {
		for (var i = 0; i < this.length; i++) {
		   	this[i].setAttribute(name, value)	
		}
	}
	if(this[0].attributes[name]!=undefined)
		return this[0].attributes[name].value;
	else
		return undefined;
}

// lop of elements selected
NodeList.prototype.for = function(f) {
	for (var i = 0; i < this.length; i++) {
		f.call(this[i],i);
	}
	return this;
}

// options for class attribute of elements selected
NodeList.prototype.class = function(n,v) {
	for (var i = 0; i < this.length; i++) {
		if (v==undefined) {
			this[i].classList.add(n);
		}else if (v=="") {
			this[i].classList.remove(n);		
		}else {
			this[i].classList.remove(n);
			this[i].classList.add(v);
		}
	}
	return this
}

// shortening query selector elements 
window.$=function(text) {
	var s=document.querySelectorAll(text);
	if (s.length==1)
		return s[0]
	else
		return s;
}	
// function for window Event Listener 
window.on = function(t,f) {
	this.addEventListener(t,f);
};

// shortening alent and console functions 
window.dir= function (text) {
	console.dir(text);
}
window.log= function(text) {
	console.log(text);
}
window.media= function(q,f) {
	var x = window.matchMedia(q);
	f(x) // Call listener function at run time
	x.addListener(f);
}
window.cookie= function(name, value) {
	if (value!=undefined) 
 		document.cookie = name+'='+value+';expires=Thu, 1 Dec 2036 12:00:00 UTC";path=/'
 	else if (value=="") {
    	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 	}else{
 		re= document.cookie.match(new RegExp(name + '=([^;]+)'));
 		if (re!=null)
 			return re[1];
 	}
}
// send request to link 
window.http=function(link,data,call,info) {
	if(typeof call=="undefined"){
		call=data
		data=""
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			call(this.responseText);
		}
	}
	if(typeof info!="undefined"){
		xhttp.onerror = info.onerror
		xhttp.onabort = info.onerror
		xhttp.ontimeout = info.onerror
		xhttp.onprogress = info.onprogress
		xhttp.upload.onprogress = info.onuploadprogress
		if (info.post)
			xhttp.open("POST", link, true);
		else
			xhttp.open("GET", link, true);
	}else
		xhttp.open("GET", link, true);
		xhttp.onBeforeSendHeaders=function(){
			console.log(1);	
		}
	xhttp.send(data);
	return xhttp;
}
window.import =function(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}
window.del =function(s){
	for(var i in s){ delete s[i];}
}
window.copy =function(text) {
	if("clipboard" in navigator)
    	navigator.clipboard.writeText(text)
}
window.ready =function(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		setTimeout(fn, 1);
	}else{
		document.addEventListener("DOMContentLoaded", fn);
	}
}