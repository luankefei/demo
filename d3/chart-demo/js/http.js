

(function(TE) {

    'use strict'

    // 通过私有定义的方法是模块和TE对象共有的
    var _getJson = function(url, callback) {

        var req = new XMLHttpRequest()

        req.open('GET', url)
        req.onreadystatechange = function() {

            if (req.status == 200 && req.readyState == 4) {

                var data = JSON.parse(req.responseText)

                callback && callback(data)
            }
        }

        req.setRequestHeader('Content-Type', 'application/json')
        req.send(null)
    }

    var _getScript = function(url, callback) {

        var script = document.createElement('script')
        var body = document.getElementsByTagName('body')[0]

        script.src = url
        script.onload = callback

        body.appendChild(script)

        return script
    }

    T.define('http', [], function() {

        var http = {

            getScript: _getScript,

            getJson: _getJson,

            loadResource: function(url, callback) {

                var type = url.substring(url.lastIndexOf('.') + 1)

                switch (type) {

                    case 'json':
                        http.getJson(url, callback)

                        break

                    default:
                        break
                }
            }
        }

        return http
    })

    TE.extend({

        getJson: _getJson,
        getScript: _getScript
    })

})(TE)
