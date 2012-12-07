# Resize markdown view to be as tall and wide as the html view.
resizeSource = () ->
    $('#source').width $('#html').width()
    if $('#source').height() < $('#html').height()
        $('#source').height $('#html').height()

# Update the HTML view
updateHTML = () ->
        converter = new Showdown.converter()
        $('#html').html converter.makeHtml $('#source').val()
        $('#html code').each (i,e) -> hljs.highlightBlock(e)

# Update the markdown view
updateSource = () ->
        resizeSource()
        $('#source').val HTML2Markdown $('#html').html()

# Save current note to localStorage
saveNote = () ->
        localStorage.setItem 'note', JSON.stringify {
            html: $('#html').html()
            md: $('#source').val()
        }

# Load current note from localStorage
loadNote = () ->
        note = JSON.parse localStorage.getItem 'note'
        if note?
            $('#html').html note.html
            $('#source').val note.md

# onReady function
$(document).ready () ->
    # Load note
    loadNote()
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
        saveNote()

    # On blur of HTML view, update markdown view and save note
    $('#html').blur () ->
        updateSource()
        saveNote()

# Don't need the sidebar.
Aloha.settings.sidebar =
    disabled: true

# Aloha-ize the HTML view for easy editing.
Aloha.ready () ->
    Aloha.jQuery('#html').aloha()
    return null
