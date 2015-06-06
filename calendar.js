var date = new Date();
var dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var dayForKey;
var year;
var month;
var yearsInterval;
var tdControl;
var flag = false;

window.onload = function(){
  getCurrentDay();
  document.getElementById("text").oninput = function(){ putPoint(); };
  document.getElementById("text").onkeydown = function(e){ keyPressOnInput(e); };
  document.getElementById("text").onchange = function(){ getDateWithInput(); };
  document.getElementById("text").onclick = function(){ setPosCursor(); };
  document.getElementsByClassName("icon")[0].onclick = function(){
    document.getElementsByClassName("calendar-container")[0].style.display = "block";
   getDateWithInput(); 
   flag = true; 
 };
  document.onkeydown = function(e){ controlKey(e);};
  refreshControl();
  document.getElementById("left").onclick = function(){previous();};
  document.getElementById("right").onclick = function(){next();};
  document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
  document.getElementsByClassName("button")[0].onclick = function () 
  {
    document.getElementById("left").onclick = function(){previous();};
    document.getElementById("right").onclick = function(){next();};
    document.getElementById("calendar-month-year").onclick = function(){getMonthCalendar();};
    getCurrentDay();
    document.onkeydown = function(e){ controlKey(e);};
  }
}

///////
function refreshControl(){
	tdControl = document.querySelectorAll('.days, .key');
}

function currentPosition(){
	var temp = document.querySelectorAll('.days, .key');
	for (var i = 0; i <  temp.length; i++) {
		 if (temp[i].className == "key")
		 	return i;
	};
}

function controlKey(e){
  if (!flag)
    return;
	if (e.keyCode == 38)
		keyUp();
	else if (e.keyCode == 40)
		keyDown();
	else if (e.keyCode == 37)
		keyLeft();
	else if(e.keyCode == 39)
		keyRight();
	else if(e.keyCode == 13)
  {
    var d = document.getElementsByClassName("key")[0];
    var dayTemp = parseInt(d.innerText);
    if (dayTemp < 10)
      dayTemp = "0" + dayTemp;
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = dayTemp + " " + tmp[1] + " " + tmp[2];
		getMonthCalendar();
    dayForKey = dayTemp;
    document.onkeydown = function(e){ controlMonthKey(e);};
  }
}

function keyUp(){
	var currentIndex = currentPosition();
	tdControl[currentIndex].className = "days";
	if (currentIndex < 7)
	{
		previous();
		tdControl[tdControl.length - (7 - currentIndex)].className = "key";
	}
	else
		tdControl[currentIndex - 7].className = "key";

}

function keyDown(){
	var currentIndex = currentPosition();
	tdControl[currentIndex].className = "days";
	if ((currentIndex + 7) > tdControl.length - 1)
	{
		var count = tdControl.length - 1;
		next();
		tdControl[6 - (count - currentIndex)].className = "key";
	}
	else
		tdControl[currentIndex + 7].className = "key";
}

function keyLeft(){
	var currentIndex = currentPosition();
	tdControl[currentIndex].className = "days";
	if (currentIndex == 0 ){
		previous();
		tdControl[tdControl.length - 1].className = "key";
	}
	else 
		tdControl[currentIndex - 1].className = "key";
}

function keyRight(){
	var currentIndex = currentPosition();
	tdControl[currentIndex].className = "days";
	if (currentIndex == (tdControl.length - 1))
	{
		next();
		tdControl[0].className = "key";
	}
	else
		tdControl[currentIndex + 1].className = "key";
}

function controlMonthKey(e)
{
  if (!flag)
    return;
	if (e.keyCode == 38)
		keyUpOnMonth();
	else if (e.keyCode == 40)
		keyDownOnMonth();
	else if (e.keyCode == 37)
		keyLeftOnMonth();
	else if(e.keyCode == 39)
		keyRightOnMonth();
	else if(e.keyCode == 13)
	{ 
    var currentIndex = currentMonth();
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + monthName[currentIndex] + " " + tmp[2];
		getYearCalendar();
    document.onkeydown = function(e){ controlYearKey(e);};
	}
}

function currentMonth()
{
  tdControl = document.getElementsByTagName("td");
  for (var i = 0; i < tdControl.length; i++) {
    if (tdControl[i].className == "keyMonth")
      {
        return i;
      }
  }
  return undefined;
}

function keyUpOnMonth()
{
  var currentIndex = currentMonth();
  if (currentIndex == undefined)
    tdControl[tdControl.length - 3].className = "keyMonth";
  else if(currentIndex < 3)
  {
    year--;
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + tmp[1] + " " + year;
    document.getElementById("calendar-month-year").innerHTML = year;
    tdControl[currentIndex].className = "";
    tdControl[9 + currentIndex].className = "keyMonth"
  }
  else
  {
    tdControl[currentIndex].className = "";
    tdControl[currentIndex - 3].className = "keyMonth";
  }
}
function keyDownOnMonth()
{
  var currentIndex = currentMonth();
  if (currentIndex == undefined) 
    tdControl[3].className = "keyMonth";
  else if (currentIndex > 8)
  {
    year++;
    tdControl[currentIndex].className = "";
    tdControl[tdControl.length - 1 - currentIndex].className = "keyMonth";
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + tmp[1] + " " + year;
    document.getElementById("calendar-month-year").innerHTML = year;
  }
  else
  {
    tdControl[currentIndex].className = "";
    tdControl[currentIndex + 3].className = "keyMonth";
  }
}
function keyLeftOnMonth()
{
  var currentIndex = currentMonth();
  if (currentIndex != undefined && currentIndex != 0)
  {
    tdControl[currentIndex].className = "";
    tdControl[currentIndex - 1].className = "keyMonth";
  }
  else if(currentIndex == undefined)
    tdControl[tdControl.length - 1].className = "keyMonth";
  else
  {
    tdControl[0].className = "";
    tdControl[tdControl.length - 1].className = "keyMonth";
    year--;
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + tmp[1] + " " + year;
    document.getElementById("calendar-month-year").innerHTML = year;
  } 
}
function keyRightOnMonth()
{
  var currentIndex = currentMonth();
  if (currentIndex != undefined && currentIndex != tdControl.length - 1)
  {
    tdControl[currentIndex].className = "";
    tdControl[currentIndex + 1].className = "keyMonth";
  }
  else if(currentIndex != tdControl.length - 1)
    tdControl[0].className = "keyMonth";
  else
  {
    tdControl[currentIndex].className = "";
    tdControl[0].className = "keyMonth";
    year++;
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + tmp[1] + " " + year;
    document.getElementById("calendar-month-year").innerHTML = year;
  }  
}

function controlYearKey(e){
  if (!flag)
    return;
  if (e.keyCode == 38)
    keyUpOnYear();
  else if (e.keyCode == 40)
    keyDownOnYear();
  else if (e.keyCode == 37)
    keyLeftOnYaer();
  else if(e.keyCode == 39)
    keyRightOnYear();
  else if(e.keyCode == 13)
  { 
    var currentIndex = currentYear();
    year = parseInt(tdControl[currentIndex].innerText);
    var input = document.getElementById("text");
    var tmp = input.value.split(' ');
    input.value = tmp[0] + " " + tmp[1] + " " + tdControl[currentIndex].innerText;
    document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
    getInfo(dayForKey, month, year);
    document.getElementById("left").onclick = function(){previous();};
    document.getElementById("right").onclick = function(){next();};
    document.onkeydown = function(e){ controlKey(e);};
  }
}

function currentYear()
{
  tdControl = document.getElementsByTagName("td");
  for (var i = 0; i < tdControl.length; i++)
    if (tdControl[i].className == "keyYear")
      return i;
  return undefined;
}

function keyUpOnYear()
{
  var currentIndex = currentYear();
  if (currentIndex == undefined || currentIndex < 4)
  {
    getYearsTable(yearsInterval);
    if (currentIndex == undefined)
      tdControl[tdControl.length - 4].className = "keyYear";
    else
      tdControl[tdControl.length - 1 - (3 - currentIndex)].className = "keyYear";
  }
  else{
    tdControl[currentIndex].className = "";
    tdControl[currentIndex - 4].className = "keyYear";
  }
}

function keyDownOnYear()
{
  var currentIndex = currentYear();
  if (currentIndex > 11)
  {
    getYearsTable(yearsInterval + 30);
    tdControl[4 - (tdControl.length - currentIndex)].className = "keyYear";
  }
  else{
    if (currentIndex == undefined)
      currentIndex = 0;
    tdControl[currentIndex].className = "";
    tdControl[currentIndex + 4].className = "keyYear";
  }
}

function keyLeftOnYaer()
{
  var currentIndex = currentYear();
  if (currentIndex == undefined || currentIndex == 0)
  {
    if (currentIndex != undefined)
      tdControl[currentIndex].className = "";
    getYearsTable(yearsInterval);
    tdControl[tdControl.length - 1].className = "keyYear";

  }
  else{
    tdControl[currentIndex].className = "";
    tdControl[currentIndex - 1].className = "keyYear";
  }
  
}

function keyRightOnYear()
{
  var currentIndex = currentYear();
  if (currentIndex == tdControl.length - 1)
  {
    tdControl[currentIndex].className = "";
    getYearsTable(yearsInterval + 30);
    tdControl[0].className = "keyYear";
  }
  else{
    if (currentIndex == undefined)
      tdControl[0].className = "keyYear";
    else{
      tdControl[currentIndex].className = "";
      tdControl[currentIndex + 1].className = "keyYear";
    }
  } 
}
//////////
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
      input.value[2] =  " ";
    else
      input.value += " ";
  }
  if (cursorPosition == 5){
    if (input.value[5] != undefined)
      input.value[5] =  " ";
    else
      input.value += " ";
  }
  cursorPosition = getCaretPosition(input);
  if (cursorPosition == 1){
    var num = parseInt(input.value.substring(0,1));
    if (num > 3){
      var tmp = input.value.substring(2, input.value.length);
      input.value = "0" + num + " " + tmp;
    }
  }
  cursorPosition = getCaretPosition(input);
  if (cursorPosition == 4){
    var num = parseInt(input.value.substring(3,4));
    if (num > 1){
        var dayTemp = input.value.substring(0,3);
        var yearTemp = input.value.substring(5,9); 
        input.value = dayTemp + "0" + num + " " + yearTemp;
      }
  }    
}

function keyPressOnInput(e){
  var input = document.getElementById("text");
  var help = document.getElementById("help");
  if(e.keyCode == 8 ) {
      e.preventDefault();
       input.oninput = null;
  }
  else{
    var cursorPosition = getCaretPosition(input);
    if (cursorPosition <= 2 || cursorPosition <= 5){
      if (cursorPosition == 2){
        if (input.value[2] != undefined)
          input.value[2] =  " ";
        else
          input.value += " ";
      }
      if (cursorPosition == 5){
        if (input.value[5] != undefined)
          input.value[5] =  " ";
        else
          input.value += " ";
      }
      input.oninput = function(e){ putPoint(e); };
    }
  }

  var curPos = getCaretPosition(input);
  if (e.keyCode == 38 && (curPos >=0 && curPos <=2))
  {
    e.preventDefault();
    var val = input.value.split(' ');
    var day = parseInt(val[0]);
    day++;
    if(day < 10)
      day = "0" + day;
    if (day > 31)
      return;
    input.value = day + " " + val[1] + " " + val[2];
    input.setSelectionRange(curPos, curPos); 
  }
  curPos = getCaretPosition(input);
  if (e.keyCode == 40 && (curPos >=0 && curPos <=2))
  {
    e.preventDefault();
    var curPos = getCaretPosition(input);
    var val = input.value.split(' ');
    var day = parseInt(val[0]);
    day--;
    if(day < 10)
      day = "0" + day;
    if (day <= 0)
      return;
    input.value = day + " " + val[1] + " " + val[2]; 
    input.setSelectionRange(curPos, curPos);
  }
  //inrease month
  curPos = getCaretPosition(input);
  if (e.keyCode == 38 && (curPos >=3 && curPos <=5))
  {
    e.preventDefault();
    var val = input.value.split(' ');
    month = parseInt(val[1]);
    month++;
    if(month < 10)
      month = "0" + month;
    if (month > 12)
      return;
    input.value = val[0] + " " + month + " " + val[2];
    input.setSelectionRange(curPos, curPos);

  }
  curPos = getCaretPosition(input);
  if (e.keyCode == 40 && (curPos >=3 && curPos <=5))
  {
    e.preventDefault();
    var val = input.value.split(' ');
    month = parseInt(val[1]);
    month--;
    if(month < 10)
      month = "0" + month;
    if (month < 1)
      return;
    input.value = val[0] + " " + month + " " + val[2];
    input.setSelectionRange(curPos, curPos); 
  }

  //inrease year
  curPos = getCaretPosition(input);
  if (e.keyCode == 38 && (curPos >=6 && curPos <=10))
  {
    e.preventDefault();
    var val = input.value.split(' ');
    year = parseInt(val[2]);
    year++;
    if(year < 10)
      year = "0" + year;
    input.value = val[0] + " " + val[1] + " " + year;
    input.setSelectionRange(curPos, curPos); 
  }
  curPos = getCaretPosition(input);
  if (e.keyCode == 40 && (curPos >=6 && curPos <=10))
  {
    e.preventDefault();
    var val = input.value.split(' ');
    year = parseInt(val[2]);
    year++;
    if(year < 10)
      year = "0" + year;
    input.value = val[0] + " " + val[1] + " " + year;
    input.setSelectionRange(curPos, curPos); 
  }
  curPos = getCaretPosition(input);
  if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))
  {
    e.preventDefault();
    if (curPos == 2 || curPos == 5)
      return;
    
    var val = String.fromCharCode(e.keyCode);
    input.value = input.value.substring(0, curPos) + val + input.value.substring(curPos + val.length, input.value.length);
    input.setSelectionRange(curPos + 1, curPos + 1);
  }
  curPos = getCaretPosition(input);
  if((curPos >=3 && curPos <=5))
  {
    help.style.display = "block";
    var val = input.value.split(' ');
    var tmp = parseInt(val[1]);
    help.innerText = monthName[tmp - 1];
  }
  else
  {
    help.style.display = "none";
  }

}

function setPosCursor(){
  flag = false;
  var input = document.getElementById("text");
  var cursorPosition = getCaretPosition(input);
  if (input.value.length > 10){
    parseToDate();
  }
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
  input.value = line[0] + " " + monthTemp + " " + line[2];
  input.maxLength = 10;
}

function getCurrentDay(){
  month = date.getMonth();
  year = date.getFullYear();
  getInfo(date.getDate(), month, year);
  document.getElementById("calendar-month-year").innerHTML = monthName[month] + " " + year;
}

function getInfo(day, month, year){
  document.onkeydown = function(e){ controlKey(e);};
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
  else if (day < 10)
    day = "0" + day;
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
        if ( currentDay != undefined && countDays == currentDay)
        {
          td.className = "key";
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
  refreshControl();
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
  document.onkeydown = function(e){ controlMonthKey(e);};
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
  document.onkeydown = function(e){ controlYearKey(e);};
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