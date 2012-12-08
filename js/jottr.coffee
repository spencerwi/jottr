# Resize markdown view to be as tall and wide as the html view.
resizeSource = () ->
    $('#source').width $('#html').width()
    if $('#source').height() < $('#html').height()
        $('#source').height $('#html').height()

# Update the HTML view
updateHTML = () ->
        converter = new Showdown.converter()
        $('#html').html converter.makeHtml $('#source').val()
        # $('#html code').each (i,e) -> hljs.highlightBlock(e)

# Update the markdown view
updateSource = () ->
        resizeSource()
        $('#source').val HTML2Markdown $('#html').html()



# A "context" function that fetches the notelist, performs a given function, and
# saves the notelist.
with_notelist_do = (callback) ->
    notelist = JSON.parse localStorage.getItem "notes"
    if not notelist? then notelist = {}
    callback notelist
    localStorage.setItem "notes", JSON.stringify notelist
    getNoteList()

# Creates a new empty note
createNote = (noteName) ->
    noteName = noteName.replace /\s/g, "_"
    if not noteName then return
    with_notelist_do (notes) ->
        notes[noteName] =
            "html": ""
            "md": ""
    $('#newNoteName').val("")

# Reads a note from localStorage
loadNote = (notename) ->
    with_notelist_do (notes) ->
        if notes[notename]
            note = notes[notename]
            $('#html').html note.html
            $('#source').val note.md
            window.currentNote = notename
        else
            createNote notename
            loadNote notename

# Updates current note to localStorage
saveNote = (noteName) ->
    noteName = noteName.replace /\s/g, "_"
    with_notelist_do (notelist) ->
        notelist[noteName] =
            html: $('#html').html()
            md: $('#source').val()

# Deletes a note from localStorage
deleteNote = (notename) ->
    if not notename then return
    with_notelist_do (notes) ->
        delete notes[notename]


# Fetch list of notes from localStorage
getNoteList = () ->
    notes = JSON.parse localStorage.getItem "notes"
    console.log notes
    $('#noteList').empty()
    for own name of notes
        li = document.createElement('li')
        $(li).prop('id', name).text(name + " ")
        delBtn = document.createElement('button')
        $(delBtn).prop('id', "delete-#{name}").text("X").appendTo($(li))
        $(li).appendTo($('#noteList'))
        $(li).click () ->
            loadNote $(this).prop 'id'
        $(delBtn).click () ->
            deleteNote $(this).prop('id').replace /^delete-/, ""



# onReady function
$(document).ready () ->
    getNoteList()
    # Load note
    loadNote 'default'
    # Set the toggle event listener for the switcher button
    $('#switchButton').toggle () ->
            # Switch to markdown view
            updateSource()
            $('#html').fadeOut 'fast', () ->
                $('#source').fadeIn('fast')
        , () ->
            # Switch to HTML view
            $('#source').fadeOut 'fast', () ->
                updateHTML()
                $('#html').fadeIn('fast')
    
    # On blur of markdown view, update HTML view and save note
    $('#source').blur () ->
        updateHTML()
        saveNote(window.currentNote)

    # On blur of HTML view, update markdown view and save note
    $('#html').blur () ->
        updateSource()
        saveNote(window.currentNote)

    $('#newNoteBtn').click () -> createNote $('#newNoteName').val()
        

# Don't need the Aloha sidebar.
Aloha.settings.sidebar =
    disabled: true

# Aloha-ize the HTML view for easy editing.
Aloha.ready () ->
    Aloha.jQuery('#html').aloha()
    return null
