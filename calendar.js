var date = new Date();
var dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var year;
var month;
var yearsInterval;

window.onload = function(){
  getCurrentDay();
  document.getElementById("text").oninput = function(){ putPoint(); };
  document.getElementById("text").onkeydown = function(e){ keyPressOnInput(e); };
  document.getElementById("text").onchange = function(){ getDateWithInput(); };
  document.getElementById("text").onclick = function(){ setPosCursor(); };
  document.onclick = function(e){
    if (e.currentTarget.activeElement.localName != "input")
        parseLineInput();
  }
  document.getElementById("left").onclick = function(){previous();};
  document.getElementById("right").onclick = function(){next();};
  document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
  document.getElementsByClassName("button")[0].onclick = function () 
  {
    document.getElementById("left").onclick = function(){previous();};
    document.getElementById("right").onclick = function(){next();};
    document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
    getCurrentDay();
  }
}

function getCaretPosition (oField){
  var iCaretPos = 0;
  if (document.selection) {
    oField.focus ();
    var oSel = document.selection.createRange ();
    oSel.moveStart ('character', -oField.value.length);
    iCaretPos = oSel.text.length;
  }
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;
  return (iCaretPos);
}

function putPoint(){
  var input = document.getElementById("text");
  var cursorPosition = getCaretPosition(input);
  if (cursorPosition == 2){
    if (input.value[2] != undefined)
      input.value[2] =  ".";
    else
      input.value += ".";
  }
  if (cursorPosition == 5){
    if (input.value[5] != undefined)
      input.value[5] =  ".";
    else
      input.value += ".";
  }
  cursorPosition = getCaretPosition(input);
  if (cursorPosition == 1){
    var num = parseInt(input.value.substring(0,1));
    if (num > 3){
      var tmp = input.value.substring(2, input.value.length);
      input.value = "0" + num + "." + tmp;
    }
  }
  cursorPosition = getCaretPosition(input);
  if (cursorPosition == 4){
    var num = parseInt(input.value.substring(3,4));
    if (num > 1){
        var dayTemp = input.value.substring(0,3);
        var yearTemp = input.value.substring(5,9); 
        input.value = dayTemp + "0" + num + "." + yearTemp;
      }
  }    
}

function keyPressOnInput(e){
  var input = document.getElementById("text");
  if(e.keyCode == 8 ) {
       input.oninput = null;
  }
  else{
    var cursorPosition = getCaretPosition(input);
    if (cursorPosition <= 2 || cursorPosition <= 5){
      if (cursorPosition == 2){
        if (input.value[2] != undefined)
          input.value[2] =  ".";
        else
          input.value += ".";
      }
      if (cursorPosition == 5){
        if (input.value[5] != undefined)
          input.value[5] =  ".";
        else
          input.value += ".";
      }
      input.oninput = function(e){ putPoint(e); };
    }
  }
  if (e.keyCode == 13 && input.value.length == 10){
    getDateWithInput();
  }
}

function setPosCursor(){
  var input = document.getElementById("text");
  var cursorPosition = getCaretPosition(input);
  if (input.value.length > 10){
    parseToDate();
  }
  if (cursorPosition == 0)
    input.setSelectionRange(0, 2);
  if (cursorPosition == 3)
    input.setSelectionRange(3, 5);
  if (cursorPosition == 6)
    input.setSelectionRange(6, 10);
}

function getDateWithInput(){
  var input = document.getElementById("text");
  if (input.value.length != 10)
    return;
  var inputDay = parseInt(input.value.substring(0,2));
  if(inputDay > 31){
    inputDay = 1;
    var tmp = input.value.substring(2, input.value.length);
    input.value = "0" + 1  + tmp;
  }
  month = parseInt(input.value.substring(3,5)) - 1;
  if(month > 12){
    month = 1;
    var dayTemp = input.value.substring(0,3);
    var yearTemp = input.value.substring(5,10); 
    input.value = dayTemp + "0" + 1 + yearTemp;
  }
  year = parseInt(input.value.substring(6,10));
  if (isNaN(inputDay) || isNaN(month)  || isNaN(year) || year <= 0 || month <= 0 || inputDay <= 0){
    getCurrentDay();
    return;
  }
  
  document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
  getInfo(inputDay, month, year)
}

function parseLineInput(){
  var input = document.getElementById("text");
  if (input.value.length > 10)
    return;
  var inputDay = input.value.substring(0,2);
  month = input.value.substring(3,5) - 1;
  year = input.value.substring(6,10);
  input.value = inputDay + " " + monthName[month] + " " + year;
}
function parseToDate(){
  var input = document.getElementById("text");
  var line = input.value.split(' ');
  var monthTemp = parseInt(monthName.indexOf(line[1])) + 1;
  if (monthTemp < 10)
    monthTemp = "0" + monthTemp;
  input.value = line[0] + "." + monthTemp + "." + line[2];
}

function getCurrentDay(){
  month = date.getMonth();
  year = date.getFullYear();
  getInfo(date.getDate(), month, year);
  document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
}

function getInfo(day, month, year){
  var table = document.getElementsByTagName("table")[0];
  if (table != undefined)
    table.parentNode.removeChild(table);
  var firstDate = monthName[month] + " " + 1 + " " + year;
  var tmp = new Date(firstDate).toDateString();
  var firstDay = tmp.substring(0,3);
  var dayNum = dayName.indexOf(firstDay);
  var days = new Date(year, month + 1, 0).getDate();
  var prevDays = new Date(year, month , 0).getDate();
  getCalendar(dayNum, days,prevDays, day);
  var input = document.getElementById("text");
  if (day == undefined)
    day = "01";
  input.value = day + " " + monthName[month] + " " + year;
}

function getCalendar(dayNum, nDays, nPrevDays, currentDay){
  nPrevDays -= dayNum - 1;
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  for (var i = 0; i <= 6; i++){
    var td = document.createElement('td');
    td.innerHTML = dayName[i].substring(0,2);
    tr.appendChild(td);
    td.className = "weeks";
  }
  table.appendChild(tr);
  var counter = 0, countDays = 1, nextDays = 1;

  for (var i = 1; i <= 6; i++){
    var tr = document.createElement('tr');
    for (var j = 0; j <= 6; j++ , counter++) {
      var td = document.createElement('td');
      if (counter == dayNum || counter > dayNum){
        if (countDays == date.getDate() && year == date.getFullYear() && month == date.getMonth()
         || ( currentDay != undefined && countDays == currentDay))
        {
          if (currentDay != undefined && countDays == currentDay && currentDay != date.getDate())
            td.className = "current-day";
          else
            td.className = "today";
          td.innerHTML = countDays;
          countDays++;
        }

        else if(countDays > nDays){
          td.innerHTML = nextDays;
          nextDays++;
          td.className = "next-days";
        }
        else{
          td.innerHTML = countDays;
          countDays++;
          td.className = "days";
        }
      }
      else{
        td.innerHTML = nPrevDays;
        nPrevDays++;
        td.className = "prev-days";
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  table.classList.add("calendar-number");
  document.getElementById("calendar-dates").appendChild(table);
  refreshClick();
}

function previous(){
  month--;
  if (month < 0){
    year--;
    month = 11;
  }
  getInfo(undefined, month, year)
  document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
}

function next(){
  month++;
  if (month > 11){
    year++;
    month = 0;
  }
  getInfo(undefined, month, year);
  document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
}

function clickOnDate(element){
  var daysClick = document.getElementsByClassName("current-day")[0];
  if (daysClick != undefined)
    daysClick.className = "days";
  this.className = "current-day";

  var dayTemp = parseInt(element.currentTarget.innerText);
  if (dayTemp < 10)
    dayTemp = "0" + dayTemp;
  var input = document.getElementById("text");
  var tmp = input.value.split(' ');
  input.value = dayTemp + " " + tmp[1] + " " + tmp[2];
}

function refreshClick(){
  var prevClick =  document.getElementsByClassName("prev-days");
  for(var i = 0; i < prevClick.length; i++){
        prevClick[i].addEventListener('click', previous, false);
    }
  var nextClick = document.getElementsByClassName("next-days");
   for(var i = 0; i < nextClick.length; i++){
        nextClick[i].addEventListener('click', next, false);
    }
  var daysClick = document.getElementsByClassName("days");
  for (var i = 0; i < daysClick.length; i++)
    daysClick[i].addEventListener('click', clickOnDate, this);
}

function getMonthCalendar(){
  document.getElementById("left").onclick = function () {
    year--;
    document.getElementById("calendar-month-year").innerHTML = year;
  }
  document.getElementById("right").onclick = function () {
    year++;
    document.getElementById("calendar-month-year").innerHTML = year;
  }
  document.getElementById("calendar-month-year").onclick = function(){getYearCalendar();};

  var table = document.getElementsByTagName("table")[0];
  table.parentNode.removeChild(table);
  var count = 0;
  var table = document.createElement('table');
  for (var i = 0; i < 4; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j <3; j++) {
      var td = document.createElement('td');
      td.innerHTML = monthName[count].substring(0, 3);
      count++;
      tr.appendChild(td);
    }
    table.appendChild(tr); 
  }
  table.classList.add("month-table");
  document.getElementById("calendar-month-year").innerHTML = year;
  document.getElementById("calendar-dates").appendChild(table);

  var clickMonth =  document.getElementsByTagName("td");
  for(var i = 0; i < 12; i++){
    clickMonth[i].addEventListener('click', clickOnMonth, false);
  }
}

function clickOnMonth(){
  for(var i = 0; i < 12; i++){
    if(this.innerText == monthName[i].substring(0,3)){
      month = i;
      getInfo(undefined, month, year);
      document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
      document.getElementById("left").onclick = function(){previous();};
      document.getElementById("right").onclick = function(){next();};
      document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
    }
  }
}

function getYearCalendar(){
  document.getElementById("left").onclick = function () {
    getYearsTable(yearsInterval);}
  document.getElementById("right").onclick = function () {
    getYearsTable(yearsInterval + 30);}
  document.getElementById("calendar-month-year").onclick = function () {
    document.getElementById("left").onclick = function(){previous();}
    document.getElementById("right").onclick = function(){next();}
    document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
    getCurrentDay();
  }
  getYearsTable(year);
}

function getYearsTable(year){
  var table = document.getElementsByTagName('table')[0];
  table.parentNode.removeChild(table);
  yearsInterval = year - 15;
  table = document.createElement('table');
  for (var i = 0; i < 4; i++){
    var tr = document.createElement('tr');
    for (var j = 0; j < 4; j++){
      var td = document.createElement('td');
      td.innerHTML = yearsInterval;
      yearsInterval++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  yearsInterval -= 16;
  table.classList.add("years-table");
  document.getElementById("calendar-month-year").innerHTML = yearsInterval + ' - ' + year;
  document.getElementById("calendar-dates").appendChild(table);
  var clickYear =  document.getElementsByTagName("td");
  for(var i = 0; i < 16; i++){
    clickYear[i].addEventListener('click', clickOnYear, false);
  }
}

function clickOnYear(){
  year = this.innerText;
  getMonthCalendar();
}