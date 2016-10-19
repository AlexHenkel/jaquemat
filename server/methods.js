Meteor.methods({
	////////////////////////
	///  Groups
	////////////////////////

	// Deletes group
	deleteGroup: function(id) {
		Groups.remove(id);
	},

	////////////////////////
	///  Messages
	////////////////////////

	// Deletes message
	deleteMessage: function(id) {
		Messages.remove(id);
	},
	// Change this method to use Facebook info
	sendMessage: function(forumId, body) {
		if(this.userId) {
			let user = Meteor.users.findOne(this.userId);
			Messages.insert({
				body: body, 
				sender: this.userId, 
				sender_name: user.extendedProfile.name,
				created_at: Date.now(),
				owner: forumId
			});
		}
	},

	////////////////////////
	///  Schools
	////////////////////////

	// Deletes school
	deleteSchool: function(id) {
		School.remove(id);
	},

	////////////////////////
	///  Forums
	////////////////////////

	// Deletes forum
	deleteForum: function(id) {
		Forums.remove(id);
	},

	////////////////////////
	///  Tests
	////////////////////////

	// Deletes test
	deleteTest: function(id) {
		Tests.remove(id);
	},

	////////////////////////
	///  Periods
	////////////////////////

	// Deletes period
	deletePeriod: function(id) {
		Periods.remove(id);
	},

	////////////////////////
	///  Tests
	////////////////////////
	
	insertTest: function(groupId, name, short_name) {
		Tests.insert({name: name, short_name: short_name, group: groupId});
	},

	gradeTest: function(testId, students) {
		_.map(students, function(n){
			if (Grades.find({student: n._id, test: testId}).count()) {
				Grades.update({student: n._id, test: testId}, {$set: {grade: n.grade}});
			}
			else {
				Grades.insert({student: n._id, test: testId, grade: n.grade});
			}
		});
	},

	////////////////////////
	///  Users
	////////////////////////

	// Register user extended profile
	registerUser: function(profile) {
		let user = Meteor.users.findOne(this.userId);
		profile.profile_picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		Meteor.users.update({_id: this.userId}, { $set: { extendedProfile : profile}});
	},

	// Updates user extended profile
	updateUser: function(profile) {
		let user = Meteor.users.findOne(this.userId);
		profile.profile_picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		profile.type = user.extendedProfile.type;
		if (user.extendedProfile.school) {
			profile.school = user.extendedProfile.school;
		}
		Meteor.users.update({_id: this.userId}, { $set: { extendedProfile : profile}});
	},

	// Activate user
	toggleUser: function(id) {
		let user = Meteor.users.findOne({_id: id});
		if (Roles.userIsInRole(id, user.extendedProfile.type)) {
			Roles.removeUsersFromRoles(id, user.extendedProfile.type);
		}
		else {
			Roles.addUsersToRoles(id, user.extendedProfile.type);
		}
	},

	// Deletes user
	deleteUser: function(id) {
		Meteor.users.remove(id);
	},

	////////////////////////
	///  Attendance
	////////////////////////
	takeAttendance: function(date, groupId, instructors, students) {
		Attendances.insert({date: date, group: groupId, instructors: instructors, students: students});
	},

	updateAttendance: function(attendanceId, date, instructors, students) {
		Attendances.update({_id: attendanceId}, {$set: {date: date, instructors: instructors, students: students}});
	}
});