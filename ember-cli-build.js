
'use strict';
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
    let app = new EmberAddon(defaults, {
        // Add options here
    });
    // layui-laydate
    app.import("vendor/laydate/theme/default/font/iconfont.eot", {
        destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.svg", {
        destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.ttf", {
        destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/font/iconfont.woff", {
        destDir: '/assets/laydate/fonts'
    })
    app.import("vendor/laydate/theme/default/laydate.css")
    app.import("vendor/laydate/laydate.js")
    app.import('node_modules/echarts/map/js/china.js');
    return app.toTree();
};