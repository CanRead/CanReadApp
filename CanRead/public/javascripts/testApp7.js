(function() {
	var spritzController = null;

	var onSpritzifySuccess = function(spritzText) {
		spritzController.startSpritzing(spritzText);
	};
	
	var onSpritzifyError = function(error) {
		alert("Unable to Spritz: " + error.message);
	};
	
    function clearTextClick() {
        $("#inputText").val("");
    }
    
    function fillTextClick() {
    	var testText = "Spritzing content from the web is also easy. All you need to do is publish content on the web, "
    		+ " and our platform can transform it into Spritz Text. The default configuration simply extracts all text " 
    		+ "from the HTML at the target URL, but advanced configuration allows finer control using CSS-like selectors.";    		
    	var text = $("#inputText").val();   	
        $("#inputText").val(text + (text != "" ? "\n" : "") + testText);
    }

	function onStartSpritzClick(event) {
		var text = $('#inputText').val();
		var locale = "en_us;";
		
		// Send to SpritzEngine to translate
		SpritzClient.spritzify(text, locale, onSpritzifySuccess, onSpritzifyError);
	};
	
	
	// Customized options
	var customOptions = {
            placeholderText:    { startText: '' },
			redicleWidth: 	    434,	// Specify Redicle width
			redicleHeight: 	    76		// Specify Redicle height
	};

	var init = function() {
		
		$("#clear").on("click", clearTextClick);
		$("#fill").on("click", fillTextClick);
		$("#startSpritz").on("click", onStartSpritzClick);			
		 
 		// Construct a SpritzController passing the customization options
 		spritzController = new SPRITZ.spritzinc.SpritzerController(customOptions);
 		
 		// Attach the controller's container to this page's "spritzer" container
 		spritzController.attach($("#spritzer"));
	};
	
	$(document).ready(function() {
		init();
	});

	
})();