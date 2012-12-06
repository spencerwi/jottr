resizeSource = () ->
    $('#source').width $('#html').width()
    if $('#source').height() < $('#html').height()
        $('#source').height $('#html').height()

updateHTML = () ->
        converter = new Showdown.converter()
        $('#html').html converter.makeHtml $('#source').val()

updateSource = () ->
        $('#source').val HTML2Markdown $('#html').html()

saveNote = () ->
        localStorage.setItem 'note', JSON.stringify {
            html: $('#html').html()
            md: $('#source').val()
        }

loadNote = () ->
        note = JSON.parse localStorage.getItem 'note'
        $('#html').html note.html
        $('#source').val note.md

$(document).ready () ->
    loadNote()
    $('#switchButton').toggle () ->
            $('#html').fadeOut('slow')
            updateSource()
            resizeSource()
            $('#source').fadeIn('slow')
            return null
        , () ->
            $('#source').fadeOut('slow')
            updateHTML()
            $('#html').fadeIn('slow')
            return null
    

    $('#source').blur () ->
        updateHTML()
        saveNote()

    $('#html').blur () ->
        updateSource()
        saveNote()
