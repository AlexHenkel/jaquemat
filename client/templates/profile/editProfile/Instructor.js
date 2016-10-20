Template.InstructorEdit.onRendered(function() {
	let id = FlowRouter.getParam("id");
	let user = Meteor.users.findOne(id);
	$('[name="area"]').filter('[value="' + user.extendedProfile.area + '"]').attr('checked', true);
	$('[name="program"]').filter('[value="' + user.extendedProfile.program + '"]').attr('checked', true);
});