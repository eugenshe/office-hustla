requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'app': '../app',
        'controllers': '../app/controllers'
    },
    'map': {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' },
    },
    shim: {
        'can': { exports: 'can', deps: ['jquery'] },

    }
});


requirejs(['app/main']);