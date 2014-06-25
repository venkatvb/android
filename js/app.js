var app = angular.module('myApp', [
        "mobile-angular-ui"
    ]);
app.controller("myController", function($scope){

    $scope.user = {
        "handle": ""
    };

    $scope.usr = [];
    refreshHandles();
    $scope.add = function()
    {
       // console.log(localStorage.appinit);
        if(localStorage.appinit == null)
        {
            init();
        }
        if(localStorage.cfid == null)
        {
            localStorage.setItem("cfid", 0);
        }
        var storedNames = JSON.parse(localStorage['cfhandle']);
        var index = parseInt(localStorage.getItem("cfid"));
        storedNames[index] = JSON.stringify(new handl($scope.user.handle));
        index = index + 1;
        localStorage.setItem("cfid", index);
        localStorage.setItem("cfhandle", JSON.stringify(storedNames));
       // console.log(localStorage.cfhandle);
        $scope.user.handle = "";
        refreshHandles();
    }
    function init()
    {
        console.log("init method called");
        localStorage.setItem("appinit", "true");
        localStorage.setItem("cfid", 0);
        var user = [];
        user[0] = JSON.stringify(new handl(""));
        localStorage.setItem("cfhandle", JSON.stringify(user));
    }

    function handl(name)
    {
        this.handle = name;
    }

    function refreshHandles()
    {
        var retriveObject = localStorage.getItem("cfhandle");
     //   console.log("the retrived object is "+retriveObject);
        var a = '['+JSON.parse(retriveObject)+']';
        console.log("a "+a);
        $scope.usr = JSON.parse(a);
    }



});