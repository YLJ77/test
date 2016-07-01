$(function() {
	$('#search_button').button({
		// disabled:true,
		label:'search',
		icons:{
			primary: 'ui-icon-search',
			secondary: 'ui-icon-triangle-1-s'
		},
		text:false
	});

	// $('#search_button').button('disable');

	$('#reg').dialog({
		title:'知问注册',
		buttons: {
			'提交': function(){},
			'取消': function(){
				$(this).dialog('close');
			}
		},
		// position: 'left top'
		show:true,
		hide:true,
		autoOpen : true,
		// modal:true,
		drag: function(e, ui) {
			console.log('top: '+ui.position.top+' left: '+ui.position.left);
		},
		width:320,
		height:340
	});

	$('#reg_a').click(function() {
		$('#reg').dialog('open');
	});

	// $('#reg input[type=radio]').button();
	// $('#reg').buttonset();

	$('#reg').buttonset();
	$('#date').datepicker({
		dateFormat: 'yy-mm-dd',
		altField:'#test',
		showWeek: true
	});
	$('#reg input[title]').tooltip({
		position: {
			my : 'left top',
			at : 'right top'
		},
		content:'change content',
		tooltipClass: '',
		// track: true
	});

	var host = ['aa', 'aaa', 'aaaaaa', 'bbb']
	$('#email').autocomplete({
		// source: host,
		source : function(request, response) {
			var hosts = ['qq.com', '163.com', 'sina.com.cn', 'gmail.com', 'hotmail.com'];
				term = request.term,
				name = term,
				host = '',
				ix = term.indexOf('@'),
				result = [];

			result.push(term);

			if (ix > -1) {
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}

			if (name) {
				var findedHosts = (host ? $.grep(hosts, function(value, index) {
						return value.indexOf(host) > -1;
					}) : hosts);
				findedHosts = $.map(findedHosts, function(value, index) {
					return name + '@' + value;
				});
			}
			response(result.concat(findedHosts));
		},
		// minLength: 2,
		delay: 0,
		autoFocus: true,
		/*response : function(e, ui) {
			alert(ui.content);
		}*/
	});
});