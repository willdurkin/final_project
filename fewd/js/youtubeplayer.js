
// youtube player handler
function YTP( ytpArgs ) {
	var self = this;

	// TODO: write a function that generalizes this
	if ( typeof	ytpArgs == "undefined" ) {
		console.log( "ERROR: no arguments given" );
		return;
	}

	if ( typeof ytpArgs.videoId == "undefined" ) {
		console.log( "ERROR: no video id" );
		return;
	}
	else self.vId = ytpArgs.videoId;

	// TODO: check if wrapperId is in the document as well
	if ( typeof ytpArgs.wrapperId == "undefined" ) {
		console.log( "ERROR: no wrapper id" );
		return;
	}
	else self.wId = ytpArgs.wrapperId;

	if ( typeof params == "undefined" ) {
		console.log( "ERROR: params for SWFObject.js not defined");
		return;
	}

	if ( typeof ytpArgs.videoWidth == "undefined" ) self.vWidth = "425";
	else self.vWidth = ytpArgs.videoWidth;

	if ( typeof ytpArgs.videoHeight == "undefined" ) self.vHeight = "356";
	else self.vHeight = ytpArgs.videoHeight;

	if ( typeof ytpArgs.callback != "undefined" ) self.callbackOnVideoReady = ytpArgs.callback;
	else self.callbackOnVideoReady = function(){};
}

YTP.prototype = {
	init: function() {
		// METHOD: init all the necessary parts to get video loaded
		var self = this;

		console.log( self );

		self.wSel = '#'+self.wId;
		console.log( self )
		// set up the youtubeLoaded event
		self.onYoutubeLoaded();

		// call the embed code
		self.callEmbedSWF();
		
	}
	, onYoutubeLoaded: function() {
		// METHOD: sets up the functions that get called once the 
		// "youtubeLoaded" event is emitted
		var self = this;

		$(document).on( 'youtubeLoaded', function() {
				// select the video element
				self.el = document.getElementById( self.wId );
				self.eljQ = $( self.wSel );
		var ytplayer = document.getElementById('ytapiplayer');
		console.log( ytplayer )
				console.log( self.el );
				//self.el.hide();

				self.handlePlay();

		})
	}
	, eventCallback: function( newState ) {
		var self = this;
		alert( newState );
		self.callbackOnVideoReady( self );
	}
	, handlePlay: function() {
		// METHOD: gets called only when the youtubeloaded event is fired
		// binds the play button to click 
		var self = this;

		self.playButton = $('#play_button_nav');
		if ( !self.playButton.length ) return;

		self.isVideoPlaying = 0;
		self.playButton.on( 'click', function() {
			self.handlePlayPause();			
		});
	}

	, handlePlayPause: function() {
		var self = this;

		if ( typeof self.isFirst == "undefined" ) self.initSeeking();

		self.isFirst = 1;
		if ( self.isVideoPlaying == 0 ) {
			self.eljQ[0].playVideo();
			self.isVideoPlaying = 1;
			self.handleSeeking();
			// TODO: toggle pause pic
		}
		else {
			self.el.pauseVideo();
			self.isVideoPlaying = 0;
			self.handleSeeking();
		}
	}
	, handleSeeking: function() {
		// timer for seeking
		var self = this;

		self.seeking = setTimeout( function() {
			console.log( (self.eljQ[0].getCurrentTime()/self.totaltime)*22500 )
			self.pro.css('width', (self.eljQ[0].getCurrentTime()/self.totaltime)*22500+'px' );
		}, 1000 );
	}
	, initSeeking: function() {
		//METHOD: start or pause seeking for video
		var self = this;

		self.selectedSong = $('.selected_song_item');

		self.playerProg = self.selectedSong.find('.play_progress');
		self.pro = self.playerProg.find('.progress');

		self.totaltime = self.eljQ[0].getDuration();
		self.pro.css('width', '0px').css('height', '50px').css('background-color', 'green');
		console.log( self.totaltime )
	}
	, setVideoId: function( id ) {
		var self = this;
		self.vId = id;
	}
	, callEmbedSWF: function() {
		// METHOD: call the youtube api embed function
		// TODO: improve this to support multiple video ids
		// TODO: set it up so that lines 4 - 8 mean something + passed in to function
		var self = this;

		self.vSrc = "http://www.youtube.com/v/"+self.vId+"?enablejsapi=1&playerapiid=ytplayer&version=3",
		self.line4 = "8";
		self.line5 = null;
		self.line6 = null;
		self.line7 = params;
		self.line8 = { id: self.wId }
console.log( self.line7, self.line8 );
		swfobject.embedSWF(
			self.vSrc,
			self.wId,
			self.vWidth,
			self.vHeight,
			self.line4,
			self.line5,
			self.line6,
			self.line7,
			self.line8,
			function() {
				$(document).trigger('youtubeLoaded');
				//self.callbackOnVideoReady( self );
				
			}
		);

		
	}
}

/*
$(document).ready(function() {

		embedSWF( '4b-nxy4bSgU' );

		test();
});


function embedSWF( video_id ) {
	if ( video_id == "" ) return;
	 swfobject.embedSWF(
	 	"http://www.youtube.com/v/"+video_id+"?enablejsapi=1&playerapiid=ytplayer&version=3",
		"ytapiplayer", 
		"425", 
		"356", 
		"8", 
		null, 
		null, 
		params, 
		{ id: "ytapiplayer" },
		function( e ) {
			alert();
			console.log( "http://www.youtube.com/v/"+video_id+"?enablejsapi=1&playerapiid=ytplayer&version=3" );
		}
	);
}

// function onYouTubePlayerReady( playerId ) {
// 	var ytplayer = document.getElementById('ytapiplayer');

// 	console.log( ytplayer );

// }

function test() {

	function play() {

		var ytplayer = document.getElementById('ytapiplayer');
		if ( ytplayer ) {
			ytplayer.playVideo();
		}
	}

	$('#play_button').click( function() {
		play();
	});
}*/






