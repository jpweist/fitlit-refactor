const chai = require('chai');
const expect = chai.expect;

import UserParent from '../src/user-parent.js';
import Activity from '../src/Activity-Repository';
import User from '../src/User';
import activityTestData from '../test-data/activity-test-data';
import userTestData from '../test-data/user-test-data.js';

describe('Activity', () => {
  let parent, activity, user;
  beforeEach(() => {
    parent = new UserParent(userTestData)
    activity = new Activity(userTestData, activityTestData);
    user = new User(userTestData[0]);
  });

  it('should be a function', function () {
    expect(Activity).to.be.a('function');
  });

  it('should return a boolean based on whether a user achieved their step goal an a specific day', () => {
    expect(activity.checkStepGoalMetByDate(user, '2019/06/15')).to.equal(false);
  });

  it('should return for a specific user their all time stair climbing record', () => {
    expect(activity.returnStairClimbingRecord(2)).to.equal(44)
  });

  it('should find all of the days the user met their step goal', function () {
    let days = ['2019/06/17', '2019/06/20']
    expect(activity.returnAllDaysStepGoalExceeded(user, '2019/06/16')).to.deep.eql(days);
  });

  it('should calculate a user\'s miles walked on a given day', function () {
    expect(activity.returnMilesWalkedByDate(user, '2019/06/16')).to.equal(5);
  });

  it('should calculate a user\'s average active minutes per week', function () {
    expect(activity.returnAvgActiveMinutesByWeek(1, '2019/06/15')).to.equal(151);
  });

  it('should determine a user\'s activity status for a given day', function () {
    expect(activity.checkUserActivityStatusByDate(1, '2019/06/15')).to.equal(true);
  });

  it('should be able to find streaks of three days where steps increased for each day', () => {
    expect(activity.returnThreeDayStepStreak(1)).to.eql([{
        "2019/06/15": 3577,
        "2019/06/16": 6637,
        "2019/06/17": 14329
      },
      {
        "2019/06/18": 4419,
        "2019/06/19": 8429,
        "2019/06/20": 14478
      }
    ]);
  });

  it('should return the number of times the user has climbed the equivelant of Republic Plaza', () => {
    expect(activity.republicPlazaChallenge(1)).to.equal(2);
  })

});