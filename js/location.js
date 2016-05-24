L.mapbox.accessToken = 'pk.eyJ1IjoiYnJ5YW5sb2hqeSIsImEiOiJjaW12Nnd2M3QwMm1pdXBra2hmeWQ2OWI3In0.M3vzM36scSxM3aTimLK56Q';



//https://github.com/mapbox/polyline
//https://github.com/mapbox/intro-to-mapbox/blob/master/demos/directions.html

// Define a map, map UI and a marker
var map;
var mapcontrol;
var marker;
var destmarker;
var destlat;
var destlong;

// Setup the geolocation and watch the user's position
geolocation = navigator.geolocation;
geolocation.watchPosition(updateLocation, showBadStatus);



// When we get the new location back
function updateLocation(position) {
  // Get the updated coords
  var mylat  = position.coords.latitude;
  var mylong = position.coords.longitude;

  $('.status').html("");

  $('#mylat').html("Current Latitude: " + mylat);
  $('#mylong').html("Current Longitude: " + mylong);


  if (map === undefined) {
    // Make the map and marker if they aren't defined, and add the marker to the map   
    map = L.mapbox.map('map', 'mapbox.streets')
    .setView([mylat, mylong], 20);

    //Add search UI
    var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
    });
    geocoderControl.addTo(map);

    //on selection
       geocoderControl.on('select', function(res) {
          //place initial destination marker
          if (destlat===undefined){
          destlong = (res.feature.center[0]);
          destlat = (res.feature.center[1]);
                    
          //adding destination marker
          destmarker = L.marker([destlat, destlong], {
          icon: L.mapbox.marker.icon({
          'marker-color': '#f86767'
            })
          });
          destmarker.addTo(map);      
          
          }
          else{   
          //if destination marker exists, move marker
          destlong = (res.feature.center[0]);
          destlat = (res.feature.center[1]);
           
          destmarker.setLatLng(L.latLng(destlat, destlong));  
          
          }

        //Direction Polyline between initial + destination
        
        var initpoints = [mylong,mylat].join(',');
        var destpoints = [destlong,destlat].join(',');
        var points= [initpoints,destpoints].join(';');

        var directionsUrl = 'https://api.mapbox.com/directions/v5/mapbox/walking/'+points+ '&geometries=polyline.json?access_token=' +L.mapbox.accessToken;

        //working url
        //https://api.mapbox.com/directions/v5/mapbox/walking/174.773353,-41.298318699999996;174.773314,-41.297835.json?access_token=pk.eyJ1IjoiYnJ5YW5sb2hqeSIsImEiOiJjaW12Nnd2M3QwMm1pdXBra2hmeWQ2OWI3In0.M3vzM36scSxM3aTimLK56Q
        //working url for polyline geometry
        //https://api.mapbox.com/directions/v5/mapbox/walking/174.773353,-41.298318699999996;174.773314,-41.297835&geometries=polyline.json?access_token=pk.eyJ1IjoiYnJ5YW5sb2hqeSIsImEiOiJjaW12Nnd2M3QwMm1pdXBra2hmeWQ2OWI3In0.M3vzM36scSxM3aTimLK56Q

        $.get(directionsUrl, function(data) {
            // Do something with the directions returned from the API.
            var encodedroute = data.routes[0].geometry;
            var route= polyline.decode(encodedroute);

            console.log(route);
            routePolyline=L.polyline(route);
            routePolyline.addTo(map).setLatLngs(route);
            map.fitBounds(routePolyline.getBounds())
        });






      });
    

 

  

    //Disable drag and zoom handlers.
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();

    // Disable tap handler, if present.
    if (map.tap) map.tap.disable();
    //Current location marker
    marker = L.marker([mylat, mylong], {
      icon: L.mapbox.marker.icon({
      'marker-color': '#f86767'
      })
    });

    marker.addTo(map);


    //Destination location marker
    // destinationmarker =L.marker([mylat, mylong], {
    //   icon: L.mapbox.marker.icon({
    //   'marker-color': '#f86767'
    //   })
    // });

    // destinationmarker.addTo(map);

  } else {
    // Update the marker with the new coords
    marker.setLatLng(L.latLng(mylat, mylong));
  }
}

function showBadStatus() {
  $('.status').html("Couldn't fetch your location.");
}
