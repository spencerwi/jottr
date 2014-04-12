describe('CurrentNoteController', function(){
    var scope, controller, rootScope, mockNoteRepository, mockMarkdownService;

    beforeEach(angular.mock.module('jottr.controllers'));

    beforeEach(inject(function($rootScope, $controller){
        rootScope = $rootScope;
        scope = $rootScope.$new();
        mockNoteRepository = jasmine.createSpyObj('noteRepository', ['findAll', 'get', 'save', 'remove']);
        mockMarkdownService = jasmine.createSpyObj('markdownService', ['markdownToHtml', 'htmlToMarkdown']);

        controller = $controller('CurrentNoteController', {$scope: scope, $rootScope: rootScope, noteRepository: mockNoteRepository, markdownService: mockMarkdownService});
    }));

    it("should know how to update the current note's Markdown contents using the markdown service", function(){
        scope.updateMarkdown();
        expect(mockMarkdownService.htmlToMarkdown).toHaveBeenCalledWith(scope.currentNote.html);
    });
    it("should know how to update the current note's HTML contents using the markdown service", function(){
        scope.updateHTML();
        expect(mockMarkdownService.markdownToHtml).toHaveBeenCalledWith(scope.currentNote.md);
    });

    it("should start in HTML mode", function(){
        expect(scope.mode).toEqual("html");
        expect(scope.otherMode).toEqual("markdown");
    });
    it("should update the Markdown source from the HTML wysiwyg on switching from HTML to Markdown", function(){
        spyOn(scope, 'updateMarkdown');

        scope.switchMode();

        expect(scope.updateMarkdown).toHaveBeenCalled();
    });
    it("should update the HTML wysiwyg from the Markdown source on switching from Markdown to HTML", function(){
        spyOn(scope, 'updateHTML');
        scope.mode = "markdown";

        scope.switchMode();

        expect(scope.updateHTML).toHaveBeenCalled();
    });
    it("should save the current note on switching modes", function(){
        scope.switchMode();
        expect(mockNoteRepository.save).toHaveBeenCalledWith(scope.currentNote);
    });

    it("should load the requested note on detecting the loadNote event", function(){
        rootScope.$emit('loadNote', 'test');
        expect(mockNoteRepository.get).toHaveBeenCalledWith('test');
    });
    it("should load an empty note if the currently-active note is named in a noteDeleted event", function(){
        rootScope.$emit('noteDeleted', scope.currentNote.name);
        expect(mockNoteRepository.get).toHaveBeenCalledWith(null);
        expect(scope.currentNote).toBeUndefined();
    });
    it("should noop if the note named in a noteDeleted event is not currently active", function(){
        var initialNote = scope.currentNote;
        rootScope.$emit('noteDeleted', 'somethingElseThatWouldNotHaveEverBeenLoadedInitially');
        expect(mockNoteRepository.get).not.toHaveBeenCalled();
        expect(scope.currentNote).toBe(initialNote);
    });

});
