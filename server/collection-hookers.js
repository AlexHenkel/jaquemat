Periods.before.insert(function (userId, doc) {
	// Transform string date to ISO date of start date
  	let dateParts = doc.start_date.split("/");
	let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	doc.start_date = Date.parse(dateObject);
	// Transform string date to ISO date of end date
	dateParts = doc.end_date.split("/");
	dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
	doc.end_date = Date.parse(dateObject);

	// Get current date in ISO format
	let now = new Date();
	now = Date.parse(now);

	// Change current periods to pending
	if (doc.start_date < now) {
		doc.status = 'pending';
	}
});

Periods.before.update(function (userId, doc, fieldNames, modifier, options) {
	// Get current date in ISO format
	let now = new Date();
	now = Date.parse(now);

	// Transform string date to ISO date of start date	
	if (_.indexOf(fieldNames, 'start_date') >= 0) {
		let dateParts = modifier.$set.start_date.split("/");
		let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		modifier.$set.start_date = Date.parse(dateObject);

		// Change current periods to pending
		if (modifier.$set.start_date < now) {
			modifier.$set.status = 'pending';
		}	
	}
	// Transform string date to ISO date of end date
	if (_.indexOf(fieldNames, 'end_date') >= 0) {
		let dateParts = modifier.$set.end_date.split("/");
		let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		modifier.$set.start_date = Date.parse(dateObject);	
	}
});