<?php

$path = $_GET[path];
$type = $_GET['type'];
$oldname = $path.'/'.$_GET['oldName'];
$newname = $path.'/'.$_GET['newName'];
$newFileName = $path.'/'.$_GET['newFileName'];

echo 'path: '.$path.'<br>type: '.$type.'<br>newname: '.$newname.'<br>oldname: '.$oldname.'<br>newFileName'.$newFileName.'<br><br>';

if($type == 'rename' && file_exists($oldname)) {
	rename($oldname, $newname);
  reload($path);
} else if($type == 'del' && file_exists($oldname)) {
	if(is_file($oldname)) {
		$flag = unlink($oldname);
	} else {
		$flag = deltree($oldname);
	}
  if($flag) reload($path);
	
} else if($type == 'new') {
	mkdir($newFileName);
  reload($path);
}




function reload($path){
  echo "<script>location.href='index.php?dir={$path}'</script>";
}

function deltree($file) {
  $handle = opendir($file);
  while ($item = readdir($handle)) {
    if($item == '.' || $item == '..') {
      continue;
    }
    if(is_file($file.'/'.$item)) {
      unlink($file.'/'.$item);
    } else {
      deltree($file.'/'.$item);
    }
  }
  closedir($handle);
  return rmdir($file);
}



?>