angular.module('app', ['ngRoute'])

.factory('Todos', function() {
    return [{
        name: 'Item one',
        completed: false,
        note: 'add notes....'
    }, {
        name: 'Item two',
        completed: true,
        note: 'add notes....'
    }, {
        name: 'pretty cool',
        completed: false,
        note: 'add notes....'
    }];
})

.controller('TodoController', ['$scope', 'Todos', function($scope, Todos) {
    $scope.todos = Todos;
}])

.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function($scope, $routeParams, Todos) {
    $scope.todo = Todos[$routeParams.id];
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/todos.html',
            controller: 'TodoController'
        })

    .when('/:id', {
        templateUrl: '/todoDetails.html',
        controller: 'TodoDetailCtrl'
    });
}]);
