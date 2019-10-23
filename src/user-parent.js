class UserParent {
  constructor(userData) {
    this.users = userData;
  }

  findCurrentUserData(id) {
    return this.data.filter((dataObj) => dataObj.id === id);
  }

  findUserCurDate(date) {
    return this.activityData.filter((activityObj) => activityObj.date === date);
  }

  returnUserDataByWeek(userId, date, key) {
    let index = this.findCurrentUserData(userId).findIndex((activityObj) => activityObj.date === date);
    return this.findCurrentUserData(userId).map(activityObj => activityObj[key]).splice(index - 6, 7);
  }

  returnDataByDate(userId, date, key) {
    return this.findCurrentUserData(userId).find(elem => {
      return elem.date === date
    })[key];
  }

  returnUserAvgsByDate(date, key) {
    let allUsersActivity = this.findUserCurDate(date);
    let allUsersTotal = allUsersActivity.reduce((activityObjA, activityObjB) => activityObjA + activityObjB[key], 0);
    return parseInt(allUsersTotal / allUsersActivity.length);
  }
}

export default UserParent;