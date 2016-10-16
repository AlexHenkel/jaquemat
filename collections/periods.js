Periods = new Mongo.Collection('periods');

Periods.allow({
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

PeriodsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nombre del periodo"
    },
    start_date: {
       type: String,
       label: "Fecha de inicio",
       autoform: {
            afFieldInput: {
                type: "datetimepicker",
                opts: {
                    timepicker: false,
                    format:'DD/MM/YYYY',
                    minDate: 0
                }
            }
       } 
    },
    end_date: {
       type: String,
       label: "Fecha de fin",
       autoform: {
            afFieldInput: {
                type: "datetimepicker",
                opts: {
                    timepicker: false,
                    format:'DD/MM/YYYY',
                    minDate: 0
                }
            }
       } 
    },
    status: {
        type: String,
        allowedValues: ['current', 'past', 'pending'],
        defaultValue: 'current',
        autoform: {
            type: "hidden"
        }
    },
});

Periods.attachSchema(PeriodsSchema);