var gJson;
var d;
var validator;

//on form change, estimation will change realtime.
function OnFormChangeRegister(){
	var JSONdata = {};
	JSONdata['cp'] = 1;
	JSONdata['d'] = d;
	JSONdata['ct'] = $("#tab-register #ct").select2("val");
	JSONdata['g'] = $("#tab-register #g").select2("val");
	$.ajax({
		type: 'post',
    	url: '/api/est/tmreg',
		data : JSON.stringify(JSONdata),
        contentType: 'application/JSON',
        dataType : 'JSON',
        scriptCharset: 'utf-8',
        success: function(json){
        	gJson = json['body'];
        	$('#tab-register #estitem').text("");
        	if(json['status'] == 'tariff error'){
        		alert(json['status']+'\r\n'+json['body'] );
    			$("#tab-register #totals").text("");
        		$('#tab-register #ordernow').attr('disabled', true);
        		$('#tab-register #asknow').attr('disabled', true);
        		validator.form();
        		return;
        	}
        	if(json['body'] == 'g(goods and service) not exist'){
        		$("#tab-register #totals").text("");
        		$('#tab-register #ordernow').attr('disabled', true);
        		$('#tab-register #asknow').attr('disabled', true);
        		validator.form();
        		return;
        	}
        	
        	
			if(gJson["countries"].length > 0){
				$("#tab-register #totals").text(gJson["totals"] + " USD");
				$('#tab-register #ordernow').attr('disabled', false);
				$('#tab-register #asknow').attr('disabled', false);
				for (var i = 0, len = gJson["items"].length; i < len; i++) {
					var estitem = gJson["items"][i];
					ivalue = estitem["value"];
					$('#tab-register #estitem').append('<div class="row"><div class="col-md-8"><h5>'+estitem["title"]+':</h5></div><div class="col-md-4 text-right"><h5>'+ivalue+' USD</h5></div></div>');
				}
				v = validator.form();
				console.log(v);
				if(v==true){
				    $('#tab-register #ordernow').removeAttr("disabled");
				    $('#tab-register #asknow').removeAttr("disabled");
				}else{
					$('#tab-register #ordernow').attr('disabled', true);
					$('#tab-register #asknow').attr('disabled', true);
				}
			}
		}
	});
}

$(document).ready(function() {
	var date = new Date();
	var yy = date.getFullYear();
	var mm = ('0' + (date.getMonth() + 1)).slice(-2);
	var dd = ('0' + date.getDate()).slice(-2);
	d = yy + '' + mm + '' + dd;
	console.log(d);

	$("#tab-register #ct").select2({
		placeholder: SELECT_STATE
	});

	$("#tab-register #g").select2({
		placeholder: SELECT_GOOD_AND_SERVICE,
		minimumInputLength: 3
	});
	
	$('#tab-register #estitem').text("");

	$("#tab-register #orderform").ajaxForm(function() {
		alert(THANKS);
	});
	
	$("#tab-register #ordernow").attr("disabled", "disabled");
	$("#tab-register #asknow").attr("disabled", "disabled");
	
	validator = $("#tab-register #orderform").validate();
});

$("#tab-register #ct, #tab-register #g").change(function(val,added,removed) {
	OnFormChangeRegister();
});

$("#tab-register #title, #tab-register #word").keyup(function() {
	v = validator.form();
	//console.log(v);
	if(gJson){
		if((v==true)&&(gJson["countries"].length > 0)){
			$('#tab-register #ordernow').removeAttr("disabled");
			$('#tab-register #asknow').removeAttr("disabled");
		}else{
			$('#tab-register #ordernow').attr('disabled', true);
			$('#tab-register #asknow').attr('disabled', true);
		}
	}
});

$("#tab-register #ordernow").click(function(e) {
	e.preventDefault();
	console.log("order now");
	$("#tab-register #estimation").val(JSON.stringify(gJson));
	$("#tab-register #amount").val(gJson["totals"]);
	$("#tab-register #currency").val("USD");
	var objCountries = {};
	var objItems = {};
	for (var i = 0, len = gJson["countries"].length; i < len; i++) {
		objCountries[i] = new Object();
		objCountries[i]["country_cd"] = gJson["countries"][i]["country_cd"];
		objCountries[i]["namee"] = gJson["countries"][i]["namee"];
		for (var j = 0, leni = gJson["countries"][i]["goodsandservices"]["gs"].length; j < leni; j++) {
			objItems[gJson["countries"][i]["goodsandservices"]["gs"][j]] = 1;
		}
	}
	$("#tab-register #countries").val(JSON.stringify(objCountries));
	$("#tab-register #nice_items").val(JSON.stringify(objItems));
	$("#tab-register #xxxForm").attr("action","/api/order/draft");
	$("#tab-register #orderform").ajaxSubmit({
		success: function(data){
			window.location.href = '/order?h='+data;
		},
		dataType: "json"
	});
	return false;
});

$("#tab-register #asknow").click(function(e) {
	e.preventDefault();
	console.log("order now");
	$("#tab-register #estimation").val(JSON.stringify(gJson));
	$("#tab-register #amount").val(gJson["totals"]);
	$("#tab-register #currency").val("USD");
	var objCountries = {};
	var objItems = {};
	for (var i = 0, len = gJson["countries"].length; i < len; i++) {
		objCountries[i] = new Object();
		objCountries[i]["country_cd"] = gJson["countries"][i]["country_cd"];
		objCountries[i]["namee"] = gJson["countries"][i]["namee"];
		for (var j = 0, leni = gJson["countries"][i]["goodsandservices"]["gs"].length; j < leni; j++) {
			objItems[gJson["countries"][i]["goodsandservices"]["gs"][j]] = 1;
		}
	}
	$("#tab-register #countries").val(JSON.stringify(objCountries));
	$("#tab-register #nice_items").val(JSON.stringify(objItems));
	$("#tab-register #xxxForm").attr("action","/api/order/draft");
	$("#tab-register #orderform").ajaxSubmit({
		success: function(data){
			window.location.href = '/ask?h='+data;
		},
		dataType: "json"
	});
	return false;
});