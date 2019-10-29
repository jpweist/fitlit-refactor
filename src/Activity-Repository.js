import UserParent from '../src/user-parent.js';

class Activity extends UserParent {
  constructor(userData, activityData) {
    super(userData, activityData)
    this.data = activityData;
  }


  returnMilesWalkedByDate(user, date) {
    let numOfSteps = this.data.find(activityObj => activityObj.userID === user.id && activityObj.date === date).numSteps;
    return parseInt(((numOfSteps * user.strideLength) / 5280).toFixed(0));
  }

  returnAvgActiveMinutesByWeek(userId, date) {
    let index = this.findCurrentUserData(userId, this.data).findIndex((activityObj) => activityObj.date === date);
    let userActiveMins = this.findCurrentUserData(userId, this.data).map(activityObj => activityObj.minutesActive).splice(index - 6, 7);
    return parseInt(userActiveMins.reduce((totalMins, dailyActiveMins) => {
      totalMins += dailyActiveMins;
      return totalMins;
    }, 0) / 7);
  }

  checkStepGoalMetByDate(user, date) {
    if ((user.dailyStepGoal) <= (this.findCurrentUserData(user.id, this.data).find(elem => elem.date === date).numSteps)) {
      return true;
    }
    return false;
  }

  returnAllDaysStepGoalExceeded(user) {
    return this.data.filter((activityObj) => activityObj.userID === user.id && activityObj.numSteps > user.dailyStepGoal).map(activityObj => activityObj.date);
  }

  returnStairClimbingRecord(userId) {
    return this.findCurrentUserData(userId, this.data).sort((value1, value2) => {
      return value2.flightsOfStairs - value1.flightsOfStairs
    })[0].flightsOfStairs
  }

  checkUserActivityStatusByDate(userID, date) {
    if ((this.findCurrentUserData(userID, this.data).find(day => {
        return day.date === date;
      }).minutesActive) >= (90)) {
      return true;
    }
    return false;
  }

  returnThreeDayStepStreak(userID) {
    let userData = this.findCurrentUserData(userID, this.data);
    return userData.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if ((day.numSteps > userData[index - 1].numSteps) && (userData[index - 1].numSteps > userData[index - 2].numSteps)) {
        acc.push({
          [userData[index].date]: userData[index].numSteps,
          [userData[index - 1].date]: userData[index - 1].numSteps,
          [userData[index - 2].date]: userData[index - 2].numSteps,
        });
      }
      return acc;
    }, []);
  }

  republicPlazaChallenge(userID) {
    let userData = this.findCurrentUserData(userID, this.data);
    return parseInt((userData.reduce((acc, day) => {
      acc += day.flightsOfStairs;
      return acc;
    }, 0) / 56));
  }

}

export default Activity;