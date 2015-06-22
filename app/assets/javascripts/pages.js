// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/



$(function() {
    
    $('button').on('click',function(){
        // mystring = JSON.stringify(gon.val);
        // $('#mydiv').html(mystring);
        // alert(gon.val.name);
        
        var number = 10;

       $.ajax({
          type: "POST",
          url: '/pages/calculate',
          data: {mydata: JSON.stringify(number)},
          success: function(msg) {
            markMap(msg);
         }
         
         
        });
        
        
       
        
    
        
        // alert(gon.val3);
        
        
    });
    
    
    function markMap(x){
        $("#mydiv").html("It worked! Here is the data: " + x);
    }
     
    
    // $("#main").on("ajax:success", function(e, data, status, xhr){
    //         alert("ajax worked");
    //     )};

    
});

