var d;
var validator;
$(document).ready(function() {

	var date = new Date();
	var yy = date.getFullYear();
	var mm = ('0' + (date.getMonth() + 1)).slice(-2);
	var dd = ('0' + date.getDate()).slice(-2);
	d = yy + '' + mm + '' + dd;
	console.log(d);
	validator = $("#askform").validate();
	v = validator.form();
	//console.log(v);
	if(v==true){
	    $('#confirmask').removeAttr("disabled");
	}else{
		$('#confirmask').attr('disabled', true);
	}
});

$("#confirmask").click(function(e) {
	e.preventDefault();
	console.log("confirm order");
	//$("#estimation").val(JSON.stringify(gJson));
	//$("#amount").val(gJson["totals"]);
	//$("#currency").val("USD");
	$("#askform").ajaxSubmit({
		success: function(data){
			//alert('success!');
			window.location.href = '/askconfirm?h=' + $("#hashcode").val();
		},
		dataType: "json"
	});
	return false;
});

$("#contact_company,#contact_dept,#contact_name,#contact_postcode,#contact_address,#contact_tel,#contact_email").keyup(function() {
	validation_local();
});

function validation_local(){
	v = validator.form();
	//console.log(v);
	if(v==true){
	    $('#confirmask').removeAttr("disabled");
	}else{
		$('#confirmask').attr('disabled', true);
	}
}