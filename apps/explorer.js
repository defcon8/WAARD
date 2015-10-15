function Explorer(pid){
    var cthis = this;
    this.pid = pid;
    this.guihandle = null;
    
    this.execute = function(){
        console.log("Execute => " + this.constructor.name + " => PID: " + cthis.pid);
        cthis.initView();
    };
    
    this.setGUIHandle = function(handle){
        cthis.guihandle = handle;
    };
    
    this.navigate = function(path){
        
    };
    
    this.initView = function(){
        var strip = new MenuStrip(cthis.guihandle);
    };
    
};
