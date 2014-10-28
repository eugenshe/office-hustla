requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        'app': '../app',
        'controllers': '../app/controllers',
        'jquery': '//code.jquery.com/jquery-1.11.0.min'
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