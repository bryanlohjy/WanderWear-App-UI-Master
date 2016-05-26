var my_top_readout = 0;
var my_bottom_readout = 0;

// Initialize your app
var myApp = new Framework7({
    modalTitle:'WanderWear',
    modalButtonOk: 'Yeah',
    modalButtonCancel: 'Nah',
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    domCache:true
});

// Init slider and store its instance in mySwiper variable

var mySwiper2 = myApp.swiper(
	'.swiper-2',
	{
		pagination:'.swiper-2 .swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
		onInit: function (top){
                var my_top = top.activeIndex;
	      		my_top_readout = my_top;

                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_top_CLO = clothing.top[my_top].CLO;

                        $('#top-CLO').html("Top CLO: " + my_top_CLO);
                    }
                });

            },

		onSlideChangeStart: function (top) {
                var my_top = top.activeIndex;
	      		my_top_readout = my_top;
                   
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_top_CLO = clothing.top[my_top].CLO;

                        $('#top-CLO').html("Top CLO: " + my_top_CLO);
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
    			var my_bottom = bottom.activeIndex;
    			my_bottom_readout = my_bottom;
                   
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_bottom_CLO = clothing.bottom[my_bottom].CLO;

                        $('#bottom-CLO').html("Bottom CLO: " + my_bottom_CLO);
                    }
                });




            },
	onSlideChangeStart: function (bottom) {
                var my_bottom = bottom.activeIndex;
                my_bottom_readout = my_bottom;
                 
                    $.ajax({
                    type:'GET',
                        url: 'js/clothing.json',
                        dataType: 'json',
                        async: false,
                        success: function(clothing){

                        var my_bottom_CLO = clothing.bottom[my_bottom].CLO;

                        $('#bottom-CLO').html("Bottom CLO: " + my_bottom_CLO);
                    }
                });


            }
});


// Clear User Bias Confirmation
$$('.confirm-title-ok-cancel').on('click', function () {
    myApp.confirm('So, you want me to forget your comfort profile. Are you sure?', 'Forget you?', 
      function () {
        myApp.alert('You mean nothing to me.');
      },
      function () {
        myApp.alert('HAHAHA. Great joke, buddy. Have you tried stand up?');
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