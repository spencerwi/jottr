jottrServices.service('noteRepository', function(){
    var doWithNotelist = function(callback){
        var rawNoteList = localStorage.getItem("notes");
        var noteList;
        if (rawNoteList == null){
            noteList = {}; 
        } else {
            noteList = JSON.parse(rawNoteList);
        }
        var result = callback(noteList);
        localStorage.setItem("notes", JSON.stringify(noteList));
        return result;
    }

    this.findAll = function() { 
        return doWithNotelist(function(noteList){ 
            return noteList; 
        });
    }
    this.get = function(name){ 
        return doWithNotelist(function(noteList){ return noteList[name]; });
    }
    this.save = function(note){ 
        if (note && note.name){
            doWithNotelist(function(noteList){ noteList[note.name] = note; });
        }
    };
    this.remove = function(note){ 
        if (note && note.name){
            doWithNotelist(function(noteList){ delete noteList[note.name]; });
        }
    }
});
