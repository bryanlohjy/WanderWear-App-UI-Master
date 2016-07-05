// Browser Resize
$(window).load(function(){
    var windowH = $(window).height();
    var deviceH = $('#device-container').height();
    var remainderH = (windowH-deviceH)/2;

    $('#device-container').css('margin-top',remainderH+'px');
   
    

    $(window).resize(function(){
        var windowH = $(window).height();
        var deviceH = $('#device-container').height();
        var remainderH = (windowH - deviceH)/2;

        $('#device-container').css('margin-top',remainderH+'px');

    })          
});


// Clothing Slider Centering

$(window).load(function(){
    var windowH = $(window).height();
    var clothingH = $('#clothing-container').height();
    var remainderH = (windowH-clothingH)/2;

    $('#clothing-container').css('padding-top',remainderH+'px');
   
    

    $(window).resize(function(){
        var windowH = $(window).height();
        var clothingH = $('#clothing-container').height();
        var remainderH = (windowH - clothingH)/2;

        $('#clothing-container').css('padding-top',remainderH+'px');

    })          
});

// Function btnChrome_onclick()
//   document.documentElement.webkitRequestFullScreen()
// End Function



