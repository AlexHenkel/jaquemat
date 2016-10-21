Meteor.methods({
	////////////////////////
	///  Groups
	////////////////////////

	// Deletes group
	deleteGroup: function(id) {
		Groups.remove(id);
		// Remove group from forums
		Forums.update({groups: id}, {$pull: {groups: id}});
		// Delete forums with no groups
		Meteor.call('sanitizeForums');
		// Delete grades of tests of group
		Tests.find({group: id}).map(function (test) {
			Grades.remove({test: test._id});
		});
		// Delete tests of group
		Tests.remove({group: id});
		// Delete attendance of group
		Attendances.remove({group: id});
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
		// Delete school
		Schools.remove(id);
		Meteor.users.find({"extendedProfile.school": id}).map(function (user) {
			// Remove users from groups
			Groups.update({students: user._id}, {$pull: {students: user._id}});
			// Remove grades from users
			Grades.remove({student: user._id});
			// Remove messages from users
			Messages.remove({sender: user._id});
		});

		// Remove principals and students of that school
		Meteor.users.remove({$or: [{roles: 'student'}, {roles: 'principal'}]});

	},

	////////////////////////
	///  Forums
	////////////////////////

	// Deletes forum
	deleteForum: function(id) {
		Forums.remove(id);
		// Remove messages in forum
		Messages.remove({owner: id});
	},

	////////////////////////
	///  Tests
	////////////////////////

	// Deletes test
	deleteTest: function(id) {
		Tests.remove(id);
		// Delte grades of test
		Grades.remove({test: id});
	},

	////////////////////////
	///  Periods
	////////////////////////

	// Deletes period
	deletePeriod: function(id) {
		Periods.remove(id);
		
		Groups.find({period: id}).map(function (group) {
			Tests.find({group: group._id}).map(function (test) {
				// Delete grades of tests of group
				Grades.remove({test: test._id});
			});
			// Delete tests of group
			Tests.remove({group: group});
		});
		// Delete groups
		Groups.remove({period: id});
		
		Forums.find({period: id}).map(function (forum) {
			// Delete messages in forum in period
			Messages.remove({owner: forum._id});
		});
		// Delete forums in period
		Forums.remove({period: id});
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
	updateUser: function(id, profile) {
		let user = Meteor.users.findOne(id);
		profile.type = user.extendedProfile.type;
		if (user.extendedProfile.school) {
			profile.school = user.extendedProfile.school;
		}
		Meteor.users.update({_id: id}, { $set: { extendedProfile : profile}});
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
		// Remove user from groups
		Groups.update({students: id}, {$pull: {students: id}});
		// Remove grades from user
		Grades.remove({student: id});
		// Remove messages from user
		Messages.remove({sender: id});
	},

	////////////////////////
	///  Attendance
	////////////////////////
	takeAttendance: function(date, groupId, instructors, students) {
		Attendances.insert({date: date, group: groupId, instructors: instructors, students: students});
	},

	updateAttendance: function(attendanceId, date, instructors, students) {
		Attendances.update({_id: attendanceId}, {$set: {date: date, instructors: instructors, students: students}});
	},

	deleteAttendance: function(id) {
		Attendances.remove(id);
	},

	////////////////////////
	///  Stadistic
	////////////////////////
	firstPeriod: function(id) {
		let user = Meteor.users.findOne(id);
		let periods = [];

		if (user.extendedProfile.type === "instructor") {
			Groups.find({instructors: id}).map(function (group) {
				if (_.indexOf(periods, group.period) < 0) {
					periods.push(group.period);
				}
			});
		}
		else if (user.extendedProfile.type === "student") {
			Groups.find({students: id}).map(function (group) {
				if (_.indexOf(periods, group.period) < 0) {
					periods.push(group.period);
				}
			});
		}
		return Periods.findOne({_id: {$in: periods}}, {sort: { start_date: 1}}).name;
	},

	attendanceCurrentPeriod: function(id) {
		let user = Meteor.users.findOne(id);
		let groups = [];
		let attendances = 0;

		if (user.extendedProfile.type === "instructor") {
			Groups.find({instructors: id, period: user.extendedProfile.period}).map(function (group) {
				groups.push(group._id);
			});

			attendances = Attendances.find({group: {$in: groups}, instructors: id}).count();
		}
		else if (user.extendedProfile.type === "student") {
			Groups.find({students: id, period: user.extendedProfile.period}).map(function (group) {
				groups.push(group._id);
			});

			attendances = Attendances.find({group: {$in: groups}, students: id}).count();
		}
		if (groups.length === 0) {
			return 0
		}
		else {
			return attendances / groups.length;
		}
	},

	averageCurrentPeriod: function(id) {
		let user = Meteor.users.findOne(id);
		let groups = [], tests = [];
		let average = 0, count = 0;

		if (user.extendedProfile.type === "student") {
			Groups.find({students: id, period: user.extendedProfile.period}).map(function (group) {
				groups.push(group._id);
			});

			Tests.find({group: {$in: groups}}).map(function (test) {
				tests.push(test._id);
			});

			Grades.find({test: {$in: tests}, student: id}).map(function (grade) {
				average += grade.grade;
				count++;
			});
		}

		if (count === 0) {
			return 0;
		}
		else {
			return average / count;
		}
	},
});