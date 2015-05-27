/**
 * @description 世界地图的绘制
 * @dete 2015.04.28
 * @version 0.1
 */
function Map(world) {

    this.width = null
    this.height = null

    this.draw = function() {

        // TODO: 250和130是试出来的magic number
        var projection = index.projection = d3.geo.equirectangular()
            .scale(250)
            .translate([this.width / 2, this.height / 2 - 130])
            .precision(.1);

        var path = d3.geo.path()
            .projection(projection)

        var graticule = d3.geo.graticule()

        var svg = d3.select('body').append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('id', 'svg')

        svg.append('defs').append('path')
            .datum({
                type: 'Sphere'
            })
            .attr('id', 'sphere')
            .attr('d', path)


        svg.append('path')
            .datum(graticule)
            .attr('class', 'graticule')
            .attr('d', path)

        if (world !== null) {

            var countries = topojson.feature(world, world.objects.countries).features,
                neighbors = topojson.neighbors(world.objects.countries.geometries)

            svg.selectAll('.country')
                .data(countries)
                .enter().insert('path', '.graticule')
                .attr('class', 'country')
                .attr('d', path)
                .style('fill', function(d, i) {
                    return 'transparent'
                })
                .attr('data-id', function(d) {

                    return d.id
                })
                // TODO: 点击后的图表联动
                .on('mouseover', function() {

                    var obj = d3.select(this)

                    obj.style('fill', 'red')
                })
                .on('mouseout', function() {

                    var obj = d3.select(this)

                    obj.style('fill', 'transparent')
                })
                .on('click', function() {

                    var id = d3.select(this).attr('data-id')

                    alert(id)
                })

            svg.insert('path', '.graticule')
                .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
                    return a !== b;
                }))
                .attr('class', 'boundary')
                .attr('d', path)

        }

        d3.select(self.frameElement).style('height', this.height + 'px')
    }

    return this
}
