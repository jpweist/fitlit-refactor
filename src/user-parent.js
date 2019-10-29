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

  returnUserDataByWeek(userId, date, key) {
    let index = this.findCurrentUserData(userId, this.data).findIndex((dataObj) => dataObj.date === date);
    return this.findCurrentUserData(userId, this.data).map(dataObj => dataObj[key]).splice(index - 6, 7);
  }

  returnDataByDate(userId, date, key) {
    let user = this.findCurrentUserData(userId, this.data).find(elem => elem.date === date)[key];
    return user;
  }

  returnUserAvgsByDate(date, key) {
    let allUsers = this.findUserCurDate(date, this.data);
    let allUsersTotal = allUsers.reduce((dataObjA, dataObjB) => dataObjA + dataObjB[key], 0);
    return parseInt((allUsersTotal / allUsers.length).toFixed(1));
  }

  returnUserAvgAllTime(userId, key) {
    let user = this.findCurrentUserData(userId, this.data)
    let total = user.reduce((acc, dataObj) => {
      return acc += dataObj[key];
    }, 0);
    return parseInt((total / user.length).toFixed(1));
  }

  returnAllUsersAverage(data, key) {
    let total = data.reduce((acc, element) => {
      acc += element[key];
      return acc;
    }, 0);
    return parseFloat((total / data.length).toFixed(1));
  }
};

export default UserParent;