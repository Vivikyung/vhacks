var username = "testi";

var explore = true;

  $('#loginButton').click(function() {
		username = $('#username').val();
		$('.loginScreen').hide();
		console.log(username)
		createWebsocket();
	})

	var overlay = $("#overlay"),
        fab = $(".fab"),
     cancel = $("#cancel"),
     livestream = $("#livestream");

//fab click
fab.on('click', openFAB);
overlay.on('click', closeFAB);
cancel.on('click', startStream);
livestream.on('click', gotoStream);
function startStream(){
	window.location.replace('http://192.168.200.127:3000/#1');
}
function gotoStream(){
		 window.location.replace('http://192.168.200.127:3000/');
	 }

function openFAB(event) {
  if (event) event.preventDefault();
  fab.addClass('active');
  overlay.addClass('dark-overlay');

}

function closeFAB(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  fab.removeClass('active');
  overlay.removeClass('dark-overlay');
  
}


function initMap() {
			var haightAshbury = {lat: 37.769, lng: -122.446};

			map = new google.maps.Map(document.getElementById('map'), {
				zoom: 12,
				center: haightAshbury,
				mapTypeId: 'terrain'
			});

			// This event listener will call addMarker() when the map is clicked.
		map.addListener('click', function(event) {
			if(prevMarker != null){
			prevMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
			}
			explore = true;
			document.getElementById('bigbutton').value = "Explore!";
			document.getElementById("information").innerHTML = "";
			targetMarker.setPosition(event.latLng);
			prevMarker = null;
			});

			targetMarker = new google.maps.Marker({
			position: {lat: 37.769, lng: -122.446},
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			});

		}

var webSocket;
	function createWebsocket(){
		webSocket = new WebSocket("ws://192.168.200.86:4567/chat");

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
		addMarker(data.markerIdx,data.userIdx,new google.maps.LatLng(data.latitude, data.longitude));
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
	openFAB();
	break;
	}
	};

	webSocket.onclose = function () {
	
	};

	webSocket.onerror = function(evt){
	console.log(evt);
	}

	webSocket.onopen = function(){
		console.log(username)
	var object = {"command":"RegisterCommand","userIdx":username};
	console.log(object);
	console.log(JSON.stringify(object));
	webSocket.send(JSON.stringify(object));

	}
}


	  var prevMarker;
		var map;
		var targetMarker;
		var markers = [];
		var targetIdx;


      // Adds a marker to the map and push to the array.
	function addMarker(index, usr, location) {
		var marker = new google.maps.Marker({
			idx: index,
			user: usr,
			position: location,
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		});
		markers.push(marker);

		google.maps.event.addListener(marker, 'click', function() {
			if(prevMarker != null){
			prevMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
			}
			marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
			document.getElementById("information").innerHTML = "Verona would like to see some more about the church!";
			selectedMarkerIdx = index;
			targetIdx = usr;
			prevMarker = marker;
			explore = false;
			document.getElementById('bigbutton').value = "Guide!";
		});
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
	  
	  var selectedMarkerIdx;
	  function changeWindow(){
		  window.location.replace('http://192.168.200.127:3000/#1');
	  }

	  function submitPoint(){
		  if(explore == true){
	  var object = {"command":"RequestPoint","userIdx":username, "latitude":targetMarker.getPosition().lat(),"longitude":targetMarker.getPosition().lng()};
		  webSocket.send(JSON.stringify(object));
		  
		  
		  }else{
		var object = {"command":"OfferStream","userIdx":username, "targetIdx":targetIdx,"markerIdx":selectedMarkerIdx};
		  		  webSocket.send(JSON.stringify(object));

		  }  
	  }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }
