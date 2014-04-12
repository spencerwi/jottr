describe('noteRepository', function(){
    var mockRepositoryContents;

    beforeEach(angular.mock.module('jottr.services'));
    beforeEach(function(){
        mockRepositoryContents = {};
        spyOn(localStorage, 'getItem').andCallFake(function(){
            if (mockRepositoryContents == null){ return null; } 
            return JSON.stringify(mockRepositoryContents);
        });
        spyOn(localStorage, 'setItem').andCallFake(function(key, value){
            if (key == "notes"){ mockRepositoryContents = JSON.parse(value); }
        });
    });

    it("should initialize the note list if it doesn't exist", inject(function(noteRepository){
        mockRepositoryContents = null;
        var expectedRepositoryContents = {};

        noteRepository.findAll();

        expect(mockRepositoryContents).toEqual(expectedRepositoryContents);
    }));

    it("should be able to return all notes", inject(function(noteRepository){
        mockRepositoryContents = {
            note1: {
                name: 'Hello world!',
                html: '<h2 id="#helloworld">Hello world!</h2>',
                md: '## Hello world!'
            },
            note2: {
                name: 'Hello world!',
                html: '<h2 id="#helloworld">Hello world!</h2>',
                md: '## Hello world!'
            }
        };
        expect(noteRepository.findAll()).toEqual(mockRepositoryContents);
    }));

    it("should be able to get a note", inject(function(noteRepository){
        var note = {
            name: 'Hello world!',
            html: '<h2 id="#helloworld">Hello world!</h2>',
            md: '## Hello world!'
        };
        mockRepositoryContents = { "Hello world!": note };

        var actual = noteRepository.get(note.name);

        expect(actual).toEqual(note);
        expect(localStorage.getItem).toHaveBeenCalledWith('notes');
    }));

    it("should be able to save notes", inject(function(noteRepository){
        var note = {
            name: 'Hello world!',
            html: '<h2 id="#helloworld">Hello world!</h2>',
            md: '## Hello world!'
        };
        var expectedRepositoryContents = {"Hello world!": note};

        noteRepository.save(note);

        expect(mockRepositoryContents).toEqual(expectedRepositoryContents);
    }));
    it("should noop on trying to save null", inject(function(noteRepository){
        noteRepository.save(null);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }));
    it("should noop on trying to save a note that has no name", inject(function(noteRepository){
        noteRepository.save({name: "", md:"test", html: "test"});
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }));


    it("should be able to delete a note", inject(function(noteRepository){
        var note = {
            name: 'Hello world!',
            html: '<h2 id="#helloworld">Hello world!</h2>',
            md: '## Hello world!'
        };
        mockRepositoryContents = { "Hello world!": note };

        noteRepository.remove(note);

        expect(mockRepositoryContents[note.name]).toBeUndefined();
    }));
    it("should noop on trying to delete a note", inject(function(noteRepository){
        noteRepository.remove(null);
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }));
    it("should noop on trying to save a note that has no name", inject(function(noteRepository){
        noteRepository.remove({name: "", md:"test", html: "test"});
        expect(localStorage.setItem).not.toHaveBeenCalled();
    }));

});
