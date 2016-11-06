Router.route('/', {
  name: 'home',
  action: function() {
    ReactLayout.render(App, {
      content: <TasksList />
    });
  }
});

Router.route('/login', {
  name: 'login',
  action: function() {
    ReactLayout.render(App, {
      content: <Login />
    });
  }
});


Router.route('/register', {
  name: 'register',
  action: function() {
    ReactLayout.render(App, {
      content: <Register />
    });
  }
});
Router.route('/quiz', {
  name: 'quiz',
  action: function() {
    ReactLayout.render(App, {
      content: <Quiz />
    });
  }
});


Router.notFound = {
  action: function() {
   Router.go('home');
  }
};
