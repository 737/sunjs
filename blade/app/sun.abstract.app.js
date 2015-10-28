// app抽象类

define(['sunMessage'], function (sunMessage) {

    function app(options) {
        this.initialize(options);
    };

    app.defaults = {
        "mainRoot" : '#main',
        "header" : 'header',
        "viewport" : '.main-viewport',
        "animForwardName" : 'slideleft',
        "animBackwardName" : 'slideright',
        "isAnim" : false,
        // 是否开启动画
        "maxsize" : 10
    };

    app.subclasses = [];

    app.prototype = {
        viewReady : function (handler) {
            //TODO subscribe viewReady message
            sunMessage.subscribe('viewReady', handler);
        },

        initProperty: function (options) {
            var opts = _.extend({}, app.defaults, options || {});
            
            return opts;
        },
        
        initialize : function (options) {
            var opts = this.initProperty(options);
            
            this.options = opts;
            
            
            
        },

        /**
         * 以弹出框的形式，弹出提示信息
         * @param {String|Object} 需要弹出的信息
         * @method Lizard.showMessage
         * @example
         * //参数
         *  1."显示信息"
         *  2.{
         *    datamodel：
         *      {
         *        content："显示信息"，
         *        title："带标题",
         *        okTxt:"按钮文本",
         *      },
         *    okAction:function(){}   //按钮回调函数
         *  }
         */
        showMessage : function (params) {
            alert(params);

        },

    };

    return app;
});
