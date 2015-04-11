
var opPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
var opBranch = opPrefs.getBranch("extensions.openprocenter.");

function openProcenter()
{
    var procenterHost = "";
    if (opBranch.prefHasUserValue("host")) {
        procenterHost = opBranch.getCharPref("host");
    }
    else {
        alert("[OpenProcenter] Host is not set!");
        return;
    }

    var procenterUser = "";
    if (opBranch.prefHasUserValue("user")) {
        procenterUser = opBranch.getCharPref("user");
    }
    else {
        alert("[OpenProcenter] User is not set!");
        return;
    }

    var procenterPassword = "";
    if (opBranch.prefHasUserValue("password")) {
        procenterPassword = opBranch.getCharPref("password");
    }
    else {
        alert("[OpenProcenter] Password is not set!");
        return;
    }

    var procenterID = "";

    var thisselection = document.commandDispatcher.focusedWindow.getSelection();
    procenterID = thisselection.toString();
    //alert(procenterID);

    Components.utils.import("resource://gre/modules/FileUtils.jsm");

    var env = Components.classes["@mozilla.org/process/environment;1"]
                        .getService(Components.interfaces.nsIEnvironment);
    var shell = new FileUtils.File(env.get("COMSPEC"));

    var command ="PrCenterLite.exe -host "+ procenterHost + " -user "+ procenterUser + " -passwd " + procenterPassword + " -path " + procenterHost + "/" + procenterID;
    var args = ["/c", command];

    var process = Components.classes["@mozilla.org/process/util;1"]
                            .createInstance(Components.interfaces.nsIProcess);
    process.init(shell);
    process.runAsync(args, args.length);
}
