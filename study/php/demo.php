<?php
	var_dump($_FILES);
	if (!file_exists('upload/boom')) {
		mkdir('upload/boom');
	}

	if($_FILES['file']['type'] == 'image/png'  && $_FILES['file']['error'] == 'int(0)') {
		if(is_uploaded_file($_FILES['file']['tmp_name'])) {
			$ori = $_FILES['file']['tmp_name'];
			$dest = 'upload/boom/'.$_FILES['file']['name'];
			move_uploaded_file($ori, $dest);
		}
	} else{
		echo 'Warning: only png file can be uploaded!!';
	}
?>