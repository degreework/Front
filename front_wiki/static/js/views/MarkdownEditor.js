var MarkdownEditor = {};

MarkdownEditor.load = function (container) {
	$(container).markdownEditor({
		preview: true,
		height: 100,
        onPreview: function (content, callback) {
            callback( marked(content) );
        }
    });
}