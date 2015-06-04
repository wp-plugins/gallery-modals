(function(jQuery) {
    var $ = jQuery;
    
    var current_item    = null;
    var scrolling       = false;
    var click           = (('ontouchend'in window)) ? 'touchend' : 'click';
    var modal_image     = $('#fusio-gallery-content img');
    var modal           = $('#fusio-gallery-box');
    var modal_container = $('#fusio-gallery-container');
    var close_btn       = $('#fusio-gallery-controls .close-btn');
    var arrow_right     = $('#fusio-gallery-controls .arrow-right');
    var arrow_left      = $('#fusio-gallery-controls .arrow-left');
    
    

    $("#fusio-gallery-container").on('click', function(e) { 
        if (e.target !== this) return;
            
        $(this).fadeOut('fast');
    });

    
    $('body').on(click, '.gallery .gallery-item a', function(e) {
        e.preventDefault();
        if (scrolling == false) {
            current_item = $(this).parent().parent();
            
            //setDimensions($('img', this));
    
            
            swapImage($('img', this), true);
            
            var prev = getNextStatus('prev');
            var next = getNextStatus('next');
            
            if (prev == false) {
                arrow_left.hide();
            } else {
                arrow_left.show();
            }
            if (next == false) {
                arrow_right.hide();
            } else {
                arrow_right.show();
            }
        }
    });
    
    arrow_right.on(click, function() {
        new_current_item = getNextStatus('next');
    
        if (new_current_item !== false) {
            current_item = new_current_item;
            arrow_left.show();
        }
        
        next_item = getNextStatus('next');
        if (next_item == false) arrow_right.hide();
        
        swapImage($('a img', current_item), false);
    });
    
    
    
    arrow_left.on(click, function() {
        new_current_item = getNextStatus('prev');
    
        if (new_current_item !== false) {
            current_item = new_current_item;
            arrow_right.show();
        }
        
        next_item = getNextStatus('prev');
        if (next_item == false) arrow_left.hide();
        
        swapImage($('a img', current_item), false);
    });
    
    close_btn.on(click, function() {
        modal_container.fadeOut('fast');
        current_item = null;
    });
    
    /*
    function setDimensions(element) {
        
        if (element.attr('data-width') == null) {
            if (element.attr('data-width') == null) {
                element.attr('data-width', element.width());
            }
            if (element.attr('data-height') == null) {
                element.attr('data-height', element.height());
            }
        }
    }
    */
    function getNextStatus(direction) {
        var identifier;
        
        if (direction == 'prev') {
            identifier = $(current_item).prev();
        } else {
            identifier = $(current_item).next();
        }
        
        if (identifier.hasClass('gallery-item')) {
            //setDimensions($('a img', identifier))
            return identifier;
        }
            return false;
        
    }
    
    function swapImage(element, animate) {
        var img_src = element.attr('data-full-image');
        
        modal_image.attr('src', img_src).promise().done(function() {
    
            if (animate == true)
                modal_container.fadeIn('fast');
                
            height_limit = (modal_container.height() / 100) * 70;
            modal_height = element.attr('data-height');
            modal_width  = element.attr('data-width');

            
            //if (modal_height > height_limit) {
                scale_percentage = (height_limit / modal_height) * 100;
                modal_width = (modal_width / 100) * scale_percentage;
                modal_height = height_limit;
                
            //}

            
            modal.css('max-height', modal_height);
            modal.css('max-width', modal_width);
        });
    }
    
    var scroll_event = 'ontouchend'in window ? 'touchmove' : 'mousewheel';
    
    $.fn.scrollStopped = function(callback) {
        var $this = $(this), self = this;
        $this.on(scroll_event, function(){
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,250,self));
        });
    };
    
    $('body').scrollStopped(function() {
        scrolling = false;
    });

    
    $('body').on(scroll_event, function() {
        scrolling = true;
    });
})(jQuery);