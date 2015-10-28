/**
* @name utility
* @class [常用工具方法集合]
* @description : 常用工具方法集合
*/
define(function () {

    var base = {};

    /**
    * 提供对localStorage的 常用方法，
    * 测试用户登陆状态使用
    * @author liwl
    */
    base.localStorage = (function (global) {
        var self = {
            _ls: global.localStorage
        };

        self.set = function (name, value) {
            this._ls.setItem(name, value.toString())
        };

        self.get = function (name) {
            return this._ls.getItem(name);
        };
        self.getAll = function () {
            return this._ls;
        };

        self.del = function (name) {
            var val = this.get(name);

            if (!!val) {
                this.__ls.removeItem("c");
            }
        };

        self.clearAll = function () {
            global.localStorage.clear()
        };

        return self;
    })(window);


    /**
    * 在URL中根据名称返回对应值
    * @param  {string} name [名称]
    * @return {string}      [对应值，若无则返回空]
    * @author liwl
    */
    base.getQueryStringByName = (function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));

        if (!result || result.length < 1) {
            return "";
        }

        return result[1];
    });
    /*
    *判断城市id是否是台湾
    * @param  {int} cityid [城市id]
    * @return {boolean} 
    * @author teller shen
    */
    base.isTwCity = function (cityid) {
        var twCitys = [617, 720, 3844, 3845, 3846, 3847, 3848, 3849, 5152, 5383, 5589, 6954, 7203, 7523, 7524, 7570, 7613, 7614, 7662, 7805, 7808, 7809, 7810, 7811];

        return twCitys.indexOf(cityid) >= 0;
    }
    /**
    * 深度克隆一个对象
    * @param  {Object} value
    * @return {Object}
    */
    base.deepClone = function (jsonObj) {
        var buf;

        if (jsonObj instanceof Array) {
            var i = jsonObj.length;

            buf = [];
            while (i--) {
                buf[i] = this.deepClone(jsonObj[i]);
            }

            return buf;
        } else if (jsonObj instanceof Object) {
            buf = {};

            for (var k in jsonObj) {
                buf[k] = this.deepClone(jsonObj[k]);
            }

            return buf;
        } else {
            return jsonObj;
        }
    };
    /**
    * >> ([1,2,32,4])
    * => [1, 2, 4, 32]
    * >> ([1,2,32,4], false)
    * => [32, 4, 2, 1]
    */
    base.sort = function (arrayList, isAsc) {
        if (typeof isAsc != 'boolean') {
            isAsc = true;
        }
        function sortNumber(a, b) {
            if (!!isAsc) {
                return a - b
            } else {
                return b - a
            }
        }

        return arrayList.sort(sortNumber);
    };
    /** sun.util.array.removeAt(arrayList, *numIndex) 
    * >> ([0, 11,22,33,44], 3)
    * => [0, 11, 22, 44]
    * >> ([0, 11,22,33,44], [2, 1, 0])
    * => [33, 44]
    */
    base.removeAt = function (arrayList, numIndex) {
        if (numIndex < 0 || typeof numIndex === 'undefined') {
            return arrayList;
        } else if (_.isArray(numIndex)) {
            var _index = 0;
            numIndex = this.sort(numIndex, false);
            for (index in numIndex) {
                _index = index - 1;
                arrayList = this.removeAt(arrayList, numIndex[index]);
            }
            return arrayList;
        } else {
            return arrayList.slice(0, numIndex).concat(arrayList.slice(numIndex + 1, arrayList.length));
        }
    };
    /**
    * >> ('yy-MM-dd hh:mm')
    * => "2013-12-04 10:49:25"
    * >> ('yy-MM-dd hh:mm', '2013-12-23 18:33:22')
    * => 13-12-23 18:33
    */
    base.formatTime = function (format, sTime) {
        var _this = new Date();
        if (!!sTime) {
            if (typeof sTime === 'string') {
                sTime = this.replaceAll(sTime, '-', '/');  // IOS 7.1不支持 2012-12-11 00:00:00 这种格式的 new Date()方法
            }
            _this = new Date(sTime);
        }
        var o = {
            "M+": _this.getMonth() + 1, //month
            "d+": _this.getDate(), //day
            "h+": _this.getHours(), //hour
            "m+": _this.getMinutes(), //minute
            "s+": _this.getSeconds(), //second
            "q+": Math.floor((_this.getMonth() + 3) / 3), //quarter
            "S": _this.getMilliseconds() //millisecond
        };
        if (!format) {
            format = "yyyy-MM-dd hh:mm:ss";
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    
    // (string, augments)
    // >> ('{2} {0} {1}, and best {0} for {1}', 'wish', 'you', 'I')
    // => "I wish you, and best wish for you."
    base.stringFormat = function(txt) {
        var reg = new RegExp(/\{(\d+?)\}/i);
        var match = null;
        var idx = 0,
            val = null;

        while ((match = reg.exec(txt)) !== null) {
            idx = (match[1] | 0) + 1;
            val = (typeof arguments[idx] !== 'undefined') ? arguments[idx] : '';

            txt = txt.replace(match[0], val);
        }

        return txt;
    };
    
    /**
    * >> ('I am a boy', 'boy', 'girl')
    * => "I am a girl" 
    */
    base.replaceAll = function (oString, AFindText, ARepText) {
        var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
        return oString.replace(raRegExp, ARepText);
    };

    /**
    * 浮点数计算
    */
    base.Math = {
        /**
        * 获取扩展的位数
        */
        _getExt: function (x, y) {
            var extLengthX = (String(x || 0).split('.')[1] || '').length;
            var extLengthY = (String(y || 0).split('.')[1] || '').length;
            var extLength = Math.max(extLengthX, extLengthY);
            var ext = Math.pow(10, extLength);

            return ext;
        },
        plus: function (x, y) {
            var ext = this._getExt(x, y);
            x = this.multi(x, ext);
            y = this.multi(y, ext);

            return (x + y) / ext;
        },
        minus: function (x, y) {
            var ext = this._getExt(x, y);
            x = this.multi(x, ext);
            y = this.multi(y, ext);

            return (x - y) / ext;
        },
        multi: function (x, y) {
            var extLengthX = (String(x || 0).split('.')[1] || '').length;
            var extLengthY = (String(y || 0).split('.')[1] || '').length;
            var extLength = extLengthX + extLengthY;

            x = Number(String(x || 0).replace('.', ''));
            y = Number(String(y || 0).replace('.', ''));

            return (x * y) / Math.pow(10, extLength);
        },
        div: function (x, y) {
            var ext = this._getExt(x, y);
            x = this.multi(x, ext);
            y = this.multi(y, ext);

            return x / y;
        }
    };



    /**
    * console.log方法   除dev外 其它 return false
    * @param  {Object} value
    * @return {Object}
    */
    base.log = function (obj) {
        return false;

        console.log(obj);
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvv caller start vvvvvvvvvvvvvvvvvvvvvvvvvv');
        console.log(arguments.callee.caller.toString());
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^ caller end ^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    };

  

    /**
     * 修改url
     * @param querystring {Object} 要替换的参数
     */
    base.updateUrl = function(querystring,deletes){
        var u = new base.URL(location.href);
        deletes = deletes || [];
        if(querystring){
            u.setQuery(querystring);
        }
        if(deletes && deletes.length){
            u.removeQuery(deletes);
        }
        if(history.replaceState){
            history.replaceState({},'',u.buildUrl());
        }
    };
    
    base.location = {
        _replaceState: function(sQueryString) {
            if (!!history) {
                //这里可以是你想给浏览器的一个State对象，为后面的StateEvent做准备。
                var state = {
                    title : "HTML 5 History API simple demo",
                    url : location.origin + location.pathname + sQueryString
                };

                history.replaceState(state, 'title', sQueryString);
            } else {
                location.replace(sQueryString);
            }
        },

        // 返回新的localtion.search的值
        _getNewUrlSearch: function (keyName, keyValue, _search) {
            if (keyName != null && keyValue != null) {
                var newParams = keyName + '=' + keyValue;
                var re = new RegExp("(?![\?\&])\\b" + keyName + "[=][^&#]*", 'img');

                if (re.test(_search)) {
                    _search = _search.replace(re, newParams);
                } else {
                    if (_search.indexOf('?') > -1) {
                        _search += '&' + newParams;
                    } else {
                        _search += '?' + newParams;
                    }
                }
            }

            return _search;
        },

        // 返回新的localtion.search的值
        _removeByName: function (keyName, _search) {
            if (keyName != null) {
                var re = new RegExp("[\?\&]\\b" + keyName + "[=][^&#]*", 'img');

                if (re.test(_search)) {
                    _search = _search.replace(re, '');
                }

                if (!_.isEmpty(_search) && _search[0] == '&') {
                    _search = _search.replace('&', '?');
                }
            }

            return _search;
        },

        // 根据传入的URL进行解析
        parseUrl : function (sUrl) {
            var url = sUrl || '';

            url = url.replace(/\\/g, '/');

            var host = '',
            protocol = '',
            port = '',
            path = '',
            query = '',
            hash = '',

            paths = [],
            querys = {};
            var a;
            //解析协议名
            if (url.indexOf('://') > -1) {
                a = url.split(':');
                protocol = a.shift() + ':';
                url = a.join(':');
            }
            //解析主机名
            if (url.indexOf('//') === 0) {
                url = url.replace('//', '');
                a = url.split('/');
                host = a.shift();
                url = a.join('/');
                if (host.indexOf(':') > -1) {
                    a = host.split(':');
                    host = a[0];
                    port = a[1];
                }
            }
            //解析路径，queryString，hash
            if (url.search(/^(?:[^#]*)\?/i) > -1) {
                url = url.replace(/\?+/g, '?');
                a = url.split('?');
                path = a.shift();
                url = a.join('?');
                a = url.split('#');
                query = a.shift();
                hash = a.join('#');
            } else {
                a = url.split('#');
                path = a.shift();
                url = a.join('#');
                hash = url;
            }

            paths = path.split('/');

            if (query) {
                a = query.split(/&/);
                var b;
                for (var i = 0, len = a.length; i < len; i++) {
                    b = a[i].split('=');
                    querys[b[0]] = b[1] || '';
                }
            }

            var _hostname = host + ':' + port;
            var _origin = protocol + '//' + host + ':' + port;
            var _search = '?' + url;
            var _pathname = '/' + path;
            var _href = _origin + _pathname + _search;

            return {
                hash : hash,
                host : _hostname,
                hostname: host,
                href: _href,
                origin: _origin,
                pathname : _pathname,
                paths : paths,
                port : port,
                protocol : protocol,
                querys : querys,
                search: _search,
            };
        },

        // 更新localtion.pathname
        // @param oObject {object} 段位和值的键值对: { {string} : {object} } => key为参数名称，value为值
        // @param sPathname {string}? 默认为当前的location.search
        // e.g.: ({ day: '50', '1-2' : '12341234' })
        updateSearch: function (oObject, sSearch) {
            var _queryString = sSearch || location.search;
            var self = this;

            if ((oObject instanceof Object) && !_.isEmpty(oObject)) {
                _.each(oObject, function (v, k) {
                    // 删除此key值
                    if (!v && v != '0') {
                        _queryString = self._removeByName(k, _queryString);
                    } else {
                        _queryString = self._getNewUrlSearch(k, v, _queryString);
                    }

                });

                // 如果_queryString为空的话，history.replaceState不可执行
                if (_queryString.indexOf('?') < 0) {
                    _queryString += '?' + _queryString
                }

                this._replaceState(_queryString);
            }

            return location.href;
        },

        // 更新localtion.pathname
        // @param oObject {object} 段位和值的键值对: { {number} : {object} } 其中number为0时，默认更新为最后一段
        // @param sPathname {string}? 默认为当前的location.pathname
        // e.g: ({ 1 : 'webapp', 0 : 'default.html' })
        updatePathname: function(oObject, sPathname) {
            var _pathname = sPathname || location.pathname;
            var _pathnameList = _pathname.match(/\/{1}[^\/]*/ig) || [];

            if ((oObject instanceof Object) && !_.isEmpty(oObject)) {
                var _section = 0,
                    _value = '';

                _.each(oObject, function (v, k) {
                    _section = k | 0;
                    // value转为string
                    v = v + '';
                    // 如果 value为空，则为删除此段位
                    _value = !!v ? '/' + v : '';

                    if (_section > 0) {
                        _pathnameList[_section - 1] = _value;
                    } else {
                        _pathnameList[_pathnameList.length - 1] = _value;
                    }
                })

                this._replaceState(_pathnameList.join('') + location.search);
            }

            return location.href;
        },

        // 只对传入的参数进行修改，不更改当前浏览器的URL
        // @param oObject {object} 段位和值的键值对: { {string} : {object} } => key为参数名称，value为值
        // @param sUrl {string}? url地址
        // e.g.: ({ day: '', '1-2' : '12341234' }, 'https://www.baidu.com?day=50&1-2=222')
        // 删除day ,更新1-2参数
        formatSearch: function (oObject, sUrl) {
            var _url = this.parseUrl(sUrl);
            var _queryString = _url.search;
            var resultUrl = sUrl;
            var self = this;

            if ((oObject instanceof Object) && !_.isEmpty(oObject)) {
                _.each(oObject, function (v, k) {
                    // 删除此key值
                    if (!v && v != '0') {
                        _queryString = self._removeByName(k, _queryString);
                    } else {
                        _queryString = self._getNewUrlSearch(k, v, _queryString);
                    }

                });

                // 如果_queryString为空的话，history.replaceState不可执行
                if (_queryString.indexOf('?') < 0) {
                    _queryString += '?' + _queryString
                }

                resultUrl = _queryString;
            }

            return _url.origin + _url.pathname + resultUrl;
        }
    };
        
    
    return base;
});
