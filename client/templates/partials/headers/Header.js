Template.Header.onRendered(function() {
	Meteor.setTimeout(function() {
		$(".button-collapse").sideNav();
	}, 100);
});