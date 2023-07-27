$(function () {
  $(".num").numScroll({
    number: 180456,
    time: 1900,
    delay: 0,
  }).css({"background-color": "orange", 
  "font-size":"1.2em", "display" : "flex",
  "justify-content":"center", "padding":"2em",
  "margin":"18%"
}).animate({top: '150px', opacity: '0.6', height: '50%',
width: '40%'})

});
