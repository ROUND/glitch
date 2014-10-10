html2canvas(document.body, {
  onrendered: function(canvas) {
    document.body.appendChild(canvas).setAttribute('id', 'original');
    // Getting both canvases + drawing contexts
		var canvas_one = document.getElementById('original');
		var ctx_1 = canvas_one.getContext( '2d' );

		// Storing canvas dimensions
		var canvas_width = canvas_one.clientWidth;
		var canvas_height = canvas_one.clientHeight;

		var canv = document.createElement('canvas');
		document.body.appendChild(canv).setAttribute('id', 'glitched'); // adds the canvas to the body element
		document.getElementById('glitched').setAttribute('width', canvas_width);
		document.getElementById('glitched').setAttribute('height', canvas_height);
		var canvas_two = document.getElementById('glitched');
		var ctx_2 = canvas_two.getContext( '2d' );

		// Getting the image data from canvas one
		var image_data_1 = ctx_1.getImageData(0, 0, canvas_width, canvas_height);

		// Glitch the image data (passing drawImageDataInCanvasTwo as a callback function)
		var parameters = { amount: 1, seed: 15, iterations: 3, quality: 20 };
		glitch( image_data_1, parameters, drawImageDataInCanvasTwo );

		// Put the glitched image data on canvas two
		function drawImageDataInCanvasTwo(image_data) {
			ctx_2.putImageData( image_data, 0, 0 );
		}
    document.body.removeChild(document.getElementById('original'));
  }
});