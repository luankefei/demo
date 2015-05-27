'use strict'

/**
 * @description 世界地图的绘制
 * @dete 2015.04.28
 * @version 0.1
 */
class Map {

    constructor(svg, data) {
        this.data = data
        this.width = null
        this.height = null
        this.svg = svg
    }

    draw() {

        var style = getComputedStyle(this.svg)

        // TODO: 250和130是试出来的magic number
        var projection = d3.geo.equirectangular()
            .scale(250)
            .translate([this.width / 2, this.height / 2 - 130])
            .precision(.1);

        var path = d3.geo.path()
            .projection(projection)

        var graticule = d3.geo.graticule()

        var svg = d3.select(this.svg)
        var world = this.data

        svg.attr('version', '1.1')
        svg.attr('xmlns', 'http://www.w3.org/1999/svg')

        svg.attr('width', this.width)
            .attr('height', this.height)

        if (world !== null) {

            var countries = topojson.feature(world, world.objects.countries).features,
                neighbors = topojson.neighbors(world.objects.countries.geometries)

            svg.selectAll('path')
                .data(countries)
                .enter()
                .insert('path', '.graticule')
                .attr('d', path)
                .style('fill', style.fill)
                .style('stroke', style.stroke)
                .style('stroke-width', style.strokeWidth)
                .attr('data-id', function(d) {

                    return d.id
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
}

//export default Map
//export { m }
