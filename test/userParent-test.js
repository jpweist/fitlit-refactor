const chai = require('chai');
const expect = chai.expect;

import UserParent from '../src/user-parent.js';
import userTestData from '../test-data/user-test-data.js';
import Hydration from '../src/Hydration-Repository.js';
import hydrationTestData from '../test-data/hydration-test-data.js';
import Sleep from '../src/Sleep-Repository';
import sleepTestData from '../test-data/sleep-test-data.js';
import Activity from '../src/Activity-Repository.js';
import activityTestData from '../test-data/activity-test-data.js';

describe('UserParent', () => {
  let userParent, hydration, sleep, activity;
  beforeEach(() => {
    userParent = new UserParent(userTestData);
    hydration = new Hydration(userTestData, hydrationTestData)
    sleep = new Sleep(userTestData, sleepTestData)
    activity = new Activity(userTestData, activityTestData)
  });

  it('should be an instance of UserParent', () => {
    expect(userParent).to.be.an.instanceOf(UserParent);
  });
  it('should hold user data', () => {
    expect(userParent.users).to.deep.equal(userTestData);
  });
  it('should return a week\'s worth of data', () => {
    expect(activity.returnUserDataByWeek(1, '2019/06/21', 'flightsOfStairs')).to.deep.equal([ 37, 69, 96, 61, 91, 50, 50 ])
  })
  it('should return a day\'s worth of data', () => {
    expect(hydration.returnDataByDate(1, '2019/06/21', 'numOunces')).to.equal(50)
  })
  it('should return an average day\'s worth of data for any user', () => {
    expect(hydration.returnUserAvgAllTime(1, 'numOunces')).to.equal(59)
  })
  it('should return an average day\'s worth of data for any user', () => {
    expect(hydration.returnAllUsersAverage(hydrationTestData, 'numOunces')).to.equal(61)
  })
});