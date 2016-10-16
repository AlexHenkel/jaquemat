Grades = new Mongo.Collection('grades');

Grades.allow({
    insert: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    update: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    remove: function (userId, doc) {
        // just admins can delete
        return Roles.userIsInRole(userId, ['coordinator']);
    }
});

GradesSchema = new SimpleSchema({
    student: {
        type: String
    },
    test: {
        type: String
    },
    grade: {
        type: Number,
        min: 0,
        max: 100
    }
});

Grades.attachSchema(GradesSchema);