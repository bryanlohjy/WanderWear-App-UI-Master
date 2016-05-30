geolocation = navigator.geolocation;
geolocation.getCurrentPosition(currentPosition);

var PMVval = 0;
var temperature = 0;
var dewpoint = 0;
var humidity = 0;
var wind_speed = 0;
var condition = 0;
var top_CLO = 0;
var bottom_CLO = 0;
var sum_CLO = 0;
var CLO = 0;
var TA = 0;
var TR = 0;
var MET = 0;
var VEL = 0;
var RH = 0;
var FNPS = 0;
var PA = 0;
var ICL = 0;
var M = 0;
var FCL = 0;
var HCF = 0;
var TAA  = 0;
var TRA = 0;
var TCLA = 0;
var P1 = 0;
var P2 = 0;
var P3 = 0;
var P4 = 0;
var P5 = 0;
var XN  = 0;
var XF = 0;
var N = 0;
var EPS = 0;
var HCN = 0;
var HC = 0;
var TCL = 0; 
var HL1 = 0;
var HL2 = 0;
var HL3 = 0;
var HL4 = 0;
var HL5 = 0;
var HL6 = 0;
var TS = 0;
var TPO = 0;
var PPDval = 0;

//Reverse Geocoding via OpenCage API: Getting Location Info from current coordinates
function currentPosition(position){
	var lat  = position.coords.latitude;
	var long = position.coords.longitude;

	$('#lat').append(lat);
	$('#long').append(long);

	var open_cage_url = "https://api.opencagedata.com/geocode/v1/json?q="+lat+"+"+long+"&pretty=1&key=3f48944875604c7fb58939745a8b52bd"
	
	//Extracting state / country code info to get info from WUNDERGROUND API
	$.ajax({
		type:'GET',
	    url: open_cage_url,
	    dataType: 'json',
	    success: function(location){
	    	
	    	//Personal note - . for objects, [] for arrays
	    	var state_raw = location.results[0].components.state;
	    	//Replacing White Space with Hypens for Wunderground API
	    	var state= state_raw.replace(/\s+/g, "-");

	    	var country_code = location.results[0].components.country_code;

	    	$('#state').append(state);
			$('#country-code').append(country_code);

	    	//Getting weather info from location
	    	var wunderground_url = "https://api.wunderground.com/api/86abf2a752b687fa/hourly/q/"+country_code+"/"+state+".json";

	    	$.ajax({
	    		type:'GET',
			    url: wunderground_url,
			    dataType: 'json',
	    		success: function(weather){

	    			temperature = weather.hourly_forecast[0].temp.metric;
	    			dewpoint = weather.hourly_forecast[0].dewpoint.metric;
	    			humidity = weather.hourly_forecast[0].humidity;
	    			// converting wind speed from kph to ms
	    			wind_speed = weather.hourly_forecast[0].wspd.metric * 0.277778;
	    			condition = weather.hourly_forecast[0].condition;



	    						//Getting CLO value from local JSON File. Based on the works of E.A. McCullough, Ph.D. E.W. Jones, Ph.D. and P.E. J. Huck (http://www.cbe.berkeley.edu/research/other-papers/McCullough%20et%20al%201985%20A%20comprehensive%20data%20base%20for%20estimating%20clothing%20insulation.pdf)
	    						var clothing_url = 'js/clothing.json';

	    				    	$.ajax({
						    		type:'GET',
								    url: clothing_url,
								    dataType: 'json',
								    async: false,
						    		success: function(clothing){

						    			//Reading CLO values based on Index number of slides (UI to be clothing on slideshow)
						    			top_CLO = clothing.top[my_top_readout].CLO;
						    			bottom_CLO = clothing.bottom[my_bottom_readout].CLO;
						    			sum_CLO = top_CLO + bottom_CLO;

						    			$('#air-temperature').append(temperature);
										$('#dewpoint').append(dewpoint);
										$('#humidity').append(humidity);
										$('#wind-speed').append(wind_speed);
										$('#condition').append(condition);

						    				// CALCULATIONS
						    	// 			To Retry:
											CLO = sum_CLO;
											TA = parseFloat(temperature);
											TR = parseFloat(temperature);
											MET = 3.4;
											VEL = wind_speed;
											RH = 100-5*(temperature-dewpoint);
											FNPS = Math.exp(16.6536-4030.183/(TA+235));
											PA = RH*10*FNPS;
											ICL = 0.155*CLO;
											M = MET*58.15;


											if (ICL < 0.078){
												FCL = 1+1.29*ICL;
											} else{
												FCL = 1.05+0.645*ICL;
											}

											HCF = 12.1*Math.pow(VEL,0.5);
											TAA = TA+273;
											TRA = TR+273;
											TCLA = TAA+(35.5-TA)/(3.5*(6.45*ICL+0.1));
											P1 = ICL*FCL;
											P2 = P1*3.96;
											P3 = P1*100;
											P4 = P1*TAA;
											P5 = 308.7-0.028*M+P2*Math.pow((TRA/100),4);
											XN = TCLA/100;
											XF = TCLA/50;
											N = 0;
											EPS = 0.0015;
											HCN =2.38*Math.pow(Math.abs(100*XF-TAA),0.25);

											while (Math.abs(XN-XF)>EPS){
											    XF =(XF+XN)/2;
												if (HCF>HCN){
											        HC = HCF;
											    }else{
											        HC = HCN;
											    }
											    											    
											    XN = (P5+P4*HC-P2*Math.pow(XF,4))/(100+P3*HC);
											    N = N + 1;
											}



											TCL = 100*XN-273;

											//Skin Diff Loss
											HL1 = 3.05*0.001*(5733-6.99*M-PA);

											//Sweat Loss
											if (M>58.15){
												HL2 =0.42*(M-58.15);
											} else{
												HL2 =0;
											}

											//Latent Respiration Loss
											HL3 =1.7*0.00001*M*(5867-PA);

											//Dry Respiration Loss
											HL4 =0.0014*M*(34-TA);

											//Radiation Loss
											HL5 =3.96*FCL*(Math.pow(XN,4)-Math.pow((TRA/100),4));

											//Convection Loss
											HL6 = FCL*HC*(TCL-TA);
											
											//Thermal sensation to skin transger coefficient
											TS = 0.303*Math.exp(-0.036*M)+0.028;

											if (VEL<0.2){
											    TPO =0.5*TA+0.5*TR;
											}else{
											    if (VEL<0.6){
											        TPO = 0.6*TA+0.4*TR;
											 	}else{
											    	TPO =0.7*TA+0.3*TR;
											    }
											}

											PMVval = TS*(M-HL1-HL2-HL3-HL4-HL5-HL6);

											PPDval = 100-95*Math.exp(-0.03353*Math.pow(PMVval,4)-0.2179*Math.pow(PMVval,2));							
											


											// console.log("HC: ", HC);
											// console.log("HCF: ", HCF);
											// console.log("HCN: ", HCN);
											// console.log("FNPS: ", FNPS);
											// console.log("PA: ", PA);
											// console.log("ICL: ", ICL);
											// console.log("M: ", M);
											// console.log("FCL: ", FCL);
											// console.log("HCF: ", HCF);
											// console.log("TAA: ", TAA);
											// console.log("TRA: ", TRA);
											// console.log("TCLA: ", TCLA);
											// console.log("P1: ", P1);
											// console.log("P2: ", P2);
											// console.log("P3: ", P3);
											// console.log("P4: ", P4);
											// console.log("P5: ", P5);
											// console.log("XN: ", XN);
											// console.log("XF: ", XF);
											// console.log("N: ", N);
											// console.log("EPS: ", EPS);
											// console.log("TCL: ", TCL);
											// console.log("HL1: ", HL1);
											// console.log("HL2: ", HL2);
											// console.log("HL3: ", HL3);
											// console.log("HL4: ", HL4);
											// console.log("HL5: ", HL5);
											// console.log("HL6: ", HL6);
											// console.log("TS: ", TS);
											// console.log("TPO: ", TPO);
											//console.log("PMVval: ", PMVval);
											// console.log("PPDval: ", PPDval);

											// user output. threshold of 1 on either side
											$(function(){
											    if(PMVval > temperature/12) {                            
											        // $('.slide-outcome').css({'background-color':'#00cc00'});
											    }else{
											    	// $('.slide-outcome').css({'background-color':'red'});
											    }       
											                                                   
											    // $(window).resize(function(){
											    //     var windowH = $(window).height();
											    //     var wrapperH = $('#window-height-wrapper').height();
											    //     var differenceH = windowH - wrapperH;
											    //     var newH = wrapperH + differenceH;
											    //     var truecontentH = $('window-height-content').height();
											    //     if(windowH > truecontentH) {
											    //         $('#window-height-wrapper').css('height', (newH)+'px');
											    //     }

											    // })          
											});


												// Reevaluating with User's BIAS
												// Read Firebase

														// Storing Trip info in Database

														// var data = new Firebase('https://potato-tracker.firebaseio.com');

														// data.set({
														//   title: "Hello World!",
														//   author: "Firebase",
														//   location: {
														//     city: "San Francisco",
														//     state: "California",
														//     zip: 94103
														//   }
														// });




						    		}
						    	});
	    		}
	    	});

	    }
	});

}



