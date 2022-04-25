//Data Variable
var date = new Date();
var age = date.getFullYear() - 2000;

const act = `<div id="root"><span>root</span>@devil:/var/www/html# grep activity index.html</div>
	<b>Learn To Code</b><br>
		Yea,I like to play with code.I have to know what's that & how it's work.<br>
	   <b>Blogging</b><br>
		Really,Blogging is a way to publish own activities.I am so serious to create a virtual diary by it.In my blog i will try to concat all of my future projects.<br>
	   <b>Challenge Taking</b><br>
		I like to complete all of my task by taking a challenge.I wanna achive all of my need by fullfil my challenge.It's an easy way to stay under rules.<br>
		`;

const skills = `<div id="root"><span>root</span>@devil:/var/www/html# grep skills index.html</div>
		<b>Researching</b> [&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;...]<br>
		<b>Analysing</b> [&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;&iiota;.....]<br>
		<b>Cheating</b> [&iiota;&iiota;&iiota;&iiota;&iiota;...............]`;

const edu = `<div id="root"><span>root</span>@devil:/var/www/html# grep education index.html</div>
		<b>Self-Education</b> - Yeah,am a letterless guy.I wanna to know a little bit by beggared concept.`;

const homePage = `<div id="root"><span>root</span>@devil:/var/www/html# ls</div>
			/notes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; /assets &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; contact.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; hidden()<br>
			<div id="root"><span>root</span>@devil:/var/www/html# tail -1 index.html</div>
			<span>Hey,what's up buddy?<br>
			This is <b>MD Sabbir Hosen</b> from Bangladesh.Am `+ age +` years old.I like to learn always something new from you.
			I wanna be a simple programmer.But,it's funny i can't write a proper single line of code let alone develop any entire project.
			Let's take a look of my mentality.<br>
			`+act+skills+edu+
			`</span>`;//Home page data

const contactPage = `<div id="root"><span style="color:rgb(52, 235, 225);">bbs@devil</span>:/var/www/html/contact# ./contact.py</div>
			<span style="color:red;">bash: ./contact.py: Permission denied</span>
			<span><div id="root"><span style="color:rgb(52,235,225);">bbs@devil</span>:/var/www/html/contact# cat contact.py</div></span>
			<span>
			#!/usr/bin/python<br>
			import base64 as bbs<br>
			mail = "c2FiYmlyMTc0YmJzQGdtYWlsLmNvbQ=="<br>
			fb = "aHR0cHM6Ly9tLm1lL3NhYmJpcmJicw=="<br>
			x = bbs.b64decode(num)<br>
			print("Email me: "+bbs.b64decode(mail))<br>
			print("Message me: "+bbs.b64decode(fb))<br>
			</span>`;//Contact page data


const blogPage = `<div id="root"><span>root</span>@devil:/var/www/html/notes# apt-get upgrade</div>
			<span>Get:1 <a href="#project-1" onclick="project('notes/2.html')">6 digit password list.</a></span><span style="float:right;padding-right:0%;"> from projects</span></br>
			<span>Get:2 <a href="#note-1" onclick="note('notes/1.html','1')">Mad libs game.</a></span><span style="float:right;padding-right:0%;"> from notes</span></br>
			<span>Get:3 <a href="#note-2" onclick="project('notes/5.html')">Network Scanner to discover clients.</a></span><span style="float:right;padding-right:0%;">  from projects</span></br>
			<span>Fetching latest projects... Done
			<div id="root"><span>root</span>@devil:/var/www/html/notes# grep BBS-Note | ls notes</div>
			<span id="postLink"></span>`;//Blog page data

document.getElementById("content").innerHTML = homePage;
//Onclick function
function contact(){
	document.getElementById("content").innerHTML = contactPage;
}//Contact page

function home(){
	document.getElementById("content").innerHTML = homePage;
}//Home page

function note(link,Num){
	pg = document.getElementById("blogPost");
	pg.src = link;
	pg.name = Num;
	var vs = document.getElementById("blogTerminal");
	vs.style.display = "block";
}//Note iframe creator

function project(link){
	pg = document.getElementById("project");
	pg.src = link;
	var vs = document.getElementById("projectTerminal");
	vs.style.display = "block";
}//Project preview iframe

function prev(){
	var x = document.getElementById("blogPost").name;
if(x==1){
}else{
	x -= 1;
	var y = document.getElementById("blogPost");
	y.src = "notes/"+x+".html";
	y.name = x;
}
}//Previouse buttun

function next(){
	var a = document.getElementById("blogPost").name;
if(a==posts.length){
}else{
	z = Number(a) + 1;
	var b = document.getElementById("blogPost");
	b.src = "notes/"+z+".html";
	b.name = z;
}
}//Next button

function exit(tab){
	document.getElementById(tab).style.display = "none";
}//Tab close button

function mini(){
	var a = document.getElementById("terminal");
	a.style.position = "fixed";
	a.style.top = "88%";
	a.style.width = "80%";
	a.style.left = "2%";
}//Tab minimize button

function maxi(){
	var a = document.getElementById("terminal");
	a.style.position = "static";
	a.style.width = "99%";
	
}//Tab maximize button

function blogMin(){
	var a = document.getElementById("blogTerminal");
	a.style.position = "fixed";
	a.style.width = "70%";
	a.style.top= "93%";
	a.style.right = "30%";
}//Blog minimize button

function blogMax(){
	var a = document.getElementById("blogTerminal");
	a.style.width = "90%";
	a.style.position = "absolute";
	a.style.left = "5%";
	a.style.top = "20%";
}


function hide(){
	var y = document.getElementById("blogPost").name;
if(1 == posts.length){
	document.getElementById("nav").style.display = "none";
}else if(y == 1){
	document.getElementById("prev").style.display = "none";
	document.getElementById("next").style.display = "block";
}else if(y == posts.length){
	document.getElementById("next").style.display = "none";
	document.getElementById("prev").style.display = "block";
}else{
	document.getElementById("prev").style.display = "block";
	document.getElementById("next").style.display = "block";
}
}//Next & prev buton control
function hidden(){
	console.log(`WOW!You are genius.):>:...`);
}
