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


var MarkupEditor = {};

MarkupEditor.load = function (container){
	//console.log("load marked")
	//console.log(container)
}