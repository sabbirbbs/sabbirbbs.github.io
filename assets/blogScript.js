var posts = ["Live USB Encrypted Persistence","Eye Care 20-20-20","ARP Spoofer to be in the middle","Network Scanner to discover clients","Linux MAC Changer CLI","Mathematical Game","6 digit password list generator in python.","Mad libs game."];
//Always add new post title on the first index of the "posts" array.
function blog(){
document.getElementById("content").innerHTML = blogPage;
if(posts === undefined || posts.length == 0){
	document.getElementById("postLink").innerHTML = ` No note has been published yet.`;
}//If not post has been published.
else{
for(var i = 0;i<posts.length;i++){
var noteNum = Math.abs(i-posts.length);
var oc =`onclick="note('notes/`+noteNum+`.html','`+noteNum+`')"`;
document.getElementById("postLink").innerHTML += '<a name="'+noteNum+'" href="#'+posts[i]+'" '+oc+'>'+'<span style="color:white">BBS-Note-'+noteNum+'</span>> '+posts[i]+'</a>'+'<br>';
}
}
}//Entire blog under the function
