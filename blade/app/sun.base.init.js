// 框架基本加载完成，打开用户入口

define([blade.isHybrid ? 'sunHybridApp' : 'sunWebApp'], function (bladeApp){
    
    function createBladeMain() {
        
        // 打开用户入口
        if (blade.pdConfig) {
            
            require(blade.pdConfig, function () {
                _createBladeMain();
            });
        } else {
            _createBladeMain();
        }
    }
    
    function _createBladeMain() {
        var BladeApp = new bladeApp();
        
        blade.instance = BladeApp;
    }
    
    return createBladeMain;
    
});