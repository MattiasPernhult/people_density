window.onload = function() {
    var socket = io();
    var charts = [];
    for (var i = 0; i < 4; i++) {
        var chartId;
        var name;
        if (i === 0) {
            chartId = 'summaryChart';
            name = 'Summary Chart';
        } else if (i === 1) {
            chartId = '3AChart';
            name = '3A Chart';
        } else if (i === 2) {
            chartId = '3BChart';
            name = '3B Chart';
        } else {
            chartId = '3CChart';
            name = '3C Chart';
        }
        charts.push(new CanvasJS.Chart(chartId, {
            title: {
                text: 'People Density: ' + name
            },
            axisX: {
                valueFormatString: 'HH:mm:ss'
            },
            animationEnabled: true,
            data: [{
                type: "spline",
                dataPoints: []
            }]
        }));
    }

    for (var j = 0; j < 4; j++) {
        var chart = charts[j];
        chart.render();
    }

    socket.on('data', function(data) {
        var t = data.timestamp;
        var year = t.substring(0, 4);
        var month = t.substring(5, 7);
        var day = t.substring(8, 10);
        var hour = t.substring(11, 13);
        var minute = t.substring(14, 16);
        var second = t.substring(17, 19);
        var date = new Date(year, month, day, hour, minute, second, 0);
        for (var i = 0; i < 4; i++) {
            var chart = charts[i];
            var d = { x: date, y: undefined };
            var people;
            if (i === 0) {
                people = (data.floors[0].people + data.floors[1].people + data.floors[2].people) / 3;
            } else {
                people = data.floors[i-1].people;
            }
            d.y = people;
            chart.options.data[0].dataPoints.push(d);
            chart.render();
        }
    });
};
