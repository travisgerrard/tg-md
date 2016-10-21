var app = angular.module('patientParser', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }
]);

app.controller('MainCtrl', [
    '$scope',
    function($scope) {
        $scope.test = 'Hello world!';

        $scope.dailyTodos = ['Consults', 'Andon - VTE/Glucose', 'MAR 48', 'IV Meds', 'AM Labs', 'Discharge/Dispo', 'Learning'];
        $scope.newTodos = ['________________', '________________', '________________', '________________', '________________', '________________', '________________'];

    }
]);
