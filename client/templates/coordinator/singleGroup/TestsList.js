Template.TestsList.events({
	'click .delete': function (event) {
		Meteor.call('deleteTest', $(event.target).attr('data-id'));
	}
});