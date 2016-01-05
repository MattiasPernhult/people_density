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
            //$('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 254, 0, '+val+')');
            if (val < 0.45) //green
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(0, 214, 103, 1');
            else if (val < 0.75) //yellow
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(246, 236, 0, 1)');
            else //red
                $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 0, 0, 1');
        });

        $.each(soundValuesObj, function(i, val) {
            var newVal = val.toString() + '%';
            $('.floor:nth-child(5) .section span').eq(i).animate({
                height: newVal
            });
        });

    });
});
