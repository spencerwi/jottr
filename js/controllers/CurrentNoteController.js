jottrControllers.controller('CurrentNoteController', ['$scope', '$rootScope', 'noteRepository', 'markdownService', 
    function($scope, $rootScope, noteRepository, markdownService){
        $scope.currentNote = {
            name: "First note",
            md: "## Edit me!",
            html: "<h2 id='editme'>Edit me!</h2>"
        };
        noteRepository.save($scope.currentNote);

        $scope.mode = "html";
        $scope.otherMode = "markdown";

        $scope.updateMarkdown = function(){
            $scope.currentNote.md = markdownService.htmlToMarkdown($scope.currentNote.html);
        };
        $scope.updateHTML = function(){
            $scope.currentNote.html = markdownService.markdownToHtml($scope.currentNote.md);
        }

        $scope.switchMode = function(){
            if ($scope.mode == "html"){
                $scope.mode = "markdown";
                $scope.otherMode = "html";
                $scope.updateMarkdown();
            } else {
                $scope.otherMode = "markdown";
                $scope.mode = "html";
                $scope.updateHTML();
            }
            noteRepository.save($scope.currentNote);
        }


        $scope.handleLoadNote = function(event, name){
            $scope.currentNote = noteRepository.get(name);
        }
        $scope.handleDeleted = function(event, deletedNoteName){ 
            if ($scope.currentNote.name == deletedNoteName){
                $scope.handleLoadNote(null, null); 
            }
        }

        var eventBindings = {
            loadNote: $rootScope.$on('loadNote', $scope.handleLoadNote),
            deleteNote: $rootScope.$on('noteDeleted', $scope.handleDeleted)
        }
        for (var unbinder in eventBindings){
            $scope.$on('$destroy', eventBindings);
        }
    }
]);
