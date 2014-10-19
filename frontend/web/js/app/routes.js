define(['jquery', 'can'], function($, can) {

    can.Control.extend('Routes', {

        _body: $('body'),

        _instance: null,

        init: function() {
            Routes._instance = new Routes();
            Routes._instance.run();
        },

        runController: function(controller, action) {
            new controller('body', { action: action || null });
        },

        routes: {
            site: {
                controller: function(action) {
                    require(['controllers/index'], function(c) {
                        Routes.runController(c, action);
                    });
                }
            },

        }
    }, {
        run: function() {
            this.controller = Routes._body.data('controller');
            this.action = Routes._body.data('action');

            this.resolveController();
        },


        resolveController: function() {
            if (Routes.routes[this.controller]) {
                if (Routes.routes[this.controller].controller) {
                    Routes.routes[this.controller].controller(this.action);
                } else if (Routes.routes[this.controller].callback) {
                    Routes.routes[this.controller].callback();
                }
            }
        },
    });

    return Routes;
});