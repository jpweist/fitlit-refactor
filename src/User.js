import UserParent from '../src/user-parent.js';

class User extends UserParent{
  constructor(userData) {
    super(userData)
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  returnUserFirstName() {
    return this.name.substring(0, this.name.indexOf(' '));
  }
}


export default User;