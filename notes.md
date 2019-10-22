activityData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "numSteps": 3577,
    "minutesActive": 140,
    "flightsOfStairs": 16,

    findCurrentUserData() PARENT
    findUserCurDate() PARENT
    returnUserAvgsByDate()
    returnMilesWalkedByDate()
    returnActivityByDate()
    returnAvgActiveMinutesByWeek()
    returnUserActivityByWeek() PARENT
    checkStepGoalMetByDate()
    returnAllDaysStepGoalExceeded()
    returnStairClimbingRecord()
    checkUserActivityStatusByDate()
    returnThreeDayStepStreak()
    republicPlazaChallenge()

  }


hydrationData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "numOunces": 37,

    findCurrentUserData() PARENT
    returnAvgFluidOzPerDayAllTime()
    returnFluidOzByDate() PARENT
    returnFluidOzByWeek() PARENT
    returnDidUserDrinkEnoughWater()

  }

sleepData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
    "sleepQuality": 2.2,

    findCurrentUserData() PARENT
    returnAverageSleep()
    returnAverageSleepQuality()
    returnAmountSlept()
    returnSleepQuality()
    returnSleepByWeek() PARENT
    returnSleepQualityByWeek()
    returnAllUsersAverageSleepQuality()
    returnSleepQualityGreaterThanThree()
    returnUserWithMostSleep()
    checkUserRestedByDate()

  }

userData = [
  {
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [
      16,
      4,
      8
    ],

    returnUserFirstName()
  }
