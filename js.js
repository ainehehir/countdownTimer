const btn = document.getElementById("btn");
let dateErr = document.querySelector(".displayDateErr");
let now = new Date();
let timer = "";
let date;

btn.addEventListener("click", function () {
  validate();
});

function validate(startDate) {
  let name = document.getElementById("name");
  let newDate = document.getElementById("date");

  if (name.value == "") {
    document.querySelector(".displayNameErr").innerHTML = "Please enter name";
    name.focus();
    return false;
  } else {
    document.querySelector(".displayNameErr").innerHTML = "";
  }

  if (newDate.value == "") {
    dateErr.innerHTML = "Please select a date";
    newDate.focus();
    return false;
  }

  dateErr.innerHTML = "";
  getTime(newDate.value);
}

function getTime(startDate) {
  let time = document.getElementById("time").value;
  clearInterval(timer);
  startDate = new Date(startDate);

  if (time !== "") {
    let startHours = time.split(":")[0];
    let startMinutes = time.split(":")[1];
    var suffix = startHours >= 12 ? "pm" : "am";
    startHours = startHours % 12 || 12;
    startHours = startHours < 10 ? "0" + startHours : startHours;

    let displayTime = startHours + ":" + startMinutes + " " + suffix;
    document.querySelector(".display-time").innerHTML = displayTime;
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    // console.log(startDate);
  }

  if (startDate < now) {
    dateErr.innerHTML = "Please select a date in the future";
    return false;
  }

  dateErr.innerHTML.innerHTML = "";
  date = startDate.getTime();

  function updateTimer(date) {
    let now = new Date().getTime();
    let distance = date - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(days);

    document.querySelector(".display-day").innerHTML = days;
    document.querySelector(".display-hours").innerHTML = hours;
    document.querySelector(".display-minutes").innerHTML = minutes;
    document.querySelector(".display-seconds").innerHTML = seconds;

    if (now >= date) {
      clearInterval(timer);
      document.querySelector(".display-day").innerHTML = "O";
      document.querySelector(".display-hours").innerHTML = "V";
      document.querySelector(".display-minutes").innerHTML = "E";
      document.querySelector(".display-seconds").innerHTML = "R";
    }
  }

  timer = setInterval(function () {
    updateTimer(date);
  }, 1000);
}
