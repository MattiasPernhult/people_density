$(document).ready(function() {
  var socket = io();

  socket.on('data', function(data) {
    var json = JSON.parse(data);

    var peopleValuesObj = {
      '0': (json.new_val.floors[0]['3A'].people)/100,
      '1': (json.new_val.floors[0]['3B'].people)/100,
      '2': (json.new_val.floors[0]['3C'].people)/100
    };

    var soundValuesObj = {
      '0': (json.new_val.floors[0]['3A'].soundLevel),
      '1': (json.new_val.floors[0]['3B'].soundLevel),
      '2': (json.new_val.floors[0]['3C'].soundLevel)
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
