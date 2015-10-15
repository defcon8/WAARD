function Window(pparent) {
    var cthis = this;
    this.pthis = null;
    this.handle = null;
    this.context = null;
    this.drag = false;
    this.mouseoffset = {left: 0, top: 0};
    this.ismaximized = false;
    this.originalsize = null;
    this.dblclicktime = null;
    this.title = null;
   
    this.construct = function () {
        cthis.pthis = pparent;
    };

    this.setHandle = function(handle){
        cthis.handle = handle;
    };
    
    this.toggleMaximize = function(){
        if(cthis.ismaximized){
            $('#window-'+cthis.handle).css({top: cthis.originalsize.offset.top, left: cthis.originalsize.offset.left, width: cthis.originalsize.width+'px', height: cthis.originalsize.height+'px',position:'absolute'});
            cthis.ismaximized = false;
        }else{
            cthis.originalsize = {offset: $('#window-'+cthis.handle).offset(), width: $('#window-'+cthis.handle).width(), height: $('#window-'+cthis.handle).height()};
            $('#window-'+cthis.handle).css({top: 0, left: 0, width: ($('#windows').width()-5)+'px', height:  ($('#windows').height()-(20+$('#taskbar').height()))+'px', position:'absolute'});
            cthis.ismaximized = true;
        }
    };
    
    this.spanMovementLayer = function(){
        $('#viewport').append("<div id='mousemovementlayer-"+cthis.handle+"' class='movementlayer'></div>");
        
        $('#mousemovementlayer-'+cthis.handle).mouseup(function() {
            $('#mousemovementlayer-'+cthis.handle).remove();
            cthis.drag = false;
        });

        $('#mousemovementlayer-'+cthis.handle).mousemove(function( event ) {
            $('#window-'+cthis.handle).css({top: event.pageY + cthis.mouseoffset.top, left: event.pageX+cthis.mouseoffset.left, position:'absolute'});
        });
    };

    this.createGUI = function(){
        $('#windows').append("<div id='window-"+cthis.handle+"' class='window dialogpanel newwindow border3d'><div class='xs'></div></div>");
        
        $('#window-'+cthis.handle).append("<div id='windowheader-"+cthis.handle+"' class='windowheader'></div>");
        
        $('#windowheader-'+cthis.handle).append("<div class='windowheadericonbox'><div id='windowheadericon-"+cthis.handle+"' class='windowheadericon'></div></div>");
        $('#windowheader-'+cthis.handle).append("<div id='windowheadertitle-"+cthis.handle+"' class='windowheadertitle'></div>");
        $('#windowheader-'+cthis.handle).append("<div id='windowclose-"+cthis.handle+"' class='windowheaderbutton dialogpanel border3d windowclose'></div>");
        $('#windowheader-'+cthis.handle).append("<div id='windowmaximize-"+cthis.handle+"' class='windowheaderbutton dialogpanel border3d windowmaximize'></div>");
        $('#windowheader-'+cthis.handle).append("<div id='windowminimize-"+cthis.handle+"' class='windowheaderbutton dialogpanel border3d windowminimize'></div>");
        
        
        $('#window-'+cthis.handle).append("<div id='windowcontext-"+cthis.handle+"' class='windowcontext'></div>");
        
        /* Set correct z-index */
        if(cthis.pthis.highestzused == null){
            // First dialog
            cthis.pthis.highestzused = cthis.pthis.zrange.min;
        }else{
            cthis.pthis.highestzused++;
        }
        cthis.setZIndex(cthis.pthis.highestzused);
        
        /* Store handler to context in object */
        cthis.context = $('#windowcontext-'+cthis.handle);
        
        cthis.attachBasicEvents();
        
    };
    
    this.createTaskbarItem = function(){
      $('#taskbar').append("<div id='taskbaritem-"+cthis.handle+"' class='taskbaritem'><div class='taskbaritemicon'></div>"+cthis.title+"</div>");  
        
      $('#taskbaritem-'+cthis.handle).click(function() {
            $('#window-'+cthis.handle).css('visibility', 'visible');
            cthis.pthis.focusWindow(cthis.handle);
      });  
    };
    
    this.attachBasicEvents = function(){

        $('#windowcontext-' + cthis.handle).mousemove(function (event) {

            var parentOffset = $('#windowcontext-' + cthis.handle).offset();
            //or $(this).offset(); if you really just want the current element's offset
            var relX = event.pageX - parentOffset.left;
            var relY = event.pageY - parentOffset.top;

            if (relX >= ($('#windowcontext-' + cthis.handle).width() - 3)) {
                $('#windowcontext-' + cthis.handle).addClass("windowxsize");
            } else if (relY >= ($('#windowcontext-' + cthis.handle).height() - 3)) {
                $('#windowcontext-' + cthis.handle).addClass("windowysize");
            } else {
                $('#windowcontext-' + cthis.handle).removeClass("windowxsize").removeClass("windowysize");
            }

        });
        
        $('#windowcontext-' + cthis.handle).mousedown(function (event) {
            cthis.pthis.focusWindow(cthis.handle);
        });

        $('#windowheader-'+cthis.handle).mousedown(function() {
            // Make sure to not trigger parent event when child is clicked (close button)
            if (event.target!=this) return;
            
            if(cthis.dblclicktime != null){
                
                var now = new Date().getTime();
                var delta = now - cthis.dblclicktime;
                if(delta < 500){
                    cthis.toggleMaximize();
                }
            }
            
            cthis.dblclicktime = new Date().getTime();
            
            cthis.pthis.focusWindow(cthis.handle);
            
            var parentOffset = $(this).offset();
            cthis.mouseoffset.left = parentOffset.left - event.pageX;
            cthis.mouseoffset.top = parentOffset.top - event.pageY;
            
            
            cthis.spanMovementLayer();
            cthis.drag = true;
        });

        $('#windowclose-'+cthis.handle).click(function() {
            cthis.pthis.destroyWindow(cthis.handle);
        });
        
        $('#windowmaximize-'+cthis.handle).click(function() {
            cthis.pthis.maximizeWindow(cthis.handle);
        });
        
        $('#windowminimize-'+cthis.handle).click(function() {
            cthis.pthis.minimizeWindow(cthis.handle);
        });
        
        
    };
    
    this.setTitle = function(title){
        cthis.title = title;
        $('#windowheadertitle-'+cthis.handle).html(title);
    };
    
    this.setZIndex = function(index){
        $("#window-" + cthis.handle).css("z-index", index);
    };
    
    this.getZIndex = function(){
        return $("#window-" + cthis.handle)[0].style.zIndex;
    };

    this.show = function(){
        $("#window-" + cthis.handle).show();
        cthis.createTaskbarItem();
    };

    this.construct(pparent);
}