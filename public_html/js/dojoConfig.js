var __VENDOR_PATH = "vendor/";

if (!window.isOffline) {
    /**
      * Determine if webapp is running in <b>offline</b> mode.
      * @global
      */
    window.isOffline = function() {
        // Test if "offline=true" was passed in URL
        return /.*offline\s*=\s*true.*/i.test(
                   decodeURIComponent(window.location.search));
    };
}

if (!window.isDebug) {
    /**
      * Determine if webapp is running in <b>debug</b> mode.
      * @global
      */
    window.isDebug = function() {
        // Test if "debug=true" was passed in URL
        return /.*debug\s*=\s*true.*/i.test(
                   decodeURIComponent(window.location.search));
    };
}

if (!window.contextPath) {
    /**
     * Specifies absolute path to root of this webapp. Only works if the
     * JavaScript file defining this member is loaded by index.html (or
     * another file in the webapp root).
     * @global
     */
    window.contextPath = (function() {
        var loc = window.location;
        var path = loc.protocol + "//";

        if (loc.hostname) {
            path += loc.hostname;

            if (loc.port) {
                path += ":" + loc.port;
            }
        }

        path += loc.pathname;

        // Remove filename if present
        path = path.replace(/\/[^\/]+$/, "/");

        return path;
    })();
}

if (!window.owfJsPath) {
    /**
     * Specifies path to OWF widget JavaScript API. Prefers files from OWF
     * server it available.
     * @global
     */
    window.owfJsPath = (function() {
        var path = window.contextPath + __VENDOR_PATH+"js/lib";

        if (document.referrer &&
            /\/owf\/$/i.test(decodeURIComponent(document.referrer))) {
                path = decodeURIComponent(document.referrer) + "js-min/";
        }

        return path;
    })();
}

if (!window.dojoPath) {
    
    window.dojoPath = (function() {
        var path = "//ajax.googleapis.com/ajax/libs/dojo/1.10.4/";

        if (window.isOffline()) {
            // Use local copy of API files
            path = window.contextPath + __VENDOR_PATH +"js/lib/";
        } else if (window.location.protocol != "file:") {
            // Match same protocol as page to avoid mixed content issues
            path = path.replace("http://", window.location.protocol + "//");
        }

        return path;
    })();
}

var dojoConfig = dojoConfig || {};

// Dojo API 1.10 does not load asynchronously 7/24/15
dojoConfig.async = false;

dojoConfig.hasCache = {
    "config-selectorEngine": "acme",
    "config-tlmSiblingOfDojo": 1,
    "dojo-built": 1,
    "dojo-loader": 1,
    "dojo-undef-api": 0,
    dom: 1,
    "extend-esri": 1,
    "host-browser": 1
};

dojoConfig.packages = [
    { location: window.dojoPath + "dojox", name: "dojox" },
    { location: window.dojoPath + "dgrid", main: "OnDemandGrid", name: "dgrid" },
    { location: window.dojoPath + "dijit", name: "dijit" },
    { location: window.dojoPath + "xstyle", main: "css", name: "xstyle" },
    { location: window.dojoPath + "dojo", name: "dojo" },
    { location: window.dojoPath + "put-selector", main: "put", name: "put-selector" },

    // Additional packages for this webapp
    { location: window.contextPath + "js/lib/src", name:"custom" }
];