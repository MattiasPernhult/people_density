$(document).ready(function() {
    var socket = io();

    socket.on('data', function(data) {
        var peopleValuesObj = {
            '0': (data.floors[0].people) / 100,
            '1': (data.floors[1].people) / 100,
            '2': (data.floors[2].people) / 100
        };

        var soundValuesObj = {
            '0': (data.floors[0].soundLevel),
            '1': (data.floors[1].soundLevel),
            '2': (data.floors[2].soundLevel)
        };

        $.each(peopleValuesObj, function(i, val) {
            if (val < 0.15) {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(102, 255, 102, 1)');
            } else if (val < 0.30) {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 255, 102, 1)');
            } else if (val < 0.45) {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 217, 102, 1)');
            } else if (val < 0.60) {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 179, 102, 1)');
            } else if (val < 0.75) {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 140, 102, 1)');
            } else {
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 102, 102, 1)');
            }

        });

        $.each(soundValuesObj, function(i, val) {
            var newVal = val.toString() + '%';
            $('.floor:nth-child(5) .section span').eq(i).animate({
                height: newVal
            });
        });

    });
});
