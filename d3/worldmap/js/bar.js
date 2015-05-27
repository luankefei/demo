/**
 * @description 条形图的绘制
 * @dete 2015.04.28
 * @version 0.1
 */
function Bar(needs) {

     // TODO: 处理tsv数据的函数
    this.getData = function() {

        var values = []
        var datas = []
        var keys = []

        for (var i = 0; i < needs.length; i++) {

            var type = needs[i]['type']
            var count = 0
            var data = ''

            for (var j = 0; j < index.countries.length; j++) {

                var key = index.countries[j] 
                var value = needs[i][key]

                value = value.substring(0, value.length - 1)

                count += Number.parseInt(value)
                data = data + value + ','
            }

            data = data.substring(0, data.length - 1)

            values.push(count)
            // TODO: 暂未使用
            datas.push(data)
            keys.push(type)
        }

        return {
            value: values,
            data: datas,
            keys: keys
        }
    }

    this.toggleLine = function(obj) {

        var sarial = obj.attr('data-sarial')
        var lines = document.querySelectorAll('.line[data-sarial="' + sarial + '"]')

        // 判断是否style是否是hightLight 
        var condition = obj.attr('data-style') === 'highLight'

        if (condition) {

            for (var i = 0; i < lines.length; i++) {

                lines[i].style.display = 'none'
            }

            obj.attr('data-style', '')

        } else {

            for (var i = 0; i < lines.length; i++) {

                lines[i].style.display = 'block'
            }

            obj.attr('data-style', 'highLight')
        }
    }

    this.drawLine = function() {

        var objs = d3.selectAll('.bar')[0]

        for (var i = 0; i < objs.length; i++) {

            var obj = d3.select(objs[i])

            var sarial = obj.attr('data-sarial')
            var data = needs[sarial]

            // 起始点是obj的position
            // 终点是根据iso匹配到的.country节点的position
            var startX, startY,
                endX, endY,
                n = 3

            var svg = d3.select('#svg')

            startX = Number.parseFloat(obj.attr('x')) + 5
            startY = Number.parseFloat(obj.attr('y'))

            for (var item in data) {

                if (item != 'type') {

                    // html 5 dom api support ie 9
                    var e = document.querySelector('.pin[data-iso="' + item + '"]')
                    var rect = e.getBoundingClientRect()

                    // 5是图钉的半径
                    endX = rect.x
                    endY = rect.y - 80

                    d3.select(e).style('fill', 'green')


                    var lineColor = obj.style('fill')

                    svg.insert('path')
                        .attr('class', 'line')
                        .attr('d', tool.getBezier(startX, startY, endX, endY, n))
                        .style('stroke', lineColor)
                        .attr('data-sarial', sarial)

                }
            }
        }
    }

    this.draw = function() {

        var base = this
        var svg = d3.select('#svg')

        var dataset = this.getData()

        var rectValues = dataset.value,
            rectDatas = dataset.data

        // TODO: magic number
        var width = 1500,
            paddingLeft = 210, 
            paddingBottom = 440

        var color = d3.scale.category10()

        // TODO: 上面可以封装成函数，用于计算每行数据的和
        // TODO: 两侧的padding都是magic number    
        var scale = d3.scale.linear()
            .domain([0, d3.max(rectValues)])
            .range([0, 70])

        // 添加立柱
        svg.selectAll('rect')
            .data(rectValues)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('width', 10)
            .attr('height', function(d, i) {
                return scale(d)
            })
            .attr('y', function(d, i) {

                return screen.availHeight - scale(d) - paddingBottom
            })
            .attr('x', function(d, i) {

                return paddingLeft + width / rectValues.length * i
            })
            .attr('fill', function(d, i) {

                return color(i)
            })
            // TODO: 暂未使用
            .attr('data-value', function(d, i) {

                return rectDatas[i]
            })
            .attr('data-sarial', function(d, i) {

                return i
            })
            .attr('data-style', 'highLight')
            .attr('data-avg', function(d, i) {

                var avg = d / rectDatas[i].split(',').length

                return avg.toFixed(2)
            })
            .on('click', function() {

                // TODO: test
                var obj = d3.select(this)

                base.toggleLine(obj)
            })
            .on('mouseover', function(d, i) {

                var obj = d3.select(this)

                // 获取当前元素的位置
                var position = this.getBoundingClientRect()
                var bubble = document.getElementById('bubble')

                bubble.style.left = position.x - 100 + 'px'
                // TODO: 100是magic number
                bubble.style.top = position.y - 100 + 'px'
                bubble.style.display = 'block'

                var node = bubble.getElementsByTagName('dd')[0]

                node.style.color = obj.style('fill')
                node.innerHTML = obj.attr('data-avg') + '%'

            })
            .on('mouseout', function(d, i) {

                var bubble = document.getElementById('bubble')

                bubble.style.display = 'none'
            })

        // 添加说明文本
        svg.selectAll('text')
            .data(dataset.keys)
            .enter()
            .append('text')
            .text(function(d, i) {
                return d
            })
            .attr('x', function(d, i) {

                return width / rectValues.length * i - 4
                //return 170 + width / rectValues.length * i
                //return 100 * i
            })
            .attr('y', function(d, i) {

                return 840
            })
            .attr('transform', function(d, i) {

                var x = paddingLeft + width / rectValues.length * i

                return 'rotate(90, ' + x + ', 840)'
            })
            .attr('class', 'text')


        // 绘制修饰线
        svg.append('line')
            .attr('x1', 0)
            .attr('y1', 618)
            .attr('x2', 1920)
            .attr('y2', 618)
            .style('stroke', '#fff')
            .attr('id', 'ffssd')

        base.drawLine()
    }

    return this
}
