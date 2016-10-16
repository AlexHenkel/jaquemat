Template.StudentForm.helpers({
	options: function () {
		return Schools.find().map(function(destination) {
                return {label: destination.name, value: destination.name};
            });
	}
});