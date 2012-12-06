// Generated by CoffeeScript 1.4.0
(function() {
  var loadNote, resizeSource, saveNote, updateHTML, updateSource;

  resizeSource = function() {
    $('#source').width($('#html').width());
    if ($('#source').height() < $('#html').height()) {
      return $('#source').height($('#html').height());
    }
  };

  updateHTML = function() {
    var converter;
    converter = new Showdown.converter();
    $('#html').html(converter.makeHtml($('#source').val()));
    return $('#html code').each(function(i, e) {
      return hljs.highlightBlock(e);
    });
  };

  updateSource = function() {
    resizeSource();
    return $('#source').val(HTML2Markdown($('#html').html()));
  };

  saveNote = function() {
    return localStorage.setItem('note', JSON.stringify({
      html: $('#html').html(),
      md: $('#source').val()
    }));
  };

  loadNote = function() {
    var note;
    note = JSON.parse(localStorage.getItem('note'));
    $('#html').html(note.html);
    return $('#source').val(note.md);
  };

  $(document).ready(function() {
    loadNote();
    $('#switchButton').toggle(function() {
      updateSource();
      return $('#html').fadeOut('fast', function() {
        return $('#source').fadeIn('fast');
      });
    }, function() {
      return $('#source').fadeOut('fast', function() {
        updateHTML();
        return $('#html').fadeIn('fast');
      });
    });
    $('#source').blur(function() {
      updateHTML();
      return saveNote();
    });
    return $('#html').blur(function() {
      updateSource();
      return saveNote();
    });
  });

  Aloha.settings.sidebar = {
    disabled: true
  };

  Aloha.ready(function() {
    Aloha.jQuery('#html').aloha();
    return null;
  });

}).call(this);
