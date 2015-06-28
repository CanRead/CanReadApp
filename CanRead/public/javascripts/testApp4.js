(function() {
	var texts = {};
	texts.text1 = {"url" : "http://sdk.spritzinc.com/sampleText/HelloWorld.html"};
	texts.text2 = {"url" : "http://sdk.spritzinc.com/sampleText/WilburWrightLetter.html"};
	
	var currentTextInfo = null;  

	function isAutoStartEnabled() {
		return $('#autoStartOption').prop('checked');
	}
	
	function onFetchSuccessController(spritzText) {
		if (currentTextInfo != null) {
			console.log("Saved " + currentTextInfo.url + " to cache");
			currentTextInfo.text = spritzText;
		}
		
		if (isAutoStartEnabled()) {
			startSpritzing(spritzText);
		} else {
			setSpritzText(spritzText);
		}
	};
	
	function onFetchError(error) {
		alert("Unable to Spritz: " + error.message);
	};
	
	function onTextSelected(event) {
		var name = $(this).attr('id');
		
		// Stop the current spritzing
		stopSpritzing();
		
		if (name === '') {
			setSpritzText(null);
		} else {
			var info = texts[name];
			
			if (typeof(info.text) === "undefined") {
				console.log("Loading " + info.url + " from API server");
				currentTextInfo = info;
				SpritzClient.fetchContents(info.url, onFetchSuccessController, onFetchError);
			} else {
				console.log("Loaded " + info.url + " from cache");
				info.text.reset();	// Reset the current position
				
				if (isAutoStartEnabled()) {
					startSpritzing(info.text);
				} else {
					setSpritzText(info.text);
				}
			}
		}
	};
	
	function onDocSelected(unit) {
		console.log(unit);
		var name = unit;
		
		// Stop the current spritzing
		stopSpritzing();
		
		if (name === '') {
			setSpritzText(null);
		} else {
			var info = name;
			
			if (typeof(info.text) === "undefined") {
				console.log("Loading " + info.url + " from API server");
				currentTextInfo = info;
				SpritzClient.fetchContents(info.url, onFetchSuccessController, onFetchError);
			} else {
				console.log("Loaded " + info.url + " from cache");
				info.text.reset();	// Reset the current position
				
				if (isAutoStartEnabled()) {
					startSpritzing(info.text);
				} else {
					setSpritzText(info.text);
				}
			}
		}
	};

	function setSpritzText(spritzText) {
		// Pull the SpritzerController from this spritzer element and call setSpritzText
		$("#spritzer").data("controller").setSpritzText(spritzText);
	};
	
	/**
	 * Start spritzing
	 */
	function startSpritzing(spritzText) {
		// Pull the SpritzerController from this page's spritzer container and call start 
		$("#spritzer").data("controller").startSpritzing(spritzText);	
	};
	
	function stopSpritzing(spritzText) {
		// Pull the SpritzerController from this page's spritzer container and call stop 
		$("#spritzer").data("controller").stopSpritzing();	
	};
	
	function init() {
		// Add selection handler
		$("#textList a").on("click", onTextSelected);

		// Construct a SpritzController and attach it to this page's "spritzer" container
		spritzController = new SPRITZ.spritzinc.SpritzerController({placeholderText:{startText:'Select Text'}}).attach($("#spritzer"));
	};
	

	$(document).ready(function() {
		init();
	});
})();