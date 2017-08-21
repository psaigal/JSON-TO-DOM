$(document).ready(function(){
	(function blah(){

	//GLOBAL VARIABLES
	// var count = 0;
	// var maxCount = 10;

	//CACHE DOM
	var container = $("#container");
	var loadButton = $("#load-more");
	
	//FETCH JSON DATA
	var data;
	$.get("https://dl.dropboxusercontent.com/s/bs8iiggp3ot7g6h/data.json", callback);
	
	function callback(data, status){
		data = $.parseJSON(data);
		loadButton.click(function(){
			getData(data, container);
		})
	}

	var addCount = function() {
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
	}();


	function getData(data,container) {
		var min = addCount("get").count;
		var max = addCount("get").maxCount;
		for (var i = min; (i < max) && (i <= data.length-1); i++) {
			var $person = $("<div>", {id: "person-" + data[i].id, "class": "person"});
			var personInfo = "<h3>" + data[i].first_name + " " + data[i].last_name  + "</h3>";
			personInfo += "<p>" + data[i].gender + "</p>";
			personInfo += "<p>" + data[i].email + "</p>";
			$person.append(personInfo);
			container.append($person);
		}
		addCount("add");
	}
	})();

})







