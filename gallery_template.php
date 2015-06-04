<style type='text/css'>
	#gallery-<?php echo $instance; ?> {
		margin: auto;
	}
	#gallery-<?php echo $instance; ?> .gallery-item {
		float: left;
		margin-top: 10px;
		text-align: center;
		width: 33%;
	}
	#gallery-<?php echo $instance; ?> img {
		border: 2px solid #cfcfcf;
	}
	#gallery-<?php echo $instance?> .gallery-caption {
		margin-left: 0;
	}
</style>

<div id='gallery-<?php echo $instance; ?>' class='gallery galleryid-<?php echo $gallery_atts['id']; ?> gallery-columns-3 gallery-size-thumbnail'>
	<?php foreach($images as $image) { ?>
	<dl class='gallery-item'>
		<dt class='gallery-icon landscape'>
			<a href='#'><img width="150" height="150" data-width="<?php echo $image->guid_dimensions[0]; ?>" data-height="<?php echo $image->guid_dimensions[1]; ?>" src="<?php echo $image->thumbnail?>" data-full-image="<?php echo $image->guid; ?>" class="attachment-thumbnail" alt="Test image" aria-describedby="gallery-<?php echo $instance?>-<?=$image->ID; ?>" /></a>
		</dt>
		<dd class='wp-caption-text gallery-caption' id='gallery-<?php echo $instance?>-<?php echo $image->ID; ?>'>
		<?php echo $image->post_excerpt?>
		</dd>
	</dl>
	<?php } ?>
	<br style='clear: both' />
</div>