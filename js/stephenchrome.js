var current_w = -1;
var current_h = -1;

$(window).load(function () {
   
    var trials_cnt = 4;
    var delay = 500;
    function resetPage(){
        var w_window = $(window).width();  //window.innerWidth;
        var h_window = $(window).height();//window.innerHeight;
        if(w_window>current_w*1.3 || w_window < current_w*0.7 ||
            h_window>current_h*1.3 || h_window < current_h*0.7){
            trials_cnt = 4;
            current_w = w_window;
            current_h = h_window;
            $( ".titleblockimg" ).each(function(index, element){
                var ar = element.naturalWidth/element.naturalHeight;
                var v_ar = w_window/h_window;
                var expand = 1;
                if((ar>1 && v_ar<1)||(ar<1 && v_ar>1)){
                            $(element).css('width', '');
                            $(element).css('height', h_window * expand);
                            var topoffset = (h_window - h_window*expand)/2;
                            var leftoffset = (w_window - h_window*expand*ar)/2;
                            $(element).css({
                                'position':'absolute',
                                'top':topoffset,
                                'left':leftoffset
                            });
                        }else{                         
                            $(element).css('height', '');                            
                            $(element).css('width', w_window * expand);
                            var topoffset = (h_window - (w_window*expand)/ar)/2;
                            var leftoffset = (w_window - w_window*expand)/2;
                            $(element).css({
                                'position':'absolute',
                                'top':topoffset,
                                'left':leftoffset
                            });
                }
                $(element).parent().css('height', h_window);
                $(element).parent().css('width', w_window);

            });
            $( "#infogramembed" ).each(function(index, element){
                var w_init = element.width;
                var h_init = element.height;
                var ar_init = w_init/h_init;
                var w_set = $(element).parent().width();
                $(element).css('width',w_set);
                $(element).css('height',w_set/ar_init);    
                document.getElementById('infogramembed').src = document.getElementById('infogramembed').src;
            });
            $('#sway-header').css('width', w_window);
            $('#sway-footer').css('width', w_window);
        }else{
            timeResetPage();   
        }
        console.log("width: " + w_window + " / height: " + h_window);            
    }
    $(window).on("resize",function(e){
        console.log("The orientation has changed!");
        timeResetPage();
    });
    function timeResetPage(){
        if(trials_cnt>=0){
            trials_cnt--;
            window.setTimeout(resetPage,delay);   
        }else{
            trials_cnt = 4;
        }
    }
    resetPage();
});
