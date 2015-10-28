/**
 * Lizard基础类，框架种子文件
 * @namespace Global.blade
 */

 (function () {

    // 解析blade.seed.js标签的属性，初始化blade.dir,blade.pdConfig blade.config 三个属性
    function initLizardConfig() {
        var scripts = document.getElementsByTagName('script') || [];
        var reg = /blade\.seed\.(src\.)*js.*$/ig;

        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].getAttribute("src");

            if (src && reg.test(src)) {
                blade.dir = src.replace(reg, '');

                var configStr = scripts[i].getAttribute("pdConfig") || '';

                blade.pdConfig = JSON.parse('["' + configStr.split(',').join('","') + '"]');

                blade.config = {};

                break;
            }
        }
    }

    //修复safari下 回退不执行JS的问题
    var shown = false;
    window.onpageshow = function (e) {
        if (shown) {
            window.location.reload();
        }
        shown = true;
    };

    window.onunload = function () {};

    // 组织UI组件路径
    window.getAppUITemplatePath = function (path) {
        if (!blade.notpackaged) {
            return 'text!' + 'ui/' + path + '.html';
        }
        if (document.location.href.indexOf('172.16.140.104:5389') > 0 || document.location.href.indexOf('localhost') > 0) {
            return 'text!' + blade.dir + 'ui/' + path + '.html';
        }

        return 'text!' + 'ui/' + path + '.html';
    }

    // 加载单个js文件
    function loadScript(url, callback) {
        var script = document.createElement("script");
        
        script.type = "text/javascript";
        script.async = true;
        script.onload = callback;
        script.src = url;
        document.body.appendChild(script);
    }

    // 加载多个js文件
    function mutileLoad(scripts, callback) {
        var len = scripts.length;
        var no = 0;

        if (!len) {
            end();
            return;
        }
        for (var i = 0; i < len; i++) {
            var url = scripts[i];

            loadScript(url, end);
        }

        function end() {
            no++;
            if (no >= len) {
                callback();
            }
        }
    }

    // 加载AMD模块文件
    function amdLoaderLoaded(e) {
        var bladeConfigModel = blade.notpackaged ? [blade.dir + 'config.js'] : ['config'];

        require(bladeConfigModel, function () {
            var reqs = [];
            
            if (!blade.isHybrid) {
                reqs.push('sunWebInit');
            } else {
                reqs.push('sunHybridInit');
            }
            
            // 引入常用框架
            require(['_', '$'], function () {
                // 在此可以读取meta中的配置
                
                // 框架入口
                require(reqs, function () {
                    'enter programe'
                });
            });
        });
    }

    // 加载资源文件
    function loadRes() {
        var basescripts = [];

        if (blade.notpackaged) {
            basescripts = [blade.dir + "libs/require.js"];
        }

        mutileLoad(basescripts, amdLoaderLoaded);
    }

    //初始化Lizard命名空间
    var blade = typeof blade != 'undefined' ? blade : {
        // 版本
        version : "1.0",
        
        notpackaged : typeof require == 'undefined',
        
        // 判断现在运行的包是否是Hybrid包
        isHybrid : !!(window.LizardLocalroute),
    };

    window.blade = blade;

    // 初始化框架属性
    initLizardConfig();

    // 加载资源文件
    loadRes();


})();
