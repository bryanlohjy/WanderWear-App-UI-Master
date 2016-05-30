var p = document.getElementById("feedback-slider"),
    res = document.getElementById("result");
    feedback_val=0;
    parsed_p=parseInt(p.value);


p.addEventListener("input", function() {

	parsed_p=parseInt(p.value)
	feedback_val=parsed_p-4;
	var fbresult=null;

	if (parsed_p==1){
		var fbresult="I was freezing!";
	}
	if (parsed_p==2){
		var fbresult="I was cold.";
	}
	if (parsed_p==3){
		var fbresult="It was a little chilly.";
	}
	if (parsed_p==4){
		var fbresult="Perfect!";
	}
	if (parsed_p==5){
		var fbresult="It was a little hot.";
	}
	if (parsed_p==6){
		var fbresult="The journey was hot.";
	}
	if (parsed_p==7){
		var fbresult="Ridiculously hot!";
	}

    res.innerHTML = fbresult;
    console.log(feedback_val);
}, false); 



// <input id="feedback-slider" type='range' min='1' max='7' value='4' step='1'/>