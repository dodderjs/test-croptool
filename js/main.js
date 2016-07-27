require.config({
	shim: {
		jcrop: {
			deps: [ 'jquery' ],
			exports: '$.Jcrop'
		}
	},
	paths: {
		jquery: './jquery.min',
		jcrop: './jquery.Jcrop'
	}
});

require(['jquery', 'cropdemo', 'uploaddemo'], 
	function ($, cropdemo, uploaddemo) {
		var cp1 = new cropdemo('#target .imageCrop');

		var upload= new uploaddemo('#target2');
	}
);