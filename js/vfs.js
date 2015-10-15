function VFS(pparent) {
    var cthis = this;
    this.pthis = null;
    this.db = null;

    this.construct = function () {
        cthis.pthis = pparent;
        cthis.testPlatform();
        cthis.openDatabase();
    };

    this.testPlatform = function () {

        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!window.indexedDB)
        {
            console.log("Your Browser does not support IndexedDB");
        }
    };

    this.openDatabase = function () {
        var request = window.indexedDB.open("jOS", 2);

        request.onerror = function (event) {
            console.log("Error opening DB", event);
        };

        request.onupgradeneeded = function (event) {
            console.log("Upgrading");
            cthis.db = event.target.result;
            if (!cthis.db.objectStoreNames.contains("objects")) {
                cthis.db.createObjectStore("objects", {keyPath: "rollNo"});
            }

        };

        request.onsuccess = function (event) {
            console.log("Success opening DB");
            cthis.db = event.target.result;
            cthis.initNewFileSystem();
        };

    };

    this.createFolder = function (name, parentid) {

    };

    this.initNewFileSystem = function () {
        var transaction = cthis.db.transaction(["objects"], "readwrite");

        transaction.oncomplete = function (event) {
            console.log("Success");
            cthis.pthis.vfsReady();
        };

        transaction.onerror = function (event) {
            console.log("Error create folder: " + event.target.error.name);
            cthis.pthis.vfsReady();
        };

        var objectStore = transaction.objectStore("objects");

        objectStore.add({rollNo: 1, parent: 0, name: "C"});
    };

    this.list = function (id, populatecallback) {
        var transaction = cthis.db.transaction(["objects"], "readonly");
        var objectStore = transaction.objectStore("objects");

        var cursor = objectStore.openCursor();

        cursor.onsuccess = function (e) {
            
            var res = e.target.result;
            if (res) {
                populatecallback(res);
                res.continue();
            }
        };

    };

    this.cd = function (cwd, name) {


    };

    this.construct(pparent);
}