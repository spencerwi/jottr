jottrServices.service('markdownService', function(){
    var showdownConverter = new Showdown.converter();

    this.markdownToHtml = function(markdown){
        return showdownConverter.makeHtml(markdown);
    };

    this.htmlToMarkdown = function(html){
        return toMarkdown(html);
    };
})
