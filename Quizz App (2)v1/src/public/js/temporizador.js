 
 var momentoActual=new Date();
 
 console.log(momentoActual);
 var finQuizz=momentoActual.getMinutes()+30;

 console.log(finQuizz);
 var tiempoQuizz=momentoActual


 tiempoQuizz.setMinutes(finQuizz);

 // This is an example with default parameters
  simplyCountdown('div.temporizador', {
    year: tiempoQuizz.getFullYear(), // required
    month: (tiempoQuizz.getMonth()+1), // required
    day: tiempoQuizz.getDate(), // required
    hours:tiempoQuizz.getHours(), // Default is 0 [0-23] integer
    minutes: tiempoQuizz.getMinutes(), // Default is 0 [0-59] integer
    seconds: tiempoQuizz.getSeconds(), // Default is 0 [0-59] integer
    words: { //words displayed into the countdown
        days: { singular: 'días', plural: 'díass' },
        hours: { singular: 'hora', plural: 'horas' },
        minutes: { singular: 'minuto', plural: 'minutos' },
        seconds: { singular: 'segundo', plural: 'segundos' }
    },
    plural: true, //use plurals
    inline: false, //set to true to get an inline basic countdown like : 24 days, 4 hours, 2 minutes, 5 seconds
    inlineClass: 'simply-countdown-inline', //inline css span class in case of inline = true
    // in case of inline set to false
    enableUtc: false, //Use UTC or not - default : false
    onEnd: function() { caliz()}, //Callback on countdown end, put your own function here
    refresh: 1000, // default refresh every 1s
    sectionClass: 'simply-section', //section css class
    amountClass: 'simply-amount', // amount css class
    wordClass: 'simply-word', // word css class
    zeroPad: false,
    countUp: false
});