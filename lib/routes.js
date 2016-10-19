Accounts.onLogin(function() {
    FlowRouter.go('home');
});

////////////////////////////
///  Public routes
////////////////////////////
FlowRouter.route('/', {
    name: 'home',
    action() {
        if (Meteor.userId()) {
            BlazeLayout.render('MainLayoutGuest', { main: 'Home' });
        }
        else {
            FlowRouter.go("login");
        }
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('MainLayoutGuest', { main: 'Login' });
    }
});

////////////////////////////
///  Coordinator routes
////////////////////////////
FlowRouter.route('/grupos', {
    name: 'groups',
    action() {
        BlazeLayout.render('MainLayout', { main: 'ManageGroups' });
    }
});

FlowRouter.route('/editarGrupos', {
    name: 'edit-groups',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Groups' });
    }
});

FlowRouter.route('/periodos', {
    name: 'periods',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Periods' });
    }
});

FlowRouter.route('/foros', {
    name: 'forums',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Forums' });
    }
});

FlowRouter.route('/usuario/editar/:id', {
    name: 'single-user-edit',
    action() {
        BlazeLayout.render('MainLayout', { main: 'EditProfile' });
    }
});

FlowRouter.route('/usuarios', {
    name: 'users',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Users' });
    }
});

FlowRouter.route('/escuelas', {
    name: 'schools',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Schools' });
    }
});


////////////////////////////
///  Common routes
////////////////////////////
FlowRouter.route('/foro/:id', {
    name: 'single-forum',
    action() {
        BlazeLayout.render('MainLayout', { main: 'SingleForum' });
    }
});

FlowRouter.route('/grupo/:id', {
    name: 'single-group',
    action() {
        BlazeLayout.render('MainLayout', { main: 'SingleGroup' });
    }
});

FlowRouter.route('/lista/:id', {
    name: 'single-attendance',
    action() {
        BlazeLayout.render('MainLayout', { main: 'SingleAttendance' });
    }
});

FlowRouter.route('/calificar/:id', {
    name: 'grade-test',
    action() {
        BlazeLayout.render('MainLayout', { main: 'GradeTest' });
    }
});