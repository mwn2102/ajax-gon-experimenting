// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/





$(function() {
    
    
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var polyline = null; 
      
    
    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      var mapOptions = {
        zoom:7,
        center: chicago
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay.setMap(map);
    //   Begin
        polyline = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeWeight: 3
        });
    //     End
    }
    
    function calcRoute() {
      var start = document.getElementById('start').value;
      var end = document.getElementById('end').value;
      var request = {
          origin:start,
          destination:end,
          travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          polyline.setPath([]);
          var bounds = new google.maps.LatLngBounds();
          startLocation = new Object();
          endLocation = new Object();
          var route = response.routes[0];
          
          var path = response.routes[0].overview_path;
          var legs = response.routes[0].legs;
            for (i=0;i<legs.length;i++) {
              if (i == 0) { 
                startLocation.latlng = legs[i].start_location;
                startLocation.address = legs[i].start_address;
                // marker = google.maps.Marker({map:map,position: startLocation.latlng});
    //             marker = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
              }
              endLocation.latlng = legs[i].end_location;
              endLocation.address = legs[i].end_address;
              var steps = legs[i].steps;
              for (j=0;j<steps.length;j++) {
                var nextSegment = steps[j].path;
                for (k=0;k<nextSegment.length;k++) {
                  polyline.getPath().push(nextSegment[k]);
                  bounds.extend(nextSegment[k]);
                }
              }
            }
    
            polyline.setMap(map);
            var result = document.getElementById('result');
            var points = polyline.GetPointsAtDistance(16000);
            result.innerHTML = polyline.GetPointsAtDistance(16000);
           
            var myarr = [];
            for (var i=0; i<points.length; i++) {
              myarr.push(points[i].A + "," + points[i].F);
            }
            console.log(myarr);
           
            
            $.ajax({
              type: "POST",
              url: '/pages/calculate',
              dataType: 'JSONP',
              data: {mydata: myarr},
              success: function(msg) {
                alert("it worked");
                }
                
            //     // JSON.stringify(points)
            });
    
            
        }
        
      });
      
      
      
    
    }
    
    google.maps.event.addDomListener(window, 'load', initialize);
    
    $('button').on('click',function(){
            calcRoute();
    });
    
    // function markMap(x){
    //     $("#result").html("It worked! Data is:" + x);
    // }
     
});



   // $('button').on('click',function(){
    //     // mystring = JSON.stringify(gon.val);
    //     // $('#mydiv').html(mystring);
    //     // alert(gon.val.name);
        
    //     var number = 10;
    // });