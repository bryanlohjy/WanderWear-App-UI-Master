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


// setInterval (function sumCLO(){
// //Calculating CLO Values
// var c_topCLO = document.getElementById('top-CLO').innerHTML;
// var c_bottomCLO = document.getElementById('bottom-CLO').innerHTML;

// var calc_topCLO = Number(c_topCLO.replace(/[^0-9\.]+/g,""));
// var calc_bottomCLO = Number(c_bottomCLO.replace(/[^0-9\.]+/g,""));

// var sum_CLO = calc_topCLO + calc_bottomCLO;
// $('#sum-CLO').html("Sum CLO: " + sum_CLO);




// //Calculating Comfort - inaccurate placeholder calculation
// var c_temperature = document.getElementById('air-temperature').innerHTML;
// var calc_temperature = Number(c_temperature.replace(/[^0-9\.]+/g,""));

// var predicted_comfort = calc_temperature/(sum_CLO*15);

// $('#predicted-comfort').html("Predicted Comfort: " + predicted_comfort);
// }
// ,500);





var rootRef = new Firebase('https://wanderwear.firebaseio.com/');

//writing data

var usersRef = rootRef.child("users").child("user-id"+Math.floor(Date.now() / 1000));

$( "#thanks-button" ).click(function() {
	usersRef.child("feedback").push(feedback_val);
});


//turning object list to array of numbers
usersRef.child("feedback").on('value', function(child_snapshot) {
	
	var bias_list = child_snapshot.val();

	var bias_array = $.map(bias_list, function(value, index) {
	    return [value];
	});

	var sum = 0;
	for(var k = 0; k < bias_array.length; k++){
    	sum = sum + bias_array[k];
	}

	var average_bias = sum/bias_array.length;
	
	// $('#user-bias').html("User Bias: " + average_bias);

	// var read_predicted_comfort = document.getElementById('predicted-comfort').innerHTML;
	// var calc_predicted_comfort = Number(read_predicted_comfort.replace(/[^0-9\.]+/g,""));
	// var evaluated_comfort = calc_predicted_comfort-average_bias;

	// $('#evaluated-comfort').html("Evaluated Comfort: " + evaluated_comfort);

});


setInterval (function statusIndicator(){
	// var read_predicted_comfort = document.getElementById('predicted-comfort').innerHTML;
	// var calc_predicted_comfort = Number(read_predicted_comfort.replace(/[^0-9\.]+/g,""));

	// var read_evaluated_comfort = document.getElementById('evaluated-comfort').innerHTML;
	// var calc_evaluated_comfort = Number(read_evaluated_comfort.replace(/[^0-9\.]+/g,""));

	// console.log(calc_evaluated_comfort);
	// console.log(calc_predicted_comfort);

		if(PMVval < 0.80 && PMVval > -0.80) {                            
			//good
			$('#comfort-status').css({'background-color':'#AED191','color':'#006E32','border':'3px solid #006E32'});
		}else{
			//too cold
			if(PMVval > 0.80) {
				// $('.slide-outcome').css({'background-color':'red'});
				$('#comfort-status').css({'background-color':'#F4AAAA','color':'#E20613','border':'3px solid #E20613'});}
			else if(PMVval < -0.80){
				$('#comfort-status').css({'background-color':'#A2D8E5','color':'#2C589F','border':'3px solid #2C589F'});
			}
		}       
	},500);