angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $stateParams) {
    $scope.oldTestament = [{name:"Genesis", chapter:"50"}, {name: "Exodus", chapter:"40"}, {name: "Leviticus", chapter:"27"},{name: "Numbers", chapter:"36"}, {name: "Deuteronomy", chapter:"34"},{name: "Joshua", chapter:"24"},{name: "Judges", chapter:"21"},{name: "Ruth", chapter:"4"},{name: "1 Samuel", chapter:"31"},{name: "2 Samuel", chapter:"24"},{name: "1 Kings", chapter:"22"}, {name: "2 Kings", chapter:"25"},{name: "1 Chronicles", chapter:"29"},{name: "2 Chronicles", chapter:"36"}, {name: "Ezra", chapter:"10"},{name: "Nehemiah", chapter:"10"},{name: "Esther", chapter:"14"},{name: "Job", chapter:"42"}, {name: "Psalms", chapter:"150"},{name: "Proverbs", chapter:"31"}, {name: "Ecclesiastes", chapter:"12"},{name: "Song of Songs", chapter:"8"},{name: "Isaiah", chapter:"66"},{name: "Jeremiah", chapter:"52"},{name: "Lamentations", chapter:"5"},{name: "Ezekiel", chapter:"48"},{name: "Daniel", chapter:"12"},{name: "Hosea", chapter:"14"},{name: "Joel", chapter:"3"},{name: "Amos", chapter:"9"},{name: "Obadiah", chapter:"1"},{name: "Jonah", chapter:"4"},{name: "Micah", chapter:"7"},{name: "Nahum", chapter:"3"},{name: "Habakkuk", chapter:"3"},{name: "Zephania", chapter:"3"},{name: "Haggai", chapter:"2"},{name: "Zechariah", chapter:"14"},{name: "Malachi", chapter:"4"}];
    
    $scope.newTestament = [{name: "Matthew", chapter:"28"},{name: "Mark", chapter:"16"},{name: "Luke", chapter:"24"},{name: "John", chapter:"21"},{name: "Acts", chapter:"28"},{name: "Romans", chapter:"16"},{name: "1 Corinthians", chapter:"16"},{name: "2 Corinthians", chapter:"13"},{name: "Galatians", chapter:"6"},{name: "Ephesians", chapter:"6"},{name: "Philipians", chapter:"4"},{name: "Colossians", chapter:"4"},{name: "1 Thessalonians", chapter:"5"},{name: "2 Thessalonians", chapter:"3"},{name: "1 Timothy", chapter:"6"},{name: "2 Timothy", chapter:"4"},{name: "Titus", chapter:"3"},{name: "Philemon", chapter:"1"},{name: "Hebrews", chapter:"13"},{name: "James", chapter:"14"},{name: "1 Peter", chapter:"5"},{name: "2 Peter", chapter:"3"},{name: "1 John", chapter:"5"},{name: "2 John", chapter:"1"},{name: "3 John", chapter:"1"},{name: "Jude", chapter:"1"},{name: "Revelation", chapter:"22"}];
    if($stateParams.books){
        if($stateParams.books == 'oldTestament'){
            $scope.books = "Old Testament";
        }else{
            $scope.books = "New Testament";
        }
    }
    
    if($stateParams.bookName){
        $scope.bookName = $stateParams.bookName;
        if($scope.books == "Old Testament"){
            for(var i=0; i<$scope.oldTestament.length; i++){
                if($scope.oldTestament[i].name == $scope.bookName){
                    createChapter($scope.oldTestament[i].chapter);
                }
            }
        }else{
            for(var i=0; i<$scope.newTestament.length; i++){
                if($scope.newTestament[i].name == $scope.bookName){
                    createChapter($scope.newTestament[i].chapter);
                }
            }
        }
    } 
if($stateParams.chapter){
    callContent();
}
    function createChapter(chapterNumber){
        $scope.chapters = [];
        for(var i=0; i<chapterNumber; i++){
            $scope.chapters.push("i"+i);
        }
    }
    function callContent(){
        $http.get('http://www.esvapi.org/v2/rest/passageQuery?key=071b2bef12d451fe&passage='+$scope.bookName+'+'+$stateParams.chapter+'&include-headings=false').then(function(response){
        console.log(response);
        $scope.returned = response.data;
    });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
