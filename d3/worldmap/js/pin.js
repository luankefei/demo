/**
 * @description 世界地图的图钉
 * @dete 2015.04.28
 * @version 0.1
 */
function Pin(countries) {

    // TODO: 暂时由circle代替钉子
    this.draw = function() {

        var svg = d3.select('#svg')
        var objs = d3.selectAll('.country')[0]

        for (var i = 0, length = objs.length; i < length; i++) {

            var obj = d3.select(objs[i])    
            var iso = obj.attr('data-iso')

            // ES 5+ from Array.prototype
            var condition = countries.some(function(value, index, arr) {

                return value == iso
            })

            if (condition) {

                var lat = obj.attr('data-lat'),
                    lon = obj.attr('data-lon'),
                    id = obj.attr('data-id')

                svg.insert('circle')
                    .attr('r', 1)
                    .style('fill', 'yellow')
                    .attr('transform', function(d) {

                        return 'translate(' + index.projection([
                            lon, lat]) + ')'

                    })
                    .attr('data-match', id)
                    .attr('data-iso', iso)
                    .attr('class', 'pin')
            }
        }

        // 使用circle的位置计算出图片的位置，创建图片对象
        var pins = document.getElementsByClassName('pin')

        for (var i = 0; i < pins.length; i++) {

            var body = document.getElementsByTagName('body')[0]
            var position = pins[i].getBoundingClientRect()

            var e = document.createElement('img')

            e.src = 'images/pin.png'
            e.style.position = 'absolute'
            e.style.left = position.x - e.width / 2 + 'px'
            e.style.top = position.y - e.height / 2 + 'px'

            body.appendChild(e)
        }
    }

    return this
}
