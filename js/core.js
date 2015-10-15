


function Kernel() {
    var cthis = this;
    this.viewport = null;
    this.vfs = null;
    this.windowmanager = null;
    this.version = "0.1.0.0.";

    this.construct = function () {
        cthis.initVFS();
        cthis.setWindowTitle();
        cthis.createViewport();
        cthis.initWindowManager();
        cthis.createWallpaper();
        cthis.createTaskBar();
        cthis.createStartMenu();
        cthis.createNotificationArea();
        cthis.initClock();
        cthis.showSplashScreen();

        $('#start').click(function () {
            cthis.myFirstWindow();
        });
    };

    this.myFirstWindow = function () {

        var result = cthis.windowmanager.newWindow();
        result.window.setTitle("Explorer");
        result.window.show();


        var loader = new AppLoader();
        loader.load("explorer.js", function (process) {
            var explorer = new Explorer(process.pid);
            explorer.setGUIHandle(result.window.context);
            explorer.execute();
        });

    };

    this.vfsReady = function () {
        cthis.showDesktopIcons();
    };

    this.showDesktopIcons = function () {
        $('#viewport').append("<div id='desktopiconslayer' class='desktopiconslayer'></div>");
        cthis.vfs.list(0, cthis.populateDesktopIcon);
    };

    this.populateDesktopIcon = function (data) {
        //var elm = $("<div>").html("<div class='desktopiconimage'></div><div class='desktopiconname'>"+data.value.name+"</div>").addClass("desktopicon");
        //elm.click(function(event){alert('Not implemented yet.');});
        //$('#desktopiconslayer').append(elm);

        var elm = $("<div>").html("<div class='desktopiconmovieplayer'></div><div class='desktopiconname'>Video</div>").addClass("desktopicon");
        elm.click(function (event) {
            cthis.openVideoPlayer();
        });
        $('#desktopiconslayer').append(elm);
    };

    this.openVideoPlayer = function () {
        var result = cthis.windowmanager.newWindow();

        result.window.setTitle("Video player");
        $('#window-' + result.handle).css({width: '500px'});
        result.window.context.html("<object type='application/x-shockwave-flash' style='width:100%; height:100%;' data='http://www.youtube.com/v/XSGBVzeBUbk?color2=FBE9EC&amp;loop=1&amp;hd=1&amp;autoplay=1&amp;showsearch=0&amp;showinfo=0&amp;version=3&amp;modestbranding=1&amp;fs=1'>\
        <param name='movie' value='http://www.youtube.com/v/XSGBVzeBUbk?color2=FBE9EC&amp;loop=1&amp;hd=1&amp;autoplay=1&amp;showsearch=0&amp;showinfo=0&amp;version=3&amp;modestbranding=1&amp;fs=1' />\
        <param name='allowFullScreen' value='true' />\
        <param name='allowscriptaccess' value='always' />\
        </object>");
        result.window.show();
    };


    this.setWindowTitle = function () {
        document.title = "WAARD v " + cthis.version;
    };

    this.createViewport = function () {
        $('body').html("<div class='interlace' style='height: 955px;'></div><div id='viewport'></div>");
    };

    this.createTaskBar = function () {
        $('#viewport').append("<div id='taskbar' class='taskbar dialogpanel'></div>");
    };

    this.createNotificationArea = function (){
      $('#taskbar').append("<div class='taskbarnotificationarea'><div id='notificationareatime' class='notificationareatime'></div></div>");
    };

    this.initClock = function(){
        setInterval(function(){ 
            var d = new Date();
            var n = d.toLocaleDateString() + " " + d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            $('#notificationareatime').html(n);
        }, 5000);
    };

    this.createStartMenu = function () {
        $('#taskbar').append("<div id='start' class='startbutton'><div class='startmenutext'><div class='starticon'></div><div>Start</div></div></div>");
    };

    this.createWallpaper = function () {
        $('#viewport').append("<div class='desktopwallpaper'></div>");
    };

    this.initVFS = function () {
        cthis.vfs = new VFS(cthis);
    };

    this.initWindowManager = function () {
        cthis.windowmanager = new WindowManager(cthis);
    };

    this.showSplashScreen = function () {

        setTimeout(function () {
            $('#viewport').append("<div id='splashscreen' class='splashscreen'></div>");
            $('#splashscreen').fadeIn("slow", function () {
                setTimeout(function () {
                    $('#splashscreen').fadeOut("slow");
                }, 4000);
            });
        }, 1000);
    };

    this.construct();
}

var kernel = new Kernel();