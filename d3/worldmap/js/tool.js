/**
 * @description d3绘图相关工具函数
 * @dete 2015.04.28
 * @version 0.1
 */

var tool = {
    
    loadResource: function(url, callback) {

        var type = url.substring(url.lastIndexOf('.') + 1)

        switch (type) {

            case 'csv':
                d3.csv(url, callback)

                break

            case 'tsv':
                d3.tsv(url, callback)

                break

            case 'json':
                d3.json(url, callback)
        }
    },

    getBezier: function(startX, startY, endX, endY, n) {

        var control1 = [],
            control2 = [],
            control3 = [];

        var cx1, cy1, cx2, cy2;
            cx1 = 1 / 2;
            cy1 = 1 / 3;
            cx2 = 1 / 2;
            cy2 = 2 / 3;

        if (n == 3) {

            control1[0] = (startX + endX) * cx1;
            control1[1] = (startY + endY) * cy1;

            control3[0] = (startX + endX) * cx2;
            control3[1] = (startY + endY) * cy2;

            return 'M' + startX + ',' + startY +
                'C' + control1[0] + ',' + control1[1] + ',' +
                control3[0] + ',' + control3[1] + ',' +
                endX + ',' + endY;
                
        } else if (n == 1) {

            return 'M' + startX + ',' + startY +
                'L' + endX + ',' + endY;
        }
    }
}
