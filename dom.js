$(document).ready(function(){

	//FETCH JSON DATA
	$.get("https://dl.dropboxusercontent.com/s/bs8iiggp3ot7g6h/data.json", callback);
	
	function callback(data, status){
		console.log(status);
		console.log($.parseJSON(data));
	}



})




