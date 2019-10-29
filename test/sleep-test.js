const chai = require('chai');
const expect = chai.expect;

import userTestData from '../test-data/user-test-data.js';
import UserParent from '../src/user-parent.js';
import Sleep from '../src/Sleep-Repository';
import sleepTestData from '../test-data/sleep-test-data';

describe('Sleep', () => {
  let sleep, parent;
  beforeEach(() => {
    parent = new UserParent(userTestData);
    sleep = new Sleep(userTestData, sleepTestData);
  });
  
  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should return all users who averaged greater than 3 sleep quality for a given week', () => {
    expect(sleep.returnSleepQualityGreaterThanThree('2019/06/22')).to.eql([2, 3])
  });

  it('should return user(s) who slept the most number of hours on a given day', () => {
    expect(sleep.returnUserWithMostSleep('2019/06/22')).to.eql([1, 2])
  });

  it('should return a boolean indicating whether a user got enough sleep on a particular date', () => {
    expect(sleep.checkUserRestedByDate(1, '2019/06/22')).to.equal(true)
  });
});