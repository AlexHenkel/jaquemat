import { Meteor } from 'meteor/meteor';
var _ = require('lodash');

Meteor.startup(() => {
	// Get current date in ISO format
	let now = new Date();
	now = Date.parse(now);

	// Change pending periods to current
	Periods.find({status: {$in: ['pending']}}).map(function (period) {
		if (period.start_date > now) {
			Periods.update({_id: period._id}, {$set: {status: 'current'}});
		}
	});

	// Change current periods to past
	Periods.find({status: {$in: ['current']}}).map(function (period) {
		if (period.end_date < now) {
			Periods.update({_id: period._id}, {$set: {status: 'past'}});
		}
	});
});
