jottrControllers.controller('SidebarController', ['$scope', '$rootScope', 'noteRepository',
    function($scope, $rootScope, noteRepository){
        $scope.currentNoteName = "";
        $scope.notes = noteRepository.findAll();

        $scope.loadNote = function(name){
            $rootScope.$emit('loadNote', name);
            $scope.currentNoteName = name;
        }
        $scope.addNote = function(name){
            if (name){
                var newNote = { name: name, md: "", html: "" };
                noteRepository.save(newNote);
                $scope.notes = noteRepository.findAll();
            }
        }
        $scope.deleteNote = function(note){
            noteRepository.remove(note);
            $rootScope.$emit('deleteNote', note.name);
            $scope.notes = noteRepository.findAll();
        }

    }
]);
