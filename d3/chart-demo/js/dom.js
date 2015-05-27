//import { Map } from './map'

(function(TE) {

    'use strict'

    var http = T.use('http')
    var chart = T.use('chart')

    var replaceDom = function(ele) {

        var id = ele.getAttribute('id'),
            clas = ele.getAttribute('class'),
            type = ele.getAttribute('data-type')

        var newEle = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

        newEle.setAttribute('id', id)
        newEle.setAttribute('class', clas)
        newEle.setAttribute('data-type', type)

        document.getElementsByTagName('body')[0].appendChild(newEle)

        ele.parentNode.replaceChild(newEle, ele)

        return newEle
    }

    var getData = function(ele, callback) {

        var eleData = ele.getElementsByTagName('data')[0]
        var src = eleData.getAttribute('src')
        var data = null

        if (src == null) {

            data = eleData.innerHTML

            callback && callback(data)

        } else {

            http.loadResource(src, function(data) {

                callback && callback(data)
            })  
        }
    }

    var init = function(ele) {

        var data = getData(ele, function(data) {

            //var interactive = getAct(ele)
        
            var svg = replaceDom(ele)
            var name = ele.getAttribute('data-name')
            
            chart.draw(name, svg, data)
            //initChart(svg, data)
        })
    }

    TE.extend({

        // 按照页面代码初始化图表
        init: init
    })


})(TE)

