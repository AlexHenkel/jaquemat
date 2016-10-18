Attendances = new Mongo.Collection('attendances');

Attendances.allow({
    insert: function(userId, doc) {
        // just admins and instructors can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    update: function(userId, doc) {
        // just admins and instructors can update
        return Roles.userIsInRole(userId, ['coordinator', 'instructor']);
    },
    remove: function (userId, doc) {
        // just admins can delete
        return Roles.userIsInRole(userId, ['coordinator']);
    }
});

AttendancesSchema = new SimpleSchema({
    date: {
       type: String,
       label: "Fecha de inicio",
    },
    group: {
        type: String
    },
    instructors: {
        type: [String],
        label: "Instructores del grupo",
        optional: true
    },
    students: {
        type: [String],
        label: "Alumnos del grupo",
        optional: true
    },
});

Attendances.attachSchema(AttendancesSchema);