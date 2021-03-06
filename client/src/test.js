// Import statements would not work with Jest, had to copy/paste functions

// Testing daysOftheWeek function

function daysOfTheWeek(date) { //Function to sort the days of the week within a month 
    var daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); //Get the amount of days in the selected month
    var week = [[],[],[],[],[],[],[]]; //Array that stores the days for each day of the week where each array is a new day (Sunday, Monday, Tuesday, etc)
    for(var j=1;j<=daysInMonth;j++) {  //looping through days in month
      var newDate = new Date(date.getFullYear(),date.getMonth(), j)
      if (!week[newDate.getDay()]) { //Initialise multidimensional array
        week[newDate.getDay()] = []
        }
      week[newDate.getDay()].push(j); //Push the day into the associated index of the week array
    }
    return week;
  } 


test("check daysOftheWeek: monday 1st week", () => { //Test to ensure that Mondays and days within the first week are sorted properly
    const date = new Date(2020, 10, 24);
    const week = daysOfTheWeek(date);
    expect(week[1][0]).toEqual(2)
})

test("check daysOftheWeek: incorrect monday 1st week", () => { //Test to ensure that incorrect values are not sorted in the wrong array
    const date = new Date(2020, 10, 24); 
    const week = daysOfTheWeek(date);
    expect(week[1][0]).not.toEqual(6)
})

test("check daysOftheWeek: tuesday 2nd week", () => { //Test to ensure that Tuesdays and days within the second week are sorted properly
    const date = new Date(2020, 10, 24);
    const week = daysOfTheWeek(date);
    expect(week[2][1]).toEqual(10)
})

test("check daysOftheWeek: wednesday 3rd week", () => { //Test to ensure that Wednesdays and days within the third week are sorted properly
    const date = new Date(2020, 10, 24);
    const week = daysOfTheWeek(date);
    expect(week[3][2]).toEqual(18)
})

test("check daysOftheWeek: thursday 4th week", () => { //Test to ensure that Thursdays and days within the fourth week are sorted properly
    const date = new Date(2020, 10, 24);
    const week = daysOfTheWeek(date);
    expect(week[4][3]).toEqual(26)
})

test("check daysOftheWeek: non-existent friday 5th week", () => { //Test to ensure that days that do not exist are not stored in the array
    const date = new Date(2020, 10, 24);
    const week = daysOfTheWeek(date);
    expect(week[5][4]).toBeUndefined()
})



// Testing convertHour function

function convertHour(hour) { //Function that converts 24hr time to 12hr time
    var time = {}; //Array that stores hour value in 0 index and AM or PM in the 1 index
    if (hour > 12) {
      time[0] = hour-12;
      time[1] = "PM";
    }
    else {
      time[0] = hour;
      time[1] = "AM";
    }
    return time;
  }

test("check convertHour: PM Time", () => { //Test to ensure that PM times are converted properly using the correct value
    const hour = 14;
    const time = convertHour(hour);
    expect(time[0]).toEqual(2);
    expect(time[1]).toEqual("PM");
})

test("check convertHour: Incorrect PM Time, time[0]", () => { //Test to ensure that PM times are converted properly using the incorrect value
    const hour = 14;
    const time = convertHour(hour);
    expect(time[0]).not.toEqual(4);
    expect(time[1]).toEqual("PM");
})

test("check convertHour: Incorect PM Time, time[1]", () => { //Test to ensure that when PM times are converted, they are marked as such
    const hour = 14;
    const time = convertHour(hour);
    expect(time[0]).toEqual(2);
    expect(time[1]).not.toEqual("AM");
})

test("check convertHour: AM Time", () => { //Test to ensure that AM times are converted properly using the correct value
    const hour = 10;
    const time = convertHour(hour);
    expect(time[0]).toEqual(10);
    expect(time[1]).toEqual("AM");
})

test("check convertHour: Incorrect AM Time, time[0]", () => { //Test to ensure that AM times are converted properly using the incorrect value
    const hour = 10;
    const time = convertHour(hour);
    expect(time[0]).not.toEqual(11);
    expect(time[1]).toEqual("AM");
})

test("check convertHour: Incorect AM Time, time[1]", () => { //Test to ensure that when AM times are converted, they are marked as such
    const hour = 10;
    const time = convertHour(hour);
    expect(time[0]).toEqual(10);
    expect(time[1]).not.toEqual("PM");
})



//Testing convertMinute function

function convertMinute(minute) { //Function that converts the minute value to a more readable value when the minute is at the start of the hour
    var time;             //This is needed or else a time such as "5:00" will appear as "5:0"
    if (minute === 0) {
      time = "00";
    }
    else {
      time = minute;
    }
    return time;
}

test("check convertMinute: convert 0", () => { //Test to ensure that the minute is converted properly when it is equal to 0
    const minute = 0;
    const time = convertMinute(minute);
    expect(time).toEqual("00");
})

test("check convertMinute: do not convert", () => { //Test to ensure that the minute is not converted when it is not equal to 0
    const minute = 20;
    const time = convertMinute(minute);
    expect(time).toEqual(minute);
})

