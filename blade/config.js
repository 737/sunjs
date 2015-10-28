/**
 * @file 公共配置文件
 * @author wanglei48@baidu.com, zhaozhixin@baidu.com
 */

define(function () {

    require.config({
        waitSeconds: 60,
        shim: {
            $ : {
                exports : 'zepto'
            },
            _ : {
                exports : '_'
            },
            B : {
                deps : ['_', '$'],
                exports : 'Backbone'
            },
            F : {
                deps : ['$'],
                exports : 'Fastclick'
            },
            libs : {
                deps : ['_', '$', 'B'],
                exports : 'libs'
            },
            common : {
                deps : ['libs']
            },
        },
        paths: {
            '$' : blade.dir + "libs/zepto",
            "_" : blade.dir + "libs/underscore",
            'text': blade.dir + 'libs/require.text',
            'css': blade.dir + 'libs/require.css',
            
            'sunWebInit': blade.dir + 'app/web/sun.web.init',
            'sunHybridInit': blade.dir + 'app/hybrid/sun.hybrid.init',
            'sunBaseInit': blade.dir + 'app/sun.base.init',
            'sunWebApp': blade.dir + 'app/web/sun.web.app',
            'sunHbridApp': blade.dir + 'app/hybrid/sun.hybrid.app',
            'sunWebStatic': blade.dir + 'app/web/sun.web.static',
            'sunAbstractApp': blade.dir + 'app/sun.abstract.app',
            
            // common
            'sunCoreInherit': blade.dir + 'common/sun.class.inherit',
            'sunMessage': blade.dir + 'common/sun.message',
            
            
            
            // -------------------------------------------------------------
            
            'PbMain': blade.dir + 'public/pb.main',
            'PbModel': blade.dir + 'public/pb.model',
            'AbstractApp': blade.dir + 'mvc/abstract.app',
            'AbstractView': blade.dir + 'mvc/abstract.view',
            'ModuleView': blade.dir + 'mvc/module.view',

            'AbstractModel': blade.dir + 'data/abstract.model',
            'AbstractEntity': blade.dir + 'mvc/abstract.entity',
            'AbstractStore': blade.dir + 'data/abstract.store',
            'AbstractStorage': blade.dir + 'data/abstract.storage',

            'cValidate': blade.dir + 'common/c.validate',
            'cUser': blade.dir + 'common/c.user',

            'HybridHeader': blade.dir + 'hybrid/ui.header',


            'UIAbstractView': blade.dir + 'ui/ui.abstract.view',
            'UIMask': blade.dir + 'ui/ui.mask',
            'UILayer': blade.dir + 'ui/ui.layer',
            'UIPageView': blade.dir + 'ui/ui.page.view',

            'UIScroll': blade.dir + 'ui/ui.scroll',

            'UISlider': blade.dir + 'ui/ui.slider',
            'T_UISlider': blade.dir + 'ui/ui.slider.html',
            'UIImageSlider': blade.dir + 'ui/ui.image.slider',


            'UIScrollLayer': blade.dir + 'ui/ui.scroll.layer',
            'T_UIScrollLayer': blade.dir + 'ui/ui.scroll.layer.html',

            'UIAlert': blade.dir + 'ui/ui.alert',
            'T_UIAlert': blade.dir + 'ui/ui.alert.html',

            // 日历
            'UICalendar': blade.dir + 'ui/ui.calendar',
            'T_UICalendar': blade.dir + 'ui/ui.calendar.html',

            // 日历
            'UICalendarBox': blade.dir + 'ui/ui.calendar.box',
            'T_UICalendarBox': blade.dir + 'ui/ui.calendar.box.html',

            'APPUIHeader': blade.dir + 'ui/app.ui.header',
            'T_APPUIHeader': blade.dir + 'ui/app.ui.header.html',

            'UIHeader': blade.dir + 'ui/ui.header',
            'T_UIHeader': blade.dir + 'ui/ui.header.html',

            'UIToast': blade.dir + 'ui/ui.toast',
            'T_UIToast': blade.dir + 'ui/ui.toast.html',

            'UILoading': blade.dir + 'ui/ui.loading',
            'T_UILoading': blade.dir + 'ui/ui.loading.html',


            'UILayerList': blade.dir + 'ui/ui.layer.list',
            'T_UILayerList': blade.dir + 'ui/ui.layer.list.html',

            'T_UICalendarBox': blade.dir + 'ui/ui.calendar.box.html',
            
            
            
            

        }
    });

});