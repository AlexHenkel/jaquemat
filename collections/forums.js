Forums = new Mongo.Collection('forums');

Forums.allow({
    insert: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator']);
    },
    update: function(userId, doc) {
        // just admins can update
        return Roles.userIsInRole(userId, ['coordinator']);
    },
    remove: function (userId, doc) {
        // just admins can delete
        return Roles.userIsInRole(userId, ['coordinator']);
    }
});

ForumsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del foro"
    },
    groups: {
        type: [String],
        label: "Grupos del foro",
        autoform: {
            type: "universe-select",
            options: function () { // Get current groups in specific format (label, value)
                let periodsId = Periods.find({status: { $in: ['current', 'pending']}}).map(function(period) {
                    return period._id;
                });
                return Groups.find({period: {$in: periodsId}}).map(function(group) {
                    return {label: group.name, value: group._id};
                });
            },
            multiple: true,
            create: false
        }
    },
    period: {
        type: String,
        label: "Periodo",
        autoform: {
            type: "universe-select",
            options: function () { // Get current periods in specific format (label, value)
                return Periods.find({status: { $in: ['current', 'pending']}}).map(function(period) {
                    return {label: period.name, value: period._id};
                });
            }
        }
    },
});

Forums.attachSchema(ForumsSchema);