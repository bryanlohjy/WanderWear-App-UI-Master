var my_top_readout = 0;
var my_bottom_readout = 0;

// Initialize your app
var myApp = new Framework7({
    modalTitle:'WanderWear',
    modalButtonOk: 'Yes',
    modalButtonCancel: 'No',
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    domCache:true,
    swipeout: false
});

// Init slider and store its instance in mySwiper variable

var mySwiper2 = myApp.swiper(
	'.swiper-2',
	{
		pagination:'.swiper-2 .swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
		onInit: function (top){
                my_top = top.activeIndex;
	      		my_top_readout = my_top;

                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        my_top_CLO = clothing.top[my_top].CLO;

                        $('#top-CLO').html("Top CLO: " + my_top_CLO);

                        top_CLO = clothing.top[my_top_readout].CLO;
                        bottom_CLO = clothing.bottom[my_bottom_readout].CLO;
                        sum_CLO = top_CLO + bottom_CLO;
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
                        };
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
                            };



                        TCL = 100*XN-273;

                        //Skin Diff Loss
                        HL1 = 3.05*0.001*(5733-6.99*M-PA);

                        //Sweat Loss
                        if (M>58.15){
                            HL2 =0.42*(M-58.15);
                        } else{
                            HL2 =0;
                        };

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

                        console.log(PMVval);
                    }
                });

            },

		onSlideChangeStart: function (top) {
                my_top = top.activeIndex;
	      		my_top_readout = my_top;
                   
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        my_top_CLO = clothing.top[my_top].CLO;

                        $('#top-CLO').html("Top CLO: " + my_top_CLO);

                        top_CLO = clothing.top[my_top_readout].CLO;
                        bottom_CLO = clothing.bottom[my_bottom_readout].CLO;
                        sum_CLO = top_CLO + bottom_CLO;
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
                        };
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
                            };



                        TCL = 100*XN-273;

                        //Skin Diff Loss
                        HL1 = 3.05*0.001*(5733-6.99*M-PA);

                        //Sweat Loss
                        if (M>58.15){
                            HL2 =0.42*(M-58.15);
                        } else{
                            HL2 =0;
                        };

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

                        console.log(PMVval);  
                    }
                });

            }
});

var mySwiper3 = myApp.swiper('.swiper-3', 
    {
	pagination:'.swiper-3 .swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
	onInit: function (bottom) {
    			my_bottom = bottom.activeIndex;
    			my_bottom_readout = my_bottom;
                   
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_bottom_CLO = clothing.bottom[my_bottom].CLO;

                        $('#bottom-CLO').html("Bottom CLO: " + my_bottom_CLO);

                        top_CLO = clothing.top[my_top_readout].CLO;
                        bottom_CLO = clothing.bottom[my_bottom_readout].CLO;
                        sum_CLO = top_CLO + bottom_CLO;
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
                        };
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
                            };



                        TCL = 100*XN-273;

                        //Skin Diff Loss
                        HL1 = 3.05*0.001*(5733-6.99*M-PA);

                        //Sweat Loss
                        if (M>58.15){
                            HL2 =0.42*(M-58.15);
                        } else{
                            HL2 =0;
                        };

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

                        console.log(PMVval);
                    }
                });




            },
	onSlideChangeStart: function (bottom) {
                my_bottom = bottom.activeIndex;
                my_bottom_readout = my_bottom;
                 
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_bottom_CLO = clothing.bottom[my_bottom].CLO;

                        $('#bottom-CLO').html("Bottom CLO: " + my_bottom_CLO);

                        top_CLO = clothing.top[my_top_readout].CLO;
                        bottom_CLO = clothing.bottom[my_bottom_readout].CLO;
                        sum_CLO = top_CLO + bottom_CLO;
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
                        };
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
                            };



                        TCL = 100*XN-273;

                        //Skin Diff Loss
                        HL1 = 3.05*0.001*(5733-6.99*M-PA);

                        //Sweat Loss
                        if (M>58.15){
                            HL2 =0.42*(M-58.15);
                        } else{
                            HL2 =0;
                        };

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

                        console.log(PMVval);                      
                    }
                });


            }
});


// Clear User Bias Confirmation
$$('.confirm-title-ok-cancel').on('click', function () {
    myApp.confirm('Do you want me to forget your comfort profile?', 'Forget you?', 
      function () {
        myApp.alert('You mean nothing to me.');1
        usersRef.child("feedback").set(0);
      },
      function () {
        myApp.alert('Great.');
      }
    );
});          


// Establishing Size of Map Page
$$(document).on('pageBeforeInit', function (e) {
    var page = e.detail.page;
    
    if (page.name === 'location') {
        map.invalidateSize()
    }
});




// // Generate dynamic page
// var dynamicPageIndex = 0;
// function createContentPage() {
// 	mainView.router.loadContent(
//         '<!-- Top Navbar-->' +
//         '<div class="navbar">' +
//         '  <div class="navbar-inner">' +
//         '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
//         '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
//         '  </div>' +
//         '</div>' +
//         '<div class="pages">' +
//         '  <!-- Page, data-page contains page name-->' +
//         '  <div data-page="dynamic-pages" class="page">' +
//         '    <!-- Scrollable page content-->' +
//         '    <div class="page-content">' +
//         '      <div class="content-block">' +
//         '        <div class="content-block-inner">' +
//         '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
//         '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
//         '        </div>' +
//         '      </div>' +
//         '    </div>' +
//         '  </div>' +
//         '</div>'
//     );
// 	return;
// }