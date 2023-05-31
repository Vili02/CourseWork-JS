const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    //converting 24 hours to 12
    hours = hours % 12 || 12;

    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

    //call the function on page load
    updateTime();

    //call function after every second
    setInterval(updateTime,1000);

    //Stopwatch
    let stopwatchHours = 0,
        stopwatchMinutes = 0,
        stopwatchSeconds = 0,
        stopwatchMiliSeconds = 0,
        stopwatchRunning = false,
        laps = 0,
        stopwatchInterval;

        const stopwatch = () =>{
            //incerase miliseconds by one
            stopwatchMiliSeconds++;

            if(stopwatchMiliSeconds === 100){
                stopwatchSeconds++;
                stopwatchMiliSeconds = 0;
            }

            if(stopwatchSeconds === 60){
                stopwatchMinutes++;
                stopwatchSeconds = 0;
            }

            if(stopwatchMinutes === 60){
                stopwatchHours++;
                stopwatchMinutes = 0;
            }

            $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
            $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
            $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
            $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
        };

        const startStopwatch = () =>{
            if(!stopwatchRunning){
                stopwatchInterval = setInterval(stopwatch,10);
                stopwatchRunning = true;
            }
        };
    //function to stop stopwatch
        const stopStopwatch = () =>{
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
        };

    //reset stopwatch function
        const resetStopwatch = () => {
        //clear interval and set all values to default
            clearInterval(stopwatchInterval);
            stopwatchHours = 0,
            stopwatchMinutes = 0,
            stopwatchSeconds = 0,
            stopwatchMiliSeconds = 0,
            stopwatchRunning = false,
            laps = 0,

        //update values on document to 00
            $("#stopwatch-hour").html("00");
            $("#stopwatch-min").html("00");
            $("#stopwatch-sec").html("00");
            $("#stopwatch-ms").html("00");
            $(".laps").html("");
        };

    //start stopwatch on start button
        $(".start-stopwatch").click(function (){
            startStopwatch();
    //hide start button show lap button        
            $(".start-stopwatch").hide();
            $(".lap-stopwatch").show()
        });

        $(".reset-stopwatch").click(function (){
            resetStopwatch();
            $(".start-stopwatch").show();
            $(".lap-stopwatch").hide();
        });

        $(".lap-stopwatch").click(function (){
        //on lap button click
        laps++;
        $(".lap").removeClass("active");
        $(".laps").prepend(
           `<div class="lap active">
              <p>Lap ${laps}</p>
              <p>
                ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
              stopwatchMinutes
            )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
              stopwatchMiliSeconds
            )}
              </p>
            </div>`
          );
        }); 

        let time = 0;
        timerHours = 0,
        timerMinutes = 0,
        timerSeconds = 0,
        timerMiliSeconds = 0,
        timerInterval;

        const getTime = () =>{
            time = prompt("Enter time in minutes");
            //convert time to seconds
            time = time * 60;
            //update timer defaults
            setTime();
        };

        const setTime = () =>{
            timerHours = Math.floor(time / 3600);
            timerMinutes = Math.floor((time / 3600) / 60);
            timerSeconds = Math.floor(time % 60);

            $("#timer-hour").html(addTrailingZero(timerHours));
            $("#timer-min").html(addTrailingZero(timerMinutes));
            $("#timer-sec").html(addTrailingZero(timerSeconds));
            $("#timer-ms").html(addTrailingZero(timerMiliSeconds));
        };

        const timer = () =>{
            imerMiliseconds--;
              if (timerMiliseconds === -1) {
                timerMiliseconds = 99;
                timerSeconds--;
              }
              if (timerSeconds === -1) {
                timerSeconds = 59;
                timerMinutes--;
              }
              if (timerMinutes === -1) {
                timerMinutes = 59;
                timerHours--;
              }
        }

        $(".start-timer").click(function (){
            getTime();
        });










