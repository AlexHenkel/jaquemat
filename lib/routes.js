Accounts.onLogin(function() {
    FlowRouter.go('home');
});

Accounts.onLogout(function() {
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
FlowRouter.route('/landing', {
    name: 'landing',
    action() {
        BlazeLayout.render('HomeLayout', { main: 'Landing' });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action() {
        if (Meteor.userId()) {
            FlowRouter.go("home");
        }
        else {
            BlazeLayout.render('MainLayoutGuest', { main: 'Login' });
        }
        
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

FlowRouter.route('/foros', {
    name: 'forums',
    action() {
        BlazeLayout.render('MainLayout', { main: 'ManageForums' });
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

FlowRouter.route('/editarForos', {
    name: 'edit-forums',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Forums' });
    }
});

FlowRouter.route('/usuario/:id', {
    name: 'single-user',
    action() {
        BlazeLayout.render('MainLayout', { main: 'Profile' });
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

FlowRouter.route('/misAlumnos', {
    name: 'my-students',
    action() {
        BlazeLayout.render('MainLayout', { main: 'MyUsers' });
    }
});