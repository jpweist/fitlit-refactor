import UserParent from '../src/user-parent.js';

class Hydration extends UserParent{
  constructor(userData, hydrationData) {
    super(userData, hydrationData)
    this.data = hydrationData;
  }

  returnDidUserDrinkEnoughWater(userId, date, key) {
    let waterDatas = this.returnUserDataByWeek(userId, date, key);
    let avgWaterPerDay = (waterDatas.reduce((acc, day) => {
      acc += day;
      return acc;
    }, 0) / 7);
    if (avgWaterPerDay > 64) {
      return true;
    }
    return false;
  }
};

export default Hydration;