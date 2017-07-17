<?php
/*
Plugin Name: Themes4WP Youtube External Subtitles
Plugin URI: http://themes4wp.com/
Description: Allows you add external subtitle to Youtube videos. Use shortcode [youtube-subtitles id="" sub="" width="640" height="360"] (id = youtube ID, sub = subtitle URL)
Version: 1.0
Author: Themes4WP
Author URI: http://themes4wp.com/
License: GPLv2
*/

 

add_action('init', 'twp_youtube_subtitles_script');
add_action('wp_footer', 'twp_youtube_subtitles_print_script'); 

function twp_youtube_subtitles_script() { 
    wp_register_script('twp_youtube_js', plugins_url('js/youtube.external.subtitle.js', __FILE__), array('jquery'), '1.0', true);
		wp_register_script('twp_youtube_parser_js', plugins_url('js/subtitles.parser.js', __FILE__), array('jquery'), '1.0', true);
		wp_register_script('twp_youtube_loader_js', plugins_url('js/subtitles.loader.js', __FILE__), array('jquery'), '1.0', true);
}

function twp_youtube_subtitles_print_script() {
	global $twp_youtube_script;

	if ( ! $twp_youtube_script )
		return;

	wp_print_scripts('twp_youtube_js');
	wp_print_scripts('twp_youtube_parser_js');
	wp_print_scripts('twp_youtube_loader_js');
}



add_shortcode('youtube-subtitles', 'twp_youtube_subtitles_shortcode');

function twp_youtube_subtitles_shortcode($atts) {
	global $twp_youtube_script;

	$twp_youtube_script = true;

	extract(shortcode_atts(array(
      'id' => '',
      'sub' => '',
      'width' => '640',
      'height' => '360',
   ), $atts));
   
   $return_string = '<div class="youtube-subtitles" data-subtitle-url="' . esc_url( $sub ) . '">';
   $return_string .= '<iframe id="video" width="' . absint( $width ) . '" height="' . absint( $height ) . '" src="https://www.youtube.com/embed/' . $id . '" frameborder="0" allowfullscreen="true"></iframe>';
   $return_string .= '</div>';
   
   return $return_string;
}





