jQuery( document ).ready( function () {
  var httpRequest = new XMLHttpRequest();
  subtitle = jQuery( '.youtube-subtitles' );
  subtitle_id = subtitle.data( "subtitle-url" );
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
          var subtitles = parser.fromSrt(httpRequest.responseText, true);
  
          for (var i in subtitles) {
  			subtitles[i] = {
  				start : subtitles[i].startTime / 1000,
  				end   : subtitles[i].endTime / 1000,
  				text  : subtitles[i].text
  			};
  		}
  
          var youtubeExternalSubtitle = new YoutubeExternalSubtitle.Subtitle(document.getElementById('video'), subtitles);
      }
  };
  
  httpRequest.open('GET', subtitle_id, true);
  httpRequest.send(null);
} )