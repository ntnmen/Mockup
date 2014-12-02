$('#go-tab-register, #go-tab-search').on('click', function() {
	var id = $(this).attr('href').substring(1);
	$('.home-tab #li-' + id + ' a').click();
//	$(window).scrollTop(0);
});