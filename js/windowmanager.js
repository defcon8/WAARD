function WindowManager(pparent) {
    var cthis = this;
    this.pthis = null;
    this.windows = [];
    this.zrange = {min: 4, max: 999};
    this.highestzused = null;
   
    this.construct = function () {
        cthis.pthis = pparent;
        cthis.initialize();
    };
    
    this.initialize = function(){
      $('#viewport').append("<div id='windows' class='windows'></div>");
    };
    
    this.newWindow = function (){
      // Return handle
      
      var newhandle = Math.floor(100000 + Math.random() * 900000);
      this.windows[newhandle] = new Window(cthis);
      this.windows[newhandle].setHandle(newhandle);
      this.windows[newhandle].createGUI();
      
        return {
            handle: newhandle, window: this.windows[newhandle]
        };
    };
    
    this.destroyWindow = function(handle){
        
            // get Z-Index
            var freezindex = cthis.windows[handle].getZIndex();
    
            // Delete from windows stack
            delete cthis.windows[handle];
            
            // Removal of DOM Element(s) & attached events
            $('#window-'+handle).remove();
            $('#taskbaritem-'+handle).remove();
            
            // Correct Z Indexes of other windows
            cthis.correctZIndexes(freezindex);
    };

    this.maximizeWindow = function(handle){
            cthis.windows[handle].toggleMaximize();    
    };

    this.minimizeWindow = function(handle){
            $('#window-'+handle).css('visibility', 'hidden');  
    };

    this.correctZIndexes = function(freezindex){
        // Update z-Index of all other windows
        for (var whandle in cthis.windows) {
            var window = cthis.windows[whandle];
            var currentzindex = window.getZIndex();

            // Shift all windows that were above the z-index, down by 1.
            if(currentzindex > freezindex){
                window.setZIndex(currentzindex-1);
            }
        }
    };

    this.focusWindow = function(handle){
        var freezindex = cthis.windows[handle].getZIndex();
        /* Give the handle the highest z-index, that is the highest used + 1 */
        cthis.windows[handle].setZIndex(cthis.highestzused+1);
        
        cthis.correctZIndexes(freezindex);
    };

    this.construct(pparent);
}