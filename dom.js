$(document).ready(function(){
	(function friendList(){

	//CACHE DOM
	var container = $("#container");
	var loadButton = $("#load-more");
	
	//FETCH JSON DATA
	var data;
	$.get("https://dl.dropboxusercontent.com/s/bs8iiggp3ot7g6h/data.json", callback);
	
	function callback(data, status){
		data = $.parseJSON(data);
		console.log(status);
		loadButton.click(function(){
			getData(data, container);
		})

		container.on("click", ".person", function(event){
			if ($(event.target).attr("class") === "person" ){
				var personInfo = $(event.target);
				personInfo.children().fadeOut("2000", function(){
					if ($(personInfo.children()[personInfo.children().length-1]).css("display") === "none"){
						console.log("qwewqeqwe")
						getFriends(data, event.target);
					}
				});
			}
		})
	}

	var addCount = (function addCount() {
		var count = 0;
		var maxCount = 10;
		return function(action){
			if (action === "add") {
				count += 10;
				maxCount += 10;
			}
			return {
				count: count,
				maxCount: maxCount
			}
		}
	})();



	function getData(data,container) {
		var min = addCount("get").count;
		var max = addCount("get").maxCount;
		for (var i = min; (i < max) && (i <= data.length-1); i++) {
			var $person = $("<div>", {id: data[i].id, "class": "person"});
			var personInfo = "<h3>" + data[i].first_name + " " + data[i].last_name  + "</h3>";
			personInfo += "<p>" + data[i].gender + "</p>";
			personInfo += "<p>" + data[i].email + "</p>";
			$person.append(personInfo);
			container.append($person);
		}
		addCount("add");
	}
	})();

	function getFriends(data,person){
		console.log("ewgfuywevfuewgbfhj")
		for(var i = 0; i <= data.length-1; i++){
			if (data[i].id === parseFloat($(person).attr("id"))){
				var friendInfo = "<p>Friends</p>";
				data[i].friends.forEach(function(friend){
					friendInfo += "<p>" +  friend.first_name + " " + friend.last_name + "</p>";
					friendInfo += "<p>" + friend.email + "</p>";
				})
				$(person).append(friendInfo);
			}
		}

	}
})







