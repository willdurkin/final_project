$(document).ready(function(){


//play button
	$('.play').click(function(){

		var self = $(this);
		var el = self.next();
		var songName = el.find('.song_name');
		var artistName = el.find('.artist_name');
		var songId = el.attr('data-id');

		addSong( songName, artistName, songId );

		return false;
	});

	//play button functions
	function addSong( songName, artistName, songId ){
		console.log( songName, artistName );
		var songItem = 
			$('<div class="song_item">'+
				'<div class="song_info">'+
             		artistName.html()+songName.html()+
             	'</div>'+
         		'<div class="play_progress"></div>'+
         	'</div>');
         	
		songItem.css({
			position: 'relative',
			top: '1000px'
		});

		var playerCol = $('#player_col');
		var isEmpty = 0;
		if ( playerCol.children().length == 0 ) isEmpty = 1;

		playerCol.append( songItem );

		if ( isEmpty ) {
			songItem.addClass('selected_song_item'); 
			var myArgs = {
				videoId: songId
				, wrapperId: 'ytapiplayer' 
				, callback: function( self ) {
					
					$(document).on( 'youtubereadytoplay', function() {
						mytp.handlePlayPause()
						});
				}
			};
			mytp = new YTP( myArgs );

			mytp.init();
		}

		animateSong( songItem );

		songItem.click( function() {
			updateSelectedSongItem( $(this) );
		});
	}

	function updateSelectedSongItem( songItem ) {
		$('.song_item').removeClass('selected_song_item');
		songItem.addClass('selected_song_item');

		//initialize playback of selected song item
		songItem.init();
	}

	function animateSong( el ){
		$( el ).animate({top: '0px'});
	}

	//next button
	$('#skip_forward').click(function(){
		goPrevOrNext( 1 );
	});
	
	//back button
	$('#skip_back').click(function(){
		goPrevOrNext( 0 );
	});

	// stromae - racine carree
	function goPrevOrNext( flag ) {
		// if flag == 1, then go next
		// if flag == 0, then go prev
		// select the selected song item
		var selected = $('.selected_song_item');
		// if no songItem selected, exit
		if ( selected.length == 0 ) return false;

		var song;
		if ( flag ) {
			// since we are going to the next song, find the next sibling
			song = selected.next();
		} else if ( !flag ) {
			// since we are going to the prev song, find the prev sibling
			song = selected.prev();
		}
		// if song does not exit, we are at the last/first song...do nothing
		if ( song.length == 0 ) return false;
		// if we made it here, there is a next song available and we have selected it
		updateSelectedSongItem( song );
	}	

	//clear button
	$('#clear').click(function(){
		$('#playlist_area').empty();
	})

//vote functionality
	
	$('.upvote').click(function(){
		$(this).find('img').attr({ src: "images/skull_guy_turq.png"});	
	})

	//failed voting functionality, toggle function makes icon simply disappear

	// $('.vote_icon').toggle(
	// 	function(){
	// 	$(this).html('<img src="images/skull_guy_turq.png"/>');	
	// 	}, 
	// 	function(){
	// 	$(this).html('<img src= "images/skull1.png"/>');
	// 	});	

//genre nav selectors
	$('li.parent_genre a').click(function(e){
        e.preventDefault(); // prevent the default action
        e.stopPropagation(); // stop the click from bubbling
        $(this).closest('ul').find('.selected_genre').removeClass('selected_genre');
        $(this).parent().addClass('selected_genre');
	})

//table hover
	$('#tableBody tr').mouseenter(function(){
		$(this).find('.miniPlay').css('visibility', 'visible');
	})
	$('#tableBody tr').mouseleave(function(){
		$(this).find('.miniPlay').css('visibility', 'hidden');
	})

	$('#tableHeader th').click(function(e){
        e.preventDefault(); // prevent the default action
        e.stopPropagation(); // stop the click from bubbling
        $('#tableHeader').find('.library_nav_selected').removeClass('library_nav_selected');
        $(this).addClass('library_nav_selected');
	})
})//end of document




/*
//submit song AJAX POST request

$('#submit_button').click(function(){
	var songObj = {
		url: $('#url_input').val()
		, artist: $('#artist_input').val()
		, song: $('#song_input').val()
		, genre: $('#genre_input').val()
	}
	submitSong( songObj );
// name -> songObj.song
// artist -> songObj.artist

	function loadSong( data ){
		//load the submitted song to the site's frontend
	}

	function submitSong( songObj ){
		var url = 'http://search.twitter.com/search.json'; //taqqui's server
	    var parameter = { name: songObj.song, artist: songObj.artist };
	    jQuery.ajax({
	    	type: POST,
	        url: url,
	        data: parameter,
	        crossDomain: true,
	        dataType: 'jsonp',
	        success: loadSong
	}


	}
})

//play song, load song icon AJAX GET request

$('.play').click(function(){
	$('.selected_song_item').show()
})

*/