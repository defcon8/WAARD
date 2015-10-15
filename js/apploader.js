
function AppLoader() {

    this.load = function(filename, readyCallBack){
        $.getScript("apps/"+filename, function () {
            console.log("Application loaded.");
            readyCallBack({pid: Math.floor(100000 + Math.random() * 900000)});
        });
    };
    
}