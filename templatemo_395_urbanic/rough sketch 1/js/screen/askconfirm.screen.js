var d;
	
$(document).ready(function() {

	var date = new Date();
	var yy = date.getFullYear();
	var mm = ('0' + (date.getMonth() + 1)).slice(-2);
	var dd = ('0' + date.getDate()).slice(-2);
	d = yy + '' + mm + '' + dd;
	console.log(d);
});

$("#asksend").click(function(e) {
	e.preventDefault();
	var JSONdata = {};
	JSONdata['h'] = $("#custom_hashcode").val();
	$.ajax({
		type: 'post',
    	url: '/api/order/askconfirm',
		data : JSON.stringify(JSONdata),
        contentType: 'application/JSON',
        dataType : 'JSON',
        scriptCharset: 'utf-8',
        success: function(json){
        	window.location.href = '/asksend?h=' + json;
		}
	});
});