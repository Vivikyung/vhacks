var webSocket;
	  function createWebsocket(){
	    webSocket = new WebSocket("ws://localhost:4567/chat");
		webSocket.onmessage = function (msg) {
	console.log(msg);
	var data = JSON.parse(msg.data);

	switch(data.command) {
    case "ChatMessage":
        break;
		    case "ChatRequest":
        break;
		    case "ChatsAvailable":
        break;
		    case "RequestPoint":
			addMarker(data.markerIdx,new google.maps.LatLng(data.latitude, data.longitude));
        break;
		    case "RemovePoint":
			clearMarkers();
			for (i = 0; i < markers.length; i++) { 
			console.log("i:" + i + " m idx " + markers[i].idx + " d idx " + data.markerIdx);
			
			  if(markers[i].idx == data.markerIdx){
			    markers.splice(i,1);
				break;
			  }
			}
			
			showMarkers();

			console.log(markers);
        break;
		    case "RegisterCommand":
        break;
		    case "AnswerStream":
        break;
			case "OfferStream":
        break;
	} 
};

webSocket.onclose = function () { 
	alert("WebSocket connection closed");
};

webSocket.onerror = function(evt){
	console.log(evt);
}

webSocket.onopen = function(){
	username = prompt("Welcome!", "Enter your name");

	if (username == null || username == "") {
		txt = "User cancelled the prompt.";
	} else {
		txt = "Hello " + username + "! How are you today?";
		var object = {"command":"RegisterCommand","userIdx":username};
		console.log(object);
		console.log(JSON.stringify(object));
		webSocket.send(JSON.stringify(object));
	} 
}
	  }
	  
      
      var map;
	  var targetMarker;
      var markers = [];
	  var username;
      function initMap() {
        var haightAshbury = {lat: 37.769, lng: -122.446};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: haightAshbury,
          mapTypeId: 'terrain'
        });

        // This event listener will call addMarker() when the map is clicked.
        map.addListener('click', function(event) {
		  targetMarker.setPosition(event.latLng);
        });

		targetMarker = new google.maps.Marker({
          position: {lat: 37.769, lng: -122.446},
          map: map,
		  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
		createWebsocket();
      }

      // Adds a marker to the map and push to the array.
      function addMarker(index, location) {
        var marker = new google.maps.Marker({
		  idx: index,
          position: location,
          map: map,
		  icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        markers.push(marker);
      }

	  function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }
	  
	  function submitPoint(){
	  var object = {"command":"RequestPoint","userIdx":username, "latitude":targetMarker.getPosition().lat(),"longitude":targetMarker.getPosition().lng()};
		  webSocket.send(JSON.stringify(object));
	  }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }