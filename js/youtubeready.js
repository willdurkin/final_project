var mytp;

	$('#submit').click(function(){
		$('#submit_body').css('visibility', 'visible')
	})

function onYouTubePlayerReady(playerid) {
	var player = document.getElementById( 'ytapiplayer' );

	console.log( player );

	mytp.handlePlayPause();

	document.getElementById('ytapiplayer').addEventListener( 'onStateChange', "test");
	function test( newState ) {
		alert( newState )
	}

	

	$(document).trigger('youtubereadytoplay');
}

