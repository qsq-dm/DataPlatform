'use strict';
var Vue = require('Vue');
var $ = require('jQuery');

// for debug
window.jQuery = $;
window.$ = $;


var dom = require('./dom/index.js');

var _currentHtml = '';
var initHtml = function(defaultData, cb) {
    defaultData.forEach(function(item, index) {
        _currentHtml += '<m-main :index="' + index + '" :init-data="initData" :current-data="initData.defaultData['+ index +']" :loading.sync="loading"></m-main>\n';
    })
    $('#page-wrapper').html($('#page-wrapper').html() + _currentHtml);
    cb && cb();
}

if(window.initData){
    window.initData.defaultData === undefined ? window.initData.defaultData = [] : window.initData.defaultData = window.initData.defaultData;
    initHtml(window.initData.defaultData);

    var Loading = require('./component/loading.vue');
    var Main = require('./component/main.vue');

    var app = new Vue({
        el: '#page-wrapper',
        data: {
            loading: true,
            initData: window.initData,
        },
        components: {
            'm-loading': Loading,
            'm-main': Main
        }
    });
}

