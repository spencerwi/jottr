describe('SidebarController', function(){
    var scope, controller, rootScope, mockNoteRepository;

    beforeEach(angular.mock.module('jottr.controllers'));
    beforeEach(inject(function($rootScope, $controller){
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockNoteRepository = jasmine.createSpyObj('noteRepository', ['findAll', 'get', 'save', 'remove']);

        controller = $controller('SidebarController', {$scope: scope, $rootScope: rootScope, noteRepository: mockNoteRepository});
    }));

    it("should initialize its list of notes from the noteRepository", function(){
        expect(mockNoteRepository.findAll).toHaveBeenCalled();
    });

    it("should emit the 'loadNote' event when loadNote is called", function(){
        spyOn(rootScope, '$emit');

        scope.loadNote('test');

        expect(rootScope.$emit).toHaveBeenCalledWith('loadNote', 'test');
    });

    it("should be able to delete a note", function(){
        var noteToDelete = {name: 'test', md: '', html: ''};

        scope.deleteNote(noteToDelete);

        expect(mockNoteRepository.remove).toHaveBeenCalledWith(noteToDelete);
    });
    it("should emit the 'deleteNote' event upon deleting a note", function(){
        spyOn(rootScope, '$emit');

        var noteToDelete = {name: 'test', md: '', html: ''};
        scope.deleteNote(noteToDelete);

        expect(rootScope.$emit).toHaveBeenCalledWith('deleteNote', noteToDelete.name);
    });
    it("should refresh its list of notes on deleting a note", function(){
        scope.deleteNote("test");
        expect(mockNoteRepository.findAll).toHaveBeenCalled();
    });

    it("should be able to add a new note with a given name", function(){
        scope.addNote("test");
        expect(mockNoteRepository.save).toHaveBeenCalledWith({name: "test", md:"", html:""});
    });
    it("should noop on adding a new note if no name is given for the new note", function(){
        scope.addNote(null);
        scope.addNote("");
        expect(mockNoteRepository.save).not.toHaveBeenCalled();
    });
    it("should refresh its list of notes on adding a note", function(){
        scope.addNote("test");
        expect(mockNoteRepository.findAll).toHaveBeenCalled();
    });
});
