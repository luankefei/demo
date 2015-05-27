/**
 * @description 绘图的主体文件，包括控制整个绘图流程的入口函数
 * @date 2015.04.27
 */
var index = {

    // 绘图属性
    width: null,
    height: null,
    projection: null,

    // 公共资源
    world: null,
    treaties: null,
    country: null,
    geography: null,

    // 数据对应的是 'US', 'Mexico', 'UK', 'China', 'Japan', 'Thailand', 'Indo', 'India', 'Russia', 'South Africa'
    countries: ['US', 'MX', 'GB', 'CN', 'JP', 'TH', 'ID', 'IN', 'RU', 'ZA'],

    // TODO: 临时添加的函数，用于补全每个path的属性
    addPathAttr: function() {

        var objArr = d3.selectAll('.country')[0]
        var treaties = index.treaties
        var geography = index.geography

        for (var i = 0, length = objArr.length; i < length; i++) {

            var obj = d3.select(objArr[i])
            var id = obj.attr('data-id')


            // 添加英文名
            for (var j = 0; j < treaties.length; j++) {

                if (treaties[j]['iso'] == id) {

                    obj.attr('data-name', treaties[j]['name'])
                    obj.attr('data-iso', treaties[j]['iso2'])
                }
            }

            var country = geography.countries[obj.attr('data-iso')]

            if (typeof country !== 'undefined') {

                var lat = country.lat,
                    lon = country.lon

                obj.attr('data-lat', lat)
                    .attr('data-lon', lon)

            }
        }
    },

    // 在页面初始化过程中加载全部资源
    init: function(callback) {

        var code = 0

        tool.loadResource('data/world.json', function(err, data) {
            index.world = data
            ++code
        })

        tool.loadResource('data/treaties.tsv', function(err, data) {
            index.treaties = data
            ++code
        })

        tool.loadResource('data/country.csv', function(err, data) {
            index.country = data
            ++code
        })

        tool.loadResource('data/country_lat_lon.json', function(err, data) {
            index.geography = data
            ++code
        })

        tool.loadResource('data/needs.tsv', function(err, data) {
            index.needs = data
            ++code
        })

        var wait = setInterval(function() {

            if (code === 5) {

                console.log('resource loaded !')
                clearInterval(wait)

                callback && callback()
            }

        }, 100)
    }
}

!function() {

    index.init(function() {

        // 初始化地图
        var map = new Map(index.world)

        map.width = screen.availWidth
        map.height = screen.availHeight

        map.draw()

        // 补全每个国家path的属性
        index.addPathAttr()

        // 绘制钉子
        var pin = new Pin(index.countries)

        pin.draw()

        // 绘制条形图
        var bar = new Bar(index.needs)
        
        bar.draw()
    })
}()

