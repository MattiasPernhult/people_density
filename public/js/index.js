$(document).ready(function() {
  var socket = io();

  socket.on('data', function(data) {
    var json = JSON.parse(data);

    console.log(JSON.parse(data));

    console.log(json.new_val.floors[0]);
    var peopleValuesObj = {
      '0': (json.new_val.floors[0].People)/100,
      '1': (json.new_val.floors[1].People)/100,
      '2': (json.new_val.floors[2].People)/100
    };

    var soundValuesObj = {
      '0': (json.new_val.floors[0].SoundLevel),
      '1': (json.new_val.floors[1].SoundLevel),
      '2': (json.new_val.floors[2].SoundLevel)
    };

    $.each(peopleValuesObj, function(i, val){
      //$('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 254, 0, '+val+')');
      if(val < 0.45)//green
        $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(0, 214, 103, 1');
      else if(val < 0.75)//yellow
        $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(246, 236, 0, 1)');
      else//red
        $('.floor:nth-child(5) .section').eq(i).css('background', 'rgba(255, 0, 0, 1');
    });

    $.each(soundValuesObj, function(i, val){
      var newVal = val.toString() + '%';
      $('.floor:nth-child(5) .section span').eq(i).animate({
        height: newVal
      });
    });

  });
});
