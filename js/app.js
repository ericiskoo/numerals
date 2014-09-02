var numeralsApp = angular.module('numeralsApp', ['ui.router','ngAnimate','ngStorage']);

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

    .state('achievements', {
      templateUrl: 'partials/achievements.html',
      controller: 'AchievementsCtrl'
    })
});

numeralsApp.factory('numeralService', function() {
  return {
    'Western Arabic' : ['0','1','2','3','4','5','6','7','8','9'],
    'Eastern Arabic' : ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'],
    'Devanagari'     : ['०','१','२','३','४','५','६','७','८','९'],
    'Gujarati'       : ['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'],
    'Gurmukhi'       : ['੦','੧','੨','੩','੪','੫','੬','੭','੮','੯'],
    'Oriya'          : ['୦','୧','୨','୩','୪','୫','୬','୭','୮','୯'],
    'Bengali'        : ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
    'Tamil'          : ['௦','௧','௨','௩','௪','௫','௬','௭','௮','௯'],
    'Burmese'        : ['๐','၁','၂','၃','၄','၅','၆','၇','၈','၉'],
    'Khmer'          : ['០','១','២','៣','៤','៥','៦','៧','៨','៩'],
    'Lao'            : ['໐','໑','໒','໓','໔','໕','໖','໗','໘','໙'],
    'Mongolian'      : ['᠐','᠑','᠒','᠓','᠔','᠕','᠖','᠗','᠘','᠙'],
    'Tibetan'        : ['༠','༡','༢','༣','༤','༥','༦','༧','༨','༩'],
    'Thai'           : ['๐','๑','๒','๓','๔','๕','๖','๗','๘','๙'],
    'Chinese'        : ['零','一','二','三','四','五','六','七','八','九']
  }
});

numeralsApp.factory('achievementService', function() {
  return [
    {'title':'You Got One', 'desc':'You actually got one right!'},
    {'title':'100 Points', 'desc':'Yay!'},
    {'title':'250 Points', 'desc':'Woohoo!!'},
    {'title':'500 Points', 'desc':'Points!!!'},
    {'title':'1000 Points', 'desc':'More points!!!!'},
    {'title':'2500 Points', 'desc':'EVEN MORE POINTS!!!!!'},
    {'title':'5000 Points', 'desc':'HALFWAY TO 10000!!!!!!'},
    {'title':'10000 Points', 'desc':"IT'S OVER 9000!!!!!!!"},
    {'title':'3 in a Row', 'desc':'Luck.'},
    {'title':'5 in a Row', 'desc':'Miracles can happen.'},
    {'title':'10 in a Row', 'desc':"Maybe you're actually getting better."},
    {'title':'25 in a Row', 'desc':'Are you cheating?'},
    {'title':'50 in a Row', 'desc':'You must be cheating.'},
    {'title':'100 in a Row', 'desc':'Fine. You win.'},
    {'title':'Western Arabic', 'desc':'0 1 2 3 4 5 6 7 8 9'},
    {'title':'Eastern Arabic', 'desc':'٩ ٨ ٧ ٦ ٥ ٤ ٣ ٢ ١ ٠'},
    {'title':'Devanagari', 'desc':'० १ २ ३ ४ ५ ६ ७ ८ ९'},
    {'title':'Gujarati', 'desc':'૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯'},
    {'title':'Gurmukhi', 'desc':'੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯'},
    {'title':'Oriya', 'desc':'୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯'},
    {'title':'Bengali', 'desc':'০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯'},
    {'title':'Tamil', 'desc':'௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯'},
    {'title':'Burmese', 'desc':'๐ ၁ ၂ ၃ ၄ ၅ ၆ ၇ ၈ ၉'},
    {'title':'Khmer', 'desc':'០ ១ ២ ៣ ៤ ៥ ៦ ៧ ៨ ៩'},
    {'title':'Lao', 'desc':'໐ ໑ ໒ ໓ ໔ ໕ ໖ ໗ ໘ ໙'},
    {'title':'Mongolian', 'desc':'᠐ ᠑ ᠒ ᠓ ᠔ ᠕ ᠖ ᠗ ᠘ ᠙'},
    {'title':'Tibetan', 'desc':'༠ ༡ ༢ ༣ ༤ ༥ ༦ ༧ ༨ ༩'},
    {'title':'Thai', 'desc':'๐ ๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙'},
    {'title':'Chinese', 'desc':'零 一 二 三 四 五 六 七 八 九'}
  ]
});

numeralsApp.controller('StartCtrl', function($scope, $state, numeralService) {
  var shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  $scope.langs = numeralService;
  $scope.startNumerals = [];
  for (lang in $scope.langs) {
    $scope.startNumerals.push(lang);
  }
  $scope.startNumerals = shuffle($scope.startNumerals);
  $scope.startNumerals = $scope.startNumerals.slice(0,10);
  for (var i=0; i<$scope.startNumerals.length; i++) {
    $scope.startNumerals[i] = $scope.langs[$scope.startNumerals[i]][i];
  }

  $scope.startGame = function() {
    $scope.nextQuestion();
    $state.go('game.question');
  }
  $scope.viewAchievements = function() {
    $state.go('achievements');
  }
});

numeralsApp.controller('GameCtrl', function($scope, $state, $localStorage, $log, numeralService) {
  $scope.langs = {};
  for (lang in numeralService) {
    $scope.langs[lang] = {'numerals':angular.copy(numeralService[lang]), 'total':1, 'counts':[1,1,1,1,1,1,1,1,1,1]};
  }
  $scope.$storage = $localStorage.$default({'earnedAchievements':[], 'bestScore':0});
  console.log($scope.$storage.earnedAchievements);

  $scope.validLangs = ['Western Arabic','Eastern Arabic'];
  $scope.currentStreak = 0;
  $scope.currentScore = 0;
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
    $scope.newAchievements = [];

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
    $scope.newAchievements = [];

    $scope.answer = $scope.index1 + $scope.index2;
    if (response == $scope.answer) {
      $scope.status = 'correct';
      $scope.correct += 1;
      $scope.currentStreak += 1;
      // Update score
      $scope.currentScore += 10*$scope.currentStreak;
      $scope.earnedPoints = '+'+(10*$scope.currentStreak);
      if ($scope.currentScore > $scope.$storage.bestScore) {
        $scope.$storage.bestScore = $scope.currentScore;
      }
      // Update counts
      $scope.langs[$scope.lang1]['total'] += 1;
      $scope.langs[$scope.lang2]['total'] += 1;
      $scope.langs[$scope.lang1]['counts'][$scope.index1] += 1;
      $scope.langs[$scope.lang2]['counts'][$scope.index2] += 1;
    } else {
      $scope.status = 'incorrect';
      $scope.currentStreak = 0;
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
    }
    $scope.accuracy = $scope.correct/$scope.trials;

    // Score achievements
    var breakPoints = [100,250,500,1000,2500,5000,10000];
    for (var i=0; i<breakPoints.length; i++) {
      var title = breakPoints[i]+' Points';
      if ($scope.currentScore>=breakPoints[i] && $scope.$storage.earnedAchievements.indexOf(title)==-1) {
        $scope.$storage.earnedAchievements.push(title);
        $scope.newAchievements.push(title);
        break;
      }
    }
    // Streak achievements
    var breakPoints = [1,3,5,10,25,50,100];
    for (var i=0; i<breakPoints.length; i++) {
      var title = breakPoints[i]+' in a Row';
      if (breakPoints[i]==1) {
        title = 'You Got One';
      }
      if ($scope.currentStreak==breakPoints[i] && $scope.$storage.earnedAchievements.indexOf(title)==-1) {
        $scope.$storage.earnedAchievements.push(title);
        $scope.newAchievements.push(title);
        break;
      }
    }
    // Language achievements
    for (var i=0; i<$scope.validLangs.length; i++) {
      if ($scope.langs[$scope.validLangs[i]].total>10 && $scope.$storage.earnedAchievements.indexOf($scope.validLangs[i])==-1) {
        $scope.$storage.earnedAchievements.push($scope.validLangs[i]);
        $scope.newAchievements.push($scope.validLangs[i]);
      }
    }

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
    $scope.langs = {};
    for (lang in numeralService) {
      $scope.langs[lang] = {'numerals':angular.copy(numeralService[lang]), 'total':1, 'counts':[1,1,1,1,1,1,1,1,1,1]};
    }
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

numeralsApp.controller('AchievementsCtrl', function($scope, $state, $localStorage, achievementService) {
  $scope.$storage = $localStorage.$default({'earnedAchievements':[], 'bestScore':0});
  $scope.achievements = achievementService;

  $scope.inArray = function(str) {
    return ($scope.$storage.earnedAchievements.indexOf(str) > -1) ? true : false;
  }
  $scope.startMenu = function() {
    $state.go('start');
  }
});
