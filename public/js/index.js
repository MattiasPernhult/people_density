$(document).ready(function() {
  var socket = io();

  socket.on('data', function(data) {
    var json = JSON.parse(data);

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
      $('.section').eq(i).css('background', 'rgba(255, 0, 0, '+val+')');
    });

    $.each(soundValuesObj, function(i, val){
      var newVal = val.toString() + '%';
      $('.section span').eq(i).animate({
        height: newVal
      });
    });

  });
});
