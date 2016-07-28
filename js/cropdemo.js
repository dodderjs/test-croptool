/*global define*/
define([
	'jquery',
	'jcrop'
], function ($, jcrop) {

	var CropTool = function (container) {
			this.container = $(container);
			
			this.$preview = $(
				'<div class="preview-pane">' +
					'<div class="preview-container">' +
						'<img src="" class="jcrop-preview" alt="Preview" />' +
					'</div>'+
				'</div>');
			this.$img = this.container.find('img').eq(0);
			this.$preview.find('img').attr('src', this.$img.attr('src'));

			this.jcrop_api = jcrop(this.$img, {
				boxWidth: 1280, 
				boxHeight: 426,
				//minSize: [2560, 852],
				minSize: [ 1280, 426 ],
				setSelect: [0,0,1280,426],
				onChange: this.updatePreview.bind(this),
				onSelect: this.updatePreview.bind(this),
				aspectRatio: 640 / 213
			});
			this.bound();
			this.updatePreview({ x: 0, y: 0, w: 1280, h: 426 });
		}

	CropTool.prototype.bound = function () {
		// Use the API to get the real image size
		var bounds = this.jcrop_api.getBounds();
		this.boundx = bounds[0];
		this.boundy = bounds[1];

		// Move the preview into the jcrop container for css positioning
		this.$preview.appendTo(this.jcrop_api.ui.holder);
		
		this.xsize = this.$preview.find('.preview-container').width();
		this.ysize = this.$preview.find('.preview-container').height();
	}


	CropTool.prototype.updatePreview = function (c) {
		if (parseInt(c.w) > 0) {
			var rx = this.xsize / c.w;
			var ry = this.ysize / c.h;

			this.$preview.find('.preview-container img').css({
				width: Math.round(rx * this.boundx) + 'px',
				height: Math.round(ry * this.boundy) + 'px',
				marginLeft: '-' + Math.round(rx * c.x) + 'px',
				marginTop: '-' + Math.round(ry * c.y) + 'px'
			});
		}
	}

	CropTool.prototype.destroy = function () {
		this.jcrop_api.destroy();
	}

	return CropTool;
});