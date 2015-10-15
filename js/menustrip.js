function MenuStrip(targetelm) {

    this.items = {};

    this.render = function () {

        targetelm.append("<div id='menu-bar'>\
                        <ul class='main-menu'>\
                                <li>\
                                        File\
                                        <ul>\
                                                <li>\
                                                        New\
                                                        <ul>\
                                                                <li><a href='http://www.google.com/' target='_blank'>Google search</a></li>\
                                                                <li class='separator'></li>\
                                                                <li><a href='/#!/new-document'>File</a></li>\
                                                                <li><a href='/#!/new-document'>Document</a></li>\
                                                        </ul>\
                                                </li>\
                                                <li class='separator'></li>\
                                                <li class='icon save'><a href='javascript:void(0)'>Save<span>Ctrl+S</span></a></li>\
                                                <li class='separator'></li>\
                                                <li class='disabled'><a href='/#!/import'>Import</a></li>\
                                                <li>Export</li>\
                                                <li class='separator'></li>\
                                                <li class='icon print'><a href='javascript:void(0)'>Print<span>Ctrl+P</span></a></li>\
                                                <li class='separator'></li>\
                                                <li>Logout</li>\
                                        </ul>\
                                </li>\
                                <li>\
                                        Help\
                                        <ul>\
                                                <li>Index</li>\
                                                <li class='separator'></li>\
                                                <li>Upgrade account</li>\
                                                <li>Registration</li>\
                                                <li class='separator'></li>\
                                                <li>Contact us</li>\
                                        </ul>\
                                </li>\
                        </ul>\
                </div>");

        new MainMenu().init();
        
    };

    this.render();

}
;