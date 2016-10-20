Template.CoordinatorEdit.onRendered(function() {
	let id = FlowRouter.getParam("id");
	let user = Meteor.users.findOne(id);
	$('[name="area"]').filter('[value="' + user.extendedProfile.area + '"]').attr('checked', true);
});