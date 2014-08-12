var numeralsApp = angular.module('numeralsApp', ['ui.router','ngAnimate']);

numeralsApp.config(function($stateProvider, $urlRouterProvider) {    
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('start', {
      url: '/',
      templateUrl: 'partials/start.html',
      controller: 'StartCtrl'
    })

    .state('game', {
      templateUrl: 'partials/game.html'
    })
    .state('game.question', {
      templateUrl: 'partials/question.html'
    })
    .state('game.answer', {
      templateUrl: 'partials/answer.html'
    })
});

numeralsApp.factory('dataFactory', function() {
  return {
    'Western Arabic' : {'total':1, 'numerals':['0','1','2','3','4','5','6','7','8','9'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Eastern Arabic' : {'total':1, 'numerals':['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'], 'counts':[1,1,1,1,1,1,1,1,1,1]},

    'Devanagari'     : {'total':1, 'numerals':['०','१','२','३','४','५','६','७','८','९'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Gujarati'       : {'total':1, 'numerals':['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Gurmukhi'       : {'total':1, 'numerals':['੦','੧','੨','੩','੪','੫','੬','੭','੮','੯'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Oriya'          : {'total':1, 'numerals':['୦','୧','୨','୩','୪','୫','୬','୭','୮','୯'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Bengali'        : {'total':1, 'numerals':['০','১','২','৩','৪','৫','৬','৭','৮','৯'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Tamil'          : {'total':1, 'numerals':['௦','௧','௨','௩','௪','௫','௬','௭','௮','௯'], 'counts':[1,1,1,1,1,1,1,1,1,1]},

    'Burmese'        : {'total':1, 'numerals':['๐','၁','၂','၃','၄','၅','၆','၇','၈','၉'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Khmer'          : {'total':1, 'numerals':['០','១','២','៣','៤','៥','៦','៧','៨','៩'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Lao'            : {'total':1, 'numerals':['໐','໑','໒','໓','໔','໕','໖','໗','໘','໙'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Mongolian'      : {'total':1, 'numerals':['᠐','᠑','᠒','᠓','᠔','᠕','᠖','᠗','᠘','᠙'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Tibetan'        : {'total':1, 'numerals':['༠','༡','༢','༣','༤','༥','༦','༧','༨','༩'], 'counts':[1,1,1,1,1,1,1,1,1,1]},
    'Thai'           : {'total':1, 'numerals':['๐','๑','๒','๓','๔','๕','๖','๗','๘','๙'], 'counts':[1,1,1,1,1,1,1,1,1,1]},

    'Chinese'        : {'total':1, 'numerals':['零','一','二','三','四','五','六','七','八','九'], 'counts':[1,1,1,1,1,1,1,1,1,1]}
  }
});

numeralsApp.controller('StartCtrl', function($scope, $state, dataFactory) {
  var shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  $scope.langs = dataFactory;
  $scope.startNumerals = [];
  for (lang in $scope.langs) {
    $scope.startNumerals.push(lang);
  }
  $scope.startNumerals = shuffle($scope.startNumerals);
  $scope.startNumerals = $scope.startNumerals.slice(0,10);
  for (var i=0; i<$scope.startNumerals.length; i++) {
    $scope.startNumerals[i] = $scope.langs[$scope.startNumerals[i]]['numerals'][i];
  }

  $scope.startGame = function() {
    $scope.nextQuestion();
    $state.go('game.question');
  }
}); 

numeralsApp.controller('GameCtrl', function($scope, $state, $log, dataFactory) {
  $scope.langs = angular.copy(dataFactory);

  $scope.validLangs = ['Western Arabic','Eastern Arabic'];
  $scope.currentStreak = 0;
  $scope.bestStreak = 0;
  $scope.currentScore = 0;
  $scope.bestScore = 0;
  $scope.earnedPoints;
  $scope.trials = 0.0;
  $scope.correct = 0.0;
  $scope.accuracy = 0.0;

  var randElement = function(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  var probSelect = function(array) {
    var sum = 0.0;
    for (var i=0; i<array.length; i++) {
      sum += 1.0/array[i];
    }
    var cumulative = [];
    var runningTotal = 0.0;
    for (var i=0; i<array.length; i++) {
      runningTotal += (1.0/array[i])/sum;
      cumulative.push(runningTotal);
    }
    var randVal = Math.random();
    for (var i=0; i<cumulative.length; i++) {
      if (randVal < cumulative[i]) {
        return i;
      }
    }
  }

  var generateQuestion = function() {
    // Update validLangs
    var langCounts = [];
    var addNewLang = true;
    for (var i=0; i<$scope.validLangs.length; i++) {
      langCounts.push($scope.langs[$scope.validLangs[i]].total);
      if ($scope.langs[$scope.validLangs[i]].total <= 10) {
        addNewLang = false;
      }
    }
    if (addNewLang == true) {
      var newLangOptions = [];
      for (lang in $scope.langs) {
        if ($scope.validLangs.indexOf(lang) == -1) {
          newLangOptions.push(lang);
        }
      }
      $scope.validLangs.push(randElement(newLangOptions));
    }

    // Select languages
    var langIndex1 = probSelect(langCounts);
    $scope.lang1 = $scope.validLangs[langIndex1];
    var filtered = $scope.validLangs.slice();
    filtered.splice($scope.validLangs.indexOf($scope.lang1),1);
    langCounts.splice($scope.validLangs.indexOf($scope.lang1),1);
    $scope.lang2 = filtered[probSelect(langCounts)];

    // Select vars
    $scope.index1 = probSelect($scope.langs[$scope.lang1]['counts']);
    $scope.index2 = probSelect($scope.langs[$scope.lang2]['counts']);
    $scope.var1 = $scope.langs[$scope.lang1]['numerals'][$scope.index1];
    $scope.var2 = $scope.langs[$scope.lang2]['numerals'][$scope.index2];
    $log.log($scope.index1, $scope.index2);
  }
  
  $scope.submitResponse = function(response) {
    $scope.answer = $scope.index1 + $scope.index2;
    if (response == $scope.answer) {
      $scope.status = 'correct';
      $scope.correct += 1;
      // Update counts
      $scope.langs[$scope.lang1]['total'] += 1;
      $scope.langs[$scope.lang2]['total'] += 1;
      $scope.langs[$scope.lang1]['counts'][$scope.index1] += 1;
      $scope.langs[$scope.lang2]['counts'][$scope.index2] += 1;
      // Update streak
      $scope.currentStreak += 1;
      if ($scope.currentStreak > $scope.bestStreak) {
        $scope.bestStreak = $scope.currentStreak;
      }
      // Update score
      $scope.currentScore += 10*$scope.currentStreak;
      $scope.earnedPoints = '+'+(10*$scope.currentStreak);
      if ($scope.currentScore > $scope.bestScore) {
        $scope.bestScore = $scope.currentScore;
      }
    } else {
      $scope.status = 'incorrect';
      // Update counts
      if ($scope.langs[$scope.lang1]['total'] > 1) {
        $scope.langs[$scope.lang1]['total'] = $scope.langs[$scope.lang1]['total'] - 1;
      }
      if ($scope.langs[$scope.lang2]['total'] > 1) {
        $scope.langs[$scope.lang2]['total'] = $scope.langs[$scope.lang2]['total'] - 1;
      }
      if ($scope.langs[$scope.lang1]['counts'][$scope.index1] > 1) {
        $scope.langs[$scope.lang1]['counts'][$scope.index1] = $scope.langs[$scope.lang1]['counts'][$scope.index1] - 1;
      }
      if ($scope.langs[$scope.lang2]['counts'][$scope.index2] > 1) {
        $scope.langs[$scope.lang2]['counts'][$scope.index2] = $scope.langs[$scope.lang2]['counts'][$scope.index2] - 1;
      }
      // Update streak
      $scope.currentStreak = 0;
    }
    $scope.accuracy = $scope.correct/$scope.trials;
    $state.go('game.answer');
  }

  $scope.nextQuestion = function() {
    generateQuestion();
    $scope.answer = null;
    $scope.trials += 1;
    $scope.earnedPoints = null;
    $state.go('game.question');
  }

  $scope.newGame = function() {
    $scope.langs = angular.copy(dataFactory);
    $scope.answer = null;
    $scope.validLangs = ['Western Arabic','Eastern Arabic'];
    $scope.currentStreak = 0;
    $scope.bestStreak = 0;
    $scope.currentScore = 0;
    $scope.earnedPoints;
    $scope.trials = 0.0;
    $scope.correct = 0.0;
    $scope.accuracy = 0.0;
    $state.go('start');
  }
});

numeralsApp.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

numeralsApp.directive('setFocus', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      });
    }
  };
});

numeralsApp.directive('langProgress', function() {
  return {
    scope: {
      count: '=langProgress'
    },
    link: function (scope, element, attr) {
      scope.$watch('count', function (value) {
        var progress = '';
        if (scope.count-1 < 10) {
          for (var i=0; i<scope.count-1; i++) {
            progress += '■';
          }
          while (progress.length < 10) {
            progress += '□';
          }
        }
        else {
          for (var i=0; i<10; i++) {
            progress += '■';
          }
        }
        element.html(progress);
      }, true);
    }
  };
});