describe('markdownService', function(){

    beforeEach(angular.mock.module('jottr.services'));

    it("should be able to convert markdown to HTML", inject(['markdownService', 
        function(markdownService){
            var expected = '<h2 id="helloworld">Hello world!</h2>';
            var actual = markdownService.markdownToHtml("## Hello world!");

            expect(actual).toBe(expected);
        }
    ]));

    it("should be able to convert HTML to markdown", inject(['markdownService',
        function(markdownService){
            var expected = "## Hello world!";
            var actual = markdownService.htmlToMarkdown('<h2>Hello world!</h2>')

            expect(actual).toBe(expected);
        }
    ]));
});
