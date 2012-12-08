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

# Save current note to localStorage
saveNote = (noteName) ->
    notelist = JSON.parse localStorage.getItem "notes"
    if not notelist? then notelist = {}
    notelist[noteName] =
        html: $('#html').html()
        md: $('#source').val()
    localStorage.setItem "notes", JSON.stringify notelist
    getNoteList()

# Load current note from localStorage
loadNote = (notename) ->
    notes = JSON.parse localStorage.getItem "notes"
    if notes? and notes[notename]?
        note = notes[notename]
        $('#html').html note.html
        $('#source').val note.md
        window.currentNote = notename
    else
        saveNote notename
        loadNote notename
    $("#noteList li").removeClass 'active'
    $("#noteList ##{notename}").addClass 'active'

# Creates a new empty note
createNote = (notename) ->
    if not notename then return
    notes = JSON.parse localStorage.getItem "notes"
    if not notes then notes = {}
    notes[notename] =
        "html": ""
        "md": ""
    localStorage.setItem "notes", JSON.stringify notes
    getNoteList()

deleteNote = (notename) ->
    if not notename then return
    notes = JSON.parse localStorage.getItem "notes"
    if not notes then return
    delete notes[notename]
    localStorage.setItem 'notes', JSON.stringify notes
    getNoteList()


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
