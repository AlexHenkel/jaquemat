sanitizeRegisterForm = function() {
	let infoObj = {};

	$("#registerForm input:not(.js-universeSelectizeInput):not([type='radio']):not([type='checkbox'])").each(function() {
		infoObj[$(this).attr("name")] = $(this).val();
	});

	$("#registerForm input[type='radio']:checked").each(function() {
		infoObj[$(this).attr("name")] = $(this).val();
	});

	$("#registerForm select").each(function() {
		infoObj[$(this).attr("name")] = $(this).val();
	});

	return infoObj;
}