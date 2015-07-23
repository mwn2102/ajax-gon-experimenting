$(document).ready(function(){
    if ($('#container').length) {
        
    
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var polyline = null; 
    var geocoder;
    $('#result').html("working?");
    
    // function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var chicago = new google.maps.LatLng(41.850033, -87.6500523);
      geocoder = new google.maps.Geocoder(); 
      var mapOptions = {
        zoom:7,
        center: chicago
      };
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      directionsDisplay.setMap(map);
    //   Begin
        polyline = new google.maps.Polyline({
        // path: [],
        // strokeColor: '#FF0000',
        // strokeWeight: 3
        });
    //     End
    // }
    
    // var addresses = gon.result; //can I put this here!!!???
    
    function printResult(){
            $("#result").html('');
            $("#result").append("<tr><th>Restaurant</th><th>Rating</th><th>Address</th></tr>");
            $.each(gon.result, function(i, val){
              $("#result").append("<tr><td>" + val[0] + " </td><td>" + val[1] + " </td><td>" + val[2] + "</td></tr>");
              
            });

          //watch space between .each and () !!!
          // "<tr><td>" + val[i][0] + "</td></tr>" i + ' ' + val[0]
          // issue: there was no val[i] because val was already the specific element of the array!
          //issue: needed to append instead of html ... html was overriding!
          
          
    }
    
    // function calcRoute() {
      
      var start = gon.start;         // document.getElementById('start').value;
      var end = gon.destination;               //     document.getElementById('end').value;
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
                // marker = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
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
            // result.innerHTML = polyline.GetPointsAtDistance(16000);
            
            //What is this code below?
            var myarr = [];
            for (var i=0; i<points.length; i++) {
              myarr.push(points[i].A + "," + points[i].F);
            }
            // console.log(myarr);
            
            $('input').val(points);
            $('#hidden_form').submit();
            
            var addresses = gon.result; //
            
            for (var i = 0; i < addresses.length; i++) {
                geocodeAddress(addresses, i);
            }
            
            printResult();
            // var testing = $('input').val();
            // console.log(testing);
            
            // $("#result").html(gon.result);
           
          // $('button').on('click',function(){
          //     // $('#hidden_form').val(123);
          //     $('#coords').val(points);
          //     $('#hidden_form').submit();
          //     var testing = $('#coords').val();
          //     console.log(testing);
              
              // console.log();
              
              // console.log(gon.val4);
        
              // $.ajax({
              // type: "GET",
              // url: '/pages/create',
              // // data: points,  
              // success: function(msg) {
              //   console.log("it worked");
              //   },
              //   error: function(msg){
              //     console.log('error');
              //   }
              // });
          // });
           
            
            
                
            //     // JSON.stringify(points)
           
    
            
        }
      });
    // }
    
    // google.maps.event.addDomListener(window, 'load', initialize);
    
    // $('button').on('click',function(){
    //         calcRoute();
    //         // printResult();
    //         // alert(gon.result);
    //         // $("#result").html(gon.result);
    // });
    
    // function markMap(x){
    //     $("#result").html("It worked! Data is:" + x);
    // }
    
    
    function geocodeAddress(addresses, i) {
      setTimeout(function () {
      console.log('working');
      var title = addresses[i][0];
      var address = addresses[i][2];
      geocoder.geocode({
          'address': addresses[i][2].toString()
        },
    
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log('working inside');
            var marker = new google.maps.Marker({
    //           icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
              map: map,
              position: results[0].geometry.location,
              title: i + 1 + '. ' + title
    //           animation: google.maps.Animation.DROP,
    //           address: address,
    //           url: url
            });
            
              
    
            infoWindow(marker, map, title);
    //         bounds.extend(marker.getPosition());
    //         map.fitBounds(bounds);
          } else {
            alert("geocode of " + address + " failed:" + status);
          }
        });
      }, i * 1000);
    
    }
    
    function infoWindow(marker, map, title) {
      google.maps.event.addListener(marker, 'click', function() {
        iw = new google.maps.InfoWindow({
          content: title,
          maxWidth: 350
        });
        iw.open(map, marker);
      });
    }
     
        
    }
});