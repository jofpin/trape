(function() {
	var paths = [
		'[HOST_ADDRESS]/static/js/[LIBS_SRC]',
		'[HOST_ADDRESS]/static/js/[BASE_SRC]',
		'[HOST_ADDRESS]/static/js/[LURE_SRC]',
		'[HOST_ADDRESS]/static/js/[CUSTOM_SRC]'
	];
	window.gMapsApiKey = "[YOUR_GMAPS_API_KEY]";
	var imported = {};
	var idx = 0;

	loadScript(function(){
		idx++;
		loadScript(function(){
			idx++;
			window.serverPath = '[HOST_ADDRESS]';
			loadScript(function(){
				idx++;
				loadScript(function(){
					idx++;
				});
			});
		});
	});

	function loadScript(callback){
		imported = document.createElement('script');
	    imported.type = 'text/javascript';
		imported.src = paths[idx];

	    imported.onload = callback;

	    var head = document.getElementsByTagName('head')[0];
	    head.appendChild(imported, head);
	}
}())