var app = angular.module('myApp', [
        "mobile-angular-ui"
    ]);
app.controller("myController", function($scope, $http, $timeout){

    $scope.user = {
        "handle": ""
    };
    $scope.$watch("user.handle", function() 
    {
        $scope.user.handle = $scope.user.handle.toLowerCase().replace(/\s+/g,'');
    });
    $scope.usr = [];
    refreshHandles();
    $scope.handleloading = false;
    $scope.add = function()
    {
        $scope.handleloading = true;
       // console.log(localStorage.appinit);
        if(localStorage.appinit == null)
        {
            init();
        }
        if(localStorage.cfid == null)
        {
            localStorage.setItem("cfid", 0);
        }
        console.log("the scope.user.handle is "+$scope.user.handle);
        var url = "http://json2jsonp.com/?url=http://codeforces.com/api/user.info?handles="+$scope.user.handle+"&callback=cfhandle";
        $http.jsonp(url);
        window.cfhandle = function(data)
        {
            $scope.handleloading = false;
            console.log("cfhandle called");
            $scope.state = data.status;
            console.log("The status of the data is "+data.status);
            if(data.status == "FAILED")
            {
                console.log("the handle doesn't exists");
            }
            if(data.status == "OK")
            {
                console.log("do the local storage here..");
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
        }
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