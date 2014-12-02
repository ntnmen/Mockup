var gJson;
var d;
var validator;

//on form change, estimation will change realtime.
function OnFormChangeSearch(){
	var JSONdata = {};
	JSONdata['cp'] = 1;
	JSONdata['d'] = d;
	JSONdata['ct'] = $("#tab-search #ct").select2("val");
	JSONdata['g'] = $("#tab-search #g").select2("val");
	$.ajax({
		type: 'post',
    	url: '/api/est/tmsearch',
		data : JSON.stringify(JSONdata),
        contentType: 'application/JSON',
        dataType : 'JSON',
        scriptCharset: 'utf-8',
        success: function(json){
        	gJson = json['body'];
        	$('#tab-search #estitem').text("");
        	if(json['status'] == 'tariff error'){
        		alert(json['status']+'\r\n'+json['body'] );
    			$("#tab-search #totals").text("");
        		$('#tab-search #ordernow').attr('disabled', true);
        		$('#tab-search #asknow').attr('disabled', true);
        		validator.form();
        		return;
        	}
        	
        	if(json['body'] == 'g(goods and service) not exist'){
        		$("#tab-search #totals").text("");
        		$('#tab-search #ordernow').attr('disabled', true);
        		$('#tab-search #asknow').attr('disabled', true);
        		validator.form();
        		return;
        	}
        	
			if(gJson["countries"].length > 0){
				$("#tab-search #totals").text(gJson["totals"] + " USD");
				$('#tab-search #ordernow').attr('disabled', false);
				$('#tab-search #asknow').attr('disabled', false);
				for (var i = 0, len = gJson["items"].length; i < len; i++) {
					var estitem = gJson["items"][i];
					ivalue = estitem["value"];
					$('#tab-search #estitem').append('<div class="row"><div class="col-md-8"><h5>'+estitem["title"]+':</h5></div><div class="col-md-4 text-right"><h5>'+ivalue+' USD</h5></div></div>');
				}
				v = validator.form();
				console.log(v);
				if(v==true){
				    $('#tab-search #ordernow').removeAttr("disabled");
				    $('#tab-search #asknow').removeAttr("disabled");
				}else{
					$('#tab-search #ordernow').attr('disabled', true);
					$('#tab-search #asknow').attr('disabled', true);
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

	$("#tab-search #ct").select2({
		placeholder: SELECT_STATE
	});

	$("#tab-search #g").select2({
		placeholder: SELECT_GOOD_AND_SERVICE,
		minimumInputLength: 3
	});
	
	$('#tab-search #estitem').text("");

	$("#tab-search #orderform").ajaxForm(function() {
		alert(THANKS);
	});
	
	$("#tab-search #ordernow").attr("disabled", "disabled");
	$("#tab-search #asknow").attr("disabled", "disabled");
	
	validator = $("#tab-search #orderform").validate();
});

$("#tab-search #ct, #tab-search #g").change(function(val,added,removed) {
	OnFormChangeSearch();
});

$("#tab-search #title, #tab-search #word").keyup(function() {
	v = validator.form();
	//console.log(v);
	if(gJson){
		if((v==true)&&(gJson["countries"].length > 0)){
		    $('#tab-search #ordernow').removeAttr("disabled");
		    $('#tab-search #asknow').removeAttr("disabled");
		}else{
			$('#tab-search #ordernow').attr('disabled', true);
			$('#tab-search #asknow').attr('disabled', true);
		}
	}
});

$("#tab-search #ordernow").click(function(e) {
	e.preventDefault();
	console.log("order now");
	$("#tab-search #estimation").val(JSON.stringify(gJson));
	$("#tab-search #amount").val(gJson["totals"]);
	$("#tab-search #currency").val("USD");
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
	$("#tab-search #countries").val(JSON.stringify(objCountries));
	$("#tab-search #nice_items").val(JSON.stringify(objItems));
	$("#tab-search #xxxForm").attr("action","/api/order/draft");
	$("#tab-search #orderform").ajaxSubmit({
		success: function(data){
			window.location.href = '/order?h='+data;
		},
		dataType: "json"
	});
	return false;
});

$("#tab-search #asknow").click(function(e) {
	e.preventDefault();
	console.log("order now");
	$("#tab-search #estimation").val(JSON.stringify(gJson));
	$("#tab-search #amount").val(gJson["totals"]);
	$("#tab-search #currency").val("USD");
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
	$("#tab-search #countries").val(JSON.stringify(objCountries));
	$("#tab-search #nice_items").val(JSON.stringify(objItems));
	$("#tab-search #xxxForm").attr("action","/api/order/draft");
	$("#tab-search #orderform").ajaxSubmit({
		success: function(data){
			window.location.href = '/ask?h='+data;
		},
		dataType: "json"
	});
	return false;
});