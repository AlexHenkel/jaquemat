import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	// Get current date in ISO format
	let now = new Date();
	now = Date.parse(now);

	Periods.find({status: {$in: ['current', 'pending']}}).map(function (period) {
		let dateParts = period.end_date.split("/");
		let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
		if (Date.parse(dateObject) < now) {
			Periods.update({_id: period._id}, {$set: {status: 'past'}});
		}
	});
});
