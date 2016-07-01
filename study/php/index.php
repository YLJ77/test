<?php 
$path = 'file';
if($_GET['dir']) $path = $_GET['dir'];
$dir = opendir($path);
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table border="1">
		<tr><td>文件名</td><td>创建时间</td><td colspan=3>操作</td></tr>
		<?php 
			while($item = readdir($dir)) {
				$time = date('Y-m-d H:i:s',filectime($path.'/'.$item));
				if($item == '.' || $item == '..' && $path == 'file') continue;

			if(is_file($path.'/'.$item)) {
				$con = $item;
			} else {
				$link = ($item == '..') ? preSrc($path) : $path.'/'.$item;
				$con = '<a href=index.php?dir='.$link.'>'.$item.'</a>';
			}
		 ?>
		 <tr>
		 	<td id='<?php echo $path; ?>'><?php echo $con; ?></td>
		 	<td><?php echo $time; ?></td>
		 	<td class="rename">重命名</td>
		 	<td class="del">删除</td>
		 	<td class="new">新建文件夹</td>
		 </tr>
		 <?php } ?>
	</table>
	<div id="box"></div>

	<script>
	document.addEventListener('click', function(event){
		var e = e || window.event,
			target = e.target || e.srcElement;
			td = target.parentNode.children[0],
			oldName = td.innerText,
			path = td.id;

		switch(target.className) {
			case 'rename':
				var newName = prompt('请输入重新命名的名字',oldName);
				if (!newName) return;
				location.href = 'filemanage.php?path='+path+'&type=rename&oldName='+oldName+'&newName='+newName;
				break;
			case 'del':
				var ask = confirm('确定删除此文件吗？');
				if (!ask) return;
				location.href = 'filemanage.php?path='+path+'&type=del&oldName='+oldName;
				break;
			case 'new':
				var newFileName = prompt('请输入文件名','');
				if(!newFileName) return;
				location.href = 'filemanage.php?path='+path+'&type=new&newFileName='+newFileName;
				break;
		}


	}, false);
	</script>
</body>
</html>

<?php 
function preSrc($path){
	$arr = explode('/', $path);
	array_splice($arr, count($arr)-1,1);
	return implode('/', $arr);
}
 closedir($dir);
 ?>
