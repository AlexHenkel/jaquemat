Template.StudentEdit.onRendered(function() {
	let id = FlowRouter.getParam("id");
	let user = Meteor.users.findOne(id);
	$('[name="school_year"]').filter('[value="' + user.extendedProfile.school_year + '"]').attr('checked', true);
	$('[name="program"]').filter('[value="' + user.extendedProfile.program + '"]').attr('checked', true);
});