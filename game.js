
var genPattern = [];
var userPattern = [];
var lvl = 1;
const btnColor = ["green", "red", "yellow", "blue"];

//GENERATE RANDOM NUMBERE HERE
function nexSeq()
{
  var randoNum = Math.floor(Math.random()*4);
  var randoChosenColor = btnColor[randoNum];
  genPattern.push(randoChosenColor);
  return randoChosenColor;
}

// PLAY SOUNDS HERE
function playSound(soundColor)
{
  switch (soundColor)
  {
    case "green":
    {
      var sound = new Audio ('./sounds/green.mp3');
      sound.play();
      break;
    }
    case "red":
    {
      var sound = new Audio ('./sounds/red.mp3');
      sound.play();
      break;
    }
    case "yellow":
    {
      var sound = new Audio ('./sounds/yellow.mp3');
      sound.play();
      break;
    }
    case "blue":
    {
      var sound = new Audio ('./sounds/blue.mp3');
      sound.play();
      break;
    }
    default:
    {
      var sound = new Audio ('./sounds/wrong.mp3');
      sound.play();
      break;
    }
  }
}

// firstSeq
$("body").keypress(function()
                      {
                        if (lvl === 1)
                        {
                          userPattern = [];
                          genPattern  = [];
                          $("body").css('background-color', '#011F3F');
                          $(".h2p").css('display', 'none');
                          $(".btn").click(function(event) {
                                                            if ($('#forModal').is(':checked') === true) {
                                                              document.getElementById("forModal").checked = false;     // $("input[type='checkbox']")[0].checked works for jQuery
                                                            }
                                                          });
                          $("#level-title").text("Level " +  lvl);
                          randoChosenColor = nexSeq();
                                                                                          //console.log("#" + randoChosenColor);            // check output
                                                                                          // var t = $.inArray(randoChosenColor, btnColor)    //This helps to get the index number
                          setTimeout(function () {
                                                      $("#" + randoChosenColor).fadeOut(100).fadeIn(150);
                                                      playSound(randoChosenColor);
                                                  }, 500);
                                                                                          // console.log("level " + lvl);
                          lvl++;
                      }
                    })


//click watch and click count
var currentNumOfClick = 0;
var hardStop = 0;
$(".btn").click(function()
                {
                  if (lvl > 1)
                  {
                      currentNumOfClick++;
                      var clsColor = this.classList[1];
                      loop(clsColor);
                  }
                })


//real game logic and subsequent Seq
function loop (clr)
{
  hardStop = 0;
                                                                                  // console.log("<----- #" + clr + "  $$$$$currentNumOfClick = " + currentNumOfClick);
  $("#" + clr).fadeOut(100).fadeIn(150);                                          //flash the buttons
  userPattern.push(clr);                                                          //adds to userpattern list
                                                                                  // console.log("%%%&&& currentNumOfClick "+currentNumOfClick);
  if (userPattern[currentNumOfClick - 1] !== genPattern[currentNumOfClick - 1])
  {
    hardStop = 1;
                                                                                  // console.log("wrong!!");
    $("#level-title").text("Game Over, Press Any Key to Retry");
    playSound();
    $("body").css('background-color', 'red');
    $(".h2p").css('display', 'flex');
    lvl = 1;
    currentNumOfClick = 0;
    return;
  }
  else
  {
    if (currentNumOfClick === (lvl-1))
    {
      playSound(clr);                                                               // Play Sound
                                                                                    // console.log("%%%%% currentNumOfClick "+currentNumOfClick);
      setTimeout(function () {
                                                                                    // console.log ("before check hardstop " + hardStop);        // check  check
                                if (hardStop === 0)
                                {
                                                                                    // console.log ("execution starts now");                //check check
                                    $("#level-title").text("Level " +  lvl);
                                    userPattern =[];
                                    randoChosenColor = nexSeq();
                                                                                          // console.log("-----> #" + randoChosenColor);            // check output
                                    $("#" + randoChosenColor).fadeOut(100).fadeIn(150);
                                    playSound(randoChosenColor);
                                    lvl++;
                                                                                          // console.log("%%%%% level "+ lvl);
                                    currentNumOfClick = 0;
                              }}, 850);
      return;
    }
    else {  playSound(clr); return;  }
  }
}
