$(document).ready(function(){
	(function friendList(){

	//CACHE DOM
	var container = $("#container");
	var loadButton = $("#load-more");
	
	//FETCH JSON DATA
	var data;
	$.get("https://dl.dropboxusercontent.com/s/bs8iiggp3ot7g6h/data.json", callback).fail(function(jqXHR) {
		container.append("<p>Sorry there was an error retrieving the data from the server</p>")
	});
	
	function callback(data, status){
		data = $.parseJSON(data);
		if (status === "success") {
			loadButton.click(function(){
				getData(data, container);
			})

			container.on("click", ".person", function(event){
				if ($(event.target).attr("class") === "person" ){
					var personInfo = $(event.target);
					personInfo.children().fadeOut("2000", function(){
						if ($(personInfo.children()[personInfo.children().length-1]).css("display") === "none"){
							getFriends(data, event.target);
						}
					});
				}
			})
		}
	}

	//HELPER FUNCTION

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
			personInfo += "<p class='info-style'>Gender: " + data[i].gender + "</p>";
			personInfo += "<p class='info-style'>Email: " + data[i].email + "</p>";
			$person.append(personInfo);
			container.append($person);
		}
		addCount("add");
	}
	})();

	function getFriends(data,person){
		for(var i = 0; i <= data.length-1; i++){
			if (data[i].id === parseFloat($(person).attr("id"))){
				var friendHeader = "<h3>" + data[i].first_name + " " +  data[i].last_name + "'s" + "<h3>Friends</h3>";
				$(person).append(friendHeader);
				var $friendInfoDiv = [];
				var y = 0;
				data[i].friends.forEach(function(friend){
					$friendInfoDiv[y] = $("<div>", {"class": "friendInfoDiv"});
					var friendInfo = "<p class='info-style'>" + (y+1) + ". " +  friend.first_name + " " + friend.last_name + "</p>";
					friendInfo += "<p class='info-style'>" + friend.email + "</p>";
					$friendInfoDiv[y].append(friendInfo);
					$(person).append($friendInfoDiv[y]);
					y += 1;
				})
			
			}
		}

	}
})







