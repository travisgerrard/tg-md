var app = angular.module('flapperNews', ['ui.router']);

var connectionAddress = 'http://7a0cf305.ngrok.io/posts/';

app.config([
    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts) {
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });

        $urlRouterProvider.otherwise('home');
    }
]);

app.factory('posts', ['$http',

    function($http) {

        var o = {
            posts: []
        };

        o.getAll = function() {
            return $http.get(connectionAddress).success(function(data) {
                angular.copy(data, o.posts);
            });
        };

        o.create = function(post) {
            return $http.post(connectionAddress, post).success(function(data) {
                o.posts.push(data);
            });
        };

        o.upvote = function(post) {
            return $http.put(connectionAddress + post._id + '/upvote').success(function(data) {
                post.upvote += 1;
            });
        };

        o.get = function(id) {
            return $http.get(connectionAddress + id).then(function(res) {
                return res.data;
            });
        };

        o.addComment = function(id, comment) {
            return $http.post(connectionAddress + id + '/comments', comment);
        };

        o.upvoteComment = function(post, comment) {
            return $http.put(connectionAddress + post._id + '/comments/' + comment._id + '/upvote')
                .success(function(data) {
                    comment.upvotes += 1;
                });
        };
        return o;
    }
]);

app.controller('MainCtrl', [
        '$scope',
        'posts',
        function($scope, posts) {

            $scope.posts = posts.posts;

            $scope.addPost = function() {
                if (!$scope.title || $scope.title === '') {
                    return;
                }
                posts.create({
                    title: $scope.title,
                    link: $scope.link
                });

                $scope.title = '';
                $scope.link = '';
            };

            $scope.incrementUpvotes = function(post) {
                //post.upvotes += 1;
                posts.upvote(post);
            };

        }
    ])
    .controller('PostsCtrl', [
        '$scope',
        'posts',
        'post',
        function($scope, posts, post) {

            $scope.post = post;

            $scope.addComment = function() {
                if ($scope.body === '') {
                    return;
                }
                posts.addComment(post._id, {
                    body: $scope.body,
                    author: 'user',
                }).success(function(comment) {
                    $scope.post.comments.push(comment);
                });
                $scope.body = '';
            };

            $scope.upvote = function(comment) {
                posts.upvoteComment(post, comment);
            };
        }
    ]);
