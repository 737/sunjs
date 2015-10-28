/**
* @name validate
* @class [常用工具方法集合]
* @description : 常用工具方法集合
*/
define(['Toolkit'], function (Toolkit) {

    return {
        // value({string}, {object|JSON}, {repalce})
        // >> ('person.name.last', {person: { name: { first: 'sun', last: 'cms' }, age: 26 }})
        // => 'cms'
        // >> ('person.name.age', {person: { name: { first: 'sun', last: 'cms' }, age: 26 }})
        // => 'undefined'
        // >> ('person.name.age', {person: { name: { first: 'sun', last: 'cms' }, age: 26 }}, 'suncms')
        // => 'suncms'
        value: function(NSString, root, repalce) {
            var nsPath = NSString.split("."),
                ns = Toolkit.deepClone(root) || window || {};

            for (var i = 0, len = nsPath.length; i < len; i++) {
                ns[nsPath[i]] = i + 1 === nsPath.length ? ns[nsPath[i]] : ns[nsPath[i]] || {};
                ns = ns[nsPath[i]];
            }

            if (!ns && typeof repalce != 'undefined') {
                ns = repalce;
            }

            return ns;
        },
        
        /**
         * >> ([])
         * => true
         * >> ({})
         * => false
         */
        isArray: function (arg) {
            // first way:
            return Object.prototype.toString.call(arg) === '[object Array]';

            // second way:
            //return (arr instanceof Array);
        }
    };

});
