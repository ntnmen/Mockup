var d;
var validator;
$(document).ready(function() {

	var date = new Date();
	var yy = date.getFullYear();
	var mm = ('0' + (date.getMonth() + 1)).slice(-2);
	var dd = ('0' + date.getDate()).slice(-2);
	d = yy + '' + mm + '' + dd;
	console.log(d);
	validator = $("#orderform").validate();
	v = validator.form();
	//console.log(v);
	if(v==true){
	    $('#confirmorder').removeAttr("disabled");
	}else{
		$('#confirmorder').attr('disabled', true);
	}
});

$("#confirmorder").click(function(e) {
	e.preventDefault();
	console.log("confirm order");
	//$("#estimation").val(JSON.stringify(gJson));
	//$("#amount").val(gJson["totals"]);
	//$("#currency").val("USD");
	$("#orderform").ajaxSubmit({
		success: function(data){
			//alert('success!');
			window.location.href = '/confirm?h=' + $("#hashcode").val();
		},
		dataType: "json"
	});
	return false;
});

$("#sameascontact").click(function(e) {
	//e.preventDefault();
	if($("#sameascontact").prop('checked')){
		console.log("check");
		$("#billing_company").attr('disabled', true);
		$("#billing_dept").attr('disabled', true);
		$("#billing_name").attr('disabled', true);
		$("#billing_postcode").attr('disabled', true);
		$("#billing_address").attr('disabled', true);
		$("#billing_tel").attr('disabled', true);
		$("#billing_fax").attr('disabled', true);
		$("#billing_email").attr('disabled', true);
	}else{
		console.log("uncheck");
		$("#billing_company").attr('disabled', false);
		$("#billing_dept").attr('disabled', false);
		$("#billing_name").attr('disabled', false);
		$("#billing_postcode").attr('disabled', false);
		$("#billing_address").attr('disabled', false);
		$("#billing_tel").attr('disabled', false);
		$("#billing_fax").attr('disabled', false);
		$("#billing_email").attr('disabled', false);
	}
	validation_local();
});

$("#contact_company,#contact_dept,#contact_name,#contact_postcode,#contact_address,#contact_tel,#contact_email,#billing_company,#billing_dept,#billing_name,#billing_postcode,#billing_address,#billing_tel,#billing_email,#signer_company,#signer_address,#signer_name_rep,#signer_title_rep").keyup(function() {
	validation_local();
});

function validation_local(){
	v = validator.form();
	//console.log(v);
	if(v==true){
	    $('#confirmorder').removeAttr("disabled");
	}else{
		$('#confirmorder').attr('disabled', true);
	}
}