import UserParent from '../src/user-parent.js';

class Sleep extends UserParent{
  constructor(userData, sleepData) {
    super(userData, sleepData)
    this.data = sleepData;
    this.isRested = false;
  }
  
  returnSleepQualityGreaterThanThree(date) {
    let usersWithHighestQualitySleep = [];
    let userIDList = this.sleepData.reduce((acc, element) => {
      if (!acc.includes(element.userID)) {
        acc.push(element.userID)
      }
      return acc
    }, []);
    userIDList.forEach(id => {
      if ((this.returnSleepQualityByWeek(id, date).reduce((acc, elem) => {
        acc += elem;
        return acc;
      }, 0) / 7) >= 3) { 
        usersWithHighestQualitySleep.push(id)
      }
    })
    return usersWithHighestQualitySleep;
  }

  returnUserWithMostSleep(date) {
    let sleepByDay = this.sleepData.filter(elem => {
      return elem.date === date;
    })
    sleepByDay.sort((firstElem, secondElem) => {
      return secondElem.hoursSlept - firstElem.hoursSlept
    })
    return sleepByDay.filter(elem => {
      return sleepByDay[0].hoursSlept === elem.hoursSlept
    }).map(elem => elem.userID);
  }

  checkUserRestedByDate(userID, date) {
    if ((this.findCurrentUserData(userID).find(day => {
      return day.date === date;
    }).hoursSlept) >= (8)) {
      return this.isRested = true;
    }
  }
}

export default Sleep;