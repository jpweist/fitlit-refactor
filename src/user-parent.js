class UserParent {
  constructor(userData) {
    this.users = userData;
  }

  findCurrentUserData(id, data) {
    return data.filter((dataObj) => dataObj.userID === id);
  }

  findUserCurDate(date, data) {
    return data.filter((dataObj) => dataObj.date === date);
  }

  returnUserDataByWeek(userId, date, key, data) {
    let index = this.findCurrentUserData(userId).findIndex((dataObj) => dataObj.date === date);
    return this.findCurrentUserData(userId).map(dataObj => dataObj[key]).splice(index - 6, 7);
  }

  returnDataByDate(userId, date, key) {
    return this.findCurrentUserData(userId).find(elem => {
      return elem.date === date
    })[key];
  }

  returnUserAvgsByDate(date, key) {
    let allUsers = this.findUserCurDate(date);
    let allUsersTotal = allUsers.reduce((dataObjA, dataObjB) => dataObjA + dataObjB[key], 0);
    return parseInt(allUsersTotal / allUsers.length);
  }
}

export default UserParent;