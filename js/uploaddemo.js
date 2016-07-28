/*global define*/
define([
	'jquery',
	'cropdemo'
], function ($, cropdemo) {
	var uploader = function (container) {
		this.croptool = null;	
		this.container = $(container);
		this.$input = this.container.find('input[type="file"]');
		this.$img = this.container.find('#' + this.$input.attr('data-bound'));
		this.$preview = this.container.find('.preview-pane');

		this.$input.on('change', this.hasFile.bind(this));
	};

	uploader.prototype.hasFile = function (e) {
		if (e.target.files.length) {
			try {
				this.readFile(e.target.files[0]);
			} catch (err) {
				console.log(err);
			}
		}
	},

	uploader.prototype.readFile = function (file) {
		var reader;
		if (file.type.indexOf('image') < 0) {
			throw new Error('Not an image')
		}

		reader = new FileReader();
		reader.addEventListener('load', this.onFileRead.bind(this, reader, file), false);
		reader.readAsDataURL(file);
	},

	uploader.prototype.onFileRead = function (reader, file, e) {
		var result = e.target.result, img = null;

		if (this.croptool) {
			this.croptool.destroy();
		}

		img = this.container.find('#' + this.$input.attr('data-bound'));
		if (!img.length) {
			var image = new Image();
			image.id = this.$input.attr('data-bound');
			this.container.append($(image));
			this.$img = this.container.find('#' + this.$input.attr('data-bound'));
		}
		this.$img.attr('src', result);
		this.croptool = new cropdemo(this.container);
	}

	return uploader;
});