 //Clock
const updateTime = () =>{
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

    $(".stopwatch-btn").click(function (){
        //hide all other wrappers
        $(".main-container > div").slideUp();
        //show stopwatch wrapper
        $(".stopwatch").slideDown();
        //update type text
        $(".type").html("Stopwatch"); 
    });
    
    $(".timer-btn").click(function (){
        //hide all other wrappers
        $(".main-container > div").slideUp();
        //show timer wrapper
        $(".timer").slideDown();
        //update type text
        $(".type").html("Timer"); 
    });

    $(".back-btn").click(function (){
        //hide all other wrappers
        $(".main-container > div").slideUp();
        //show clock wrapper
        $(".clock").slideDown();
        //update type text
        $(".type").html("Clock"); 
    });

    //Stopwatch
    let stopwatchHours = 0,
        stopwatchMinutes = 0,
        stopwatchSeconds = 0,
        stopwatchMiliSeconds = 0,
        stopwatchRunning = false,
        laps = 0,
        stopwatchInterval;

        function stopwatch () {
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
        }

        function startStopwatch () {
            if(!stopwatchRunning){
                stopwatchInterval = setInterval(stopwatch,10);
                stopwatchRunning = true;
            }
        }

    //function to stop stopwatch
        function stopStopwatch () {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
        }

        //reset stopwatch function
        function resetStopwatch () {
        //clear interval and set all values to default
            clearInterval(stopwatchInterval);
            stopwatchHours = 0;
            stopwatchMinutes = 0;
            stopwatchSeconds = 0;
            stopwatchMiliSeconds = 0;
            laps = 0;

        //update values on document to 00
            $("#stopwatch-hour").html("00");
            $("#stopwatch-min").html("00");
            $("#stopwatch-sec").html("00");
            $("#stopwatch-ms").html("00");
        }

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
            $(".laps").html("");
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

        function addTrailingZero (number) {
            return number < 10 ? "0" + number : number;
        }

        let time = 0,
        timerHours = 0,
        timerMinutes = 0,
        timerSeconds = 0,
        timerMiliSeconds = 0,
        timerRunning = false,
        timerInterval;

        function getTime () {
            time = prompt("Enter time in minutes");
            //convert time to seconds
            time = time * 60;
            //update timer defaults
            setTime();
        }

        function setTime () {
            timerHours = Math.floor(time / 3600);
            timerMinutes = Math.floor((time % 3600) / 60);
            timerSeconds = Math.floor(time % 60);

            $("#timer-hour").html(addTrailingZero(timerHours));
            $("#timer-min").html(addTrailingZero(timerMinutes));
            $("#timer-sec").html(addTrailingZero(timerSeconds));
            $("#timer-ms").html(addTrailingZero(timerMiliSeconds));
        }

        function timer() {
            timerMiliSeconds--;
              if (timerMiliSeconds === -1) {
                timerMiliSeconds = 99;
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
                $("#timer-hour").html(addTrailingZero(timerHours));
                $("#timer-min").html(addTrailingZero(timerMinutes));
                $("#timer-sec").html(addTrailingZero(timerSeconds));
                $("#timer-ms").html(addTrailingZero(timerMiliSeconds));

            //check time up on every interval
            timeUp();
        };

        function startTimer() {
            //before start check if valid time given
            if(timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliSeconds === 0){
                //if all values are zero get time
                getTime();
            }else{
                //start timer
                timerInterval = setInterval(timer,10);
                timerRunning = true;
                $(".start-timer").hide();
                $(".stop-timer").show();                
            }
        }

        function stopTimer () {
            clearInterval(timerInterval);
            timerRunning = false;
            $(".start-timer").show();
            $(".stop-timer").hide();
        }

        function resetTimer () {
            stopTimer();
            time = 0;
            setTime();
        }

        //check if time remaining
        function timeUp () {
            if(timerHours === 0 && 
                timerMinutes === 0 && 
                timerSeconds === 0 && 
                timerMiliSeconds === 0){
                stopTimer();
                alert("Time's up!");
            }
        }

        $(".start-timer").click(startTimer);

        $(".stop-timer").click(stopTimer);

        $(".reset-timer").click(function(){
            resetTimer();
            if (!timerRunning) {
                $(".start-timer").show();
                $(".stop-timer").hide();
              }
        });










