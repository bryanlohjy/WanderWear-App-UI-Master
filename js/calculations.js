// var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");
// // Retrieve new posts as they are added to our database
// ref.on("child_added", function(snapshot, prevChildKey) {
//   var newPost = snapshot.val();
//   console.log("Author: " + newPost.author);
//   console.log("Title: " + newPost.title);
//   console.log("Previous Post ID: " + prevChildKey);
// });



// $( "#feedback-good" ).click(function() {
//   alert( "Handler for .click() called." );
// });

// $( "#feedback-cold" ).click(function() {
//   alert( "Handler for .click() called." );
// });



setInterval (function sumCLO(){
//Calculating CLO Values
var c_topCLO = document.getElementById('top-CLO').innerHTML;
var c_bottomCLO = document.getElementById('bottom-CLO').innerHTML;

var calc_topCLO = Number(c_topCLO.replace(/[^0-9\.]+/g,""));
var calc_bottomCLO = Number(c_bottomCLO.replace(/[^0-9\.]+/g,""));

var sum_CLO = calc_topCLO + calc_bottomCLO;
$('#sum-CLO').html("Sum CLO: " + sum_CLO);


//Calculating Comfort - inaccurate placeholder calculation
var c_temperature = document.getElementById('air-temperature').innerHTML;
var calc_temperature = Number(c_temperature.replace(/[^0-9\.]+/g,""));

var predicted_comfort = calc_temperature/(sum_CLO*15);

$('#predicted-comfort').html("Predicted Comfort: " + predicted_comfort);
}
,500);





var rootRef = new Firebase('https://wanderwear.firebaseio.com/');

//writing data

var usersRef = rootRef.child("users");

$( "#feedback-hot" ).click(function() {
	usersRef.child("user-1").child("feedback").push(2)
	
});

$( "#feedback-good" ).click(function() {
	//no changes to bias
});

$( "#feedback-cold" ).click(function() {
	usersRef.child("user-1").child("feedback").push(-2)
	
});

$( "#clear-bias" ).click(function() {
	usersRef.child("user-1").child("feedback").set(0)
	
});

//turning object list to array of numbers
usersRef.child("user-1").child("feedback").on('value', function(child_snapshot) {
	
	var bias_list = child_snapshot.val();

	var bias_array = $.map(bias_list, function(value, index) {
	    return [value];
	});

	var sum = 0;
	for(var k = 0; k < bias_array.length; k++){
    	var sum = sum + bias_array[k];
	}

	var average_bias = sum/bias_array.length;
	
	$('#user-bias').html("User Bias: " + average_bias);

	var read_predicted_comfort = document.getElementById('predicted-comfort').innerHTML;
	var calc_predicted_comfort = Number(read_predicted_comfort.replace(/[^0-9\.]+/g,""));
	var evaluated_comfort = calc_predicted_comfort-average_bias;

	$('#evaluated-comfort').html("Evaluated Comfort: " + evaluated_comfort);

});


setInterval (function statusIndicator(){
	var read_predicted_comfort = document.getElementById('predicted-comfort').innerHTML;
	var calc_predicted_comfort = Number(read_predicted_comfort.replace(/[^0-9\.]+/g,""));

	var read_evaluated_comfort = document.getElementById('evaluated-comfort').innerHTML;
	var calc_evaluated_comfort = Number(read_evaluated_comfort.replace(/[^0-9\.]+/g,""));

	// console.log(calc_evaluated_comfort);
	// console.log(calc_predicted_comfort);


	if(calc_evaluated_comfort == 0) {     
		if(calc_predicted_comfort < 1) {                            
		// $('.slide-outcome').css({'background-color':'#00cc00'});
		$('#comfort-status').css({'background-color':'#00cc00'});
		$('#comfort-status').html("You are good to go.");

		}else{
		// $('.slide-outcome').css({'background-color':'red'});
		$('#comfort-status').css({'background-color':'red'});
		$('#comfort-status').html("Try again.");
		}       


	}else{
		if(calc_evaluated_comfort < 1) {                            
		// $('.slide-outcome').css({'background-color':'#00cc00'});
		$('#comfort-status').css({'background-color':'#00cc00'});
		$('#comfort-status').html("You are good to go.");

		}else{
		// $('.slide-outcome').css({'background-color':'red'});
		$('#comfort-status').css({'background-color':'red'});
		$('#comfort-status').html("Try again.");
		}       
	}
},500);