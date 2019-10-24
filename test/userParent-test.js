const chai = require('chai');
const expect = chai.expect;

import UserParent from '../src/user-parent.js';
import userTestData from '../test-data/user-test-data.js';
import Hydration from '../src/Hydration-Repository.js';
import hydrationTestData from '../test-data/hydration-test-data.js';
// import User from '../src/User';

describe('UserParent', () => {
  let userParent, hydration;
  beforeEach(() => {
    userParent = new UserParent(userTestData);
    hydration = new Hydration(userTestData, hydrationTestData)
  });
  it('should be an instance of UserParent', function () {
    expect(userParent).to.be.an.instanceOf(UserParent);
  });
  it('should hold user data', () => {
    expect(userParent.users).to.deep.equal(userTestData);
  });

  describe('Method Tests', () => {
    it('should pass methods to its children', () => {
      expect(hydration.findCurrentUserData(1, hydrationTestData)).to.deep.equal([{
          userID: 1,
          date: '2019/06/15',
          numOunces: 37
        },
        {
          userID: 1,
          date: '2019/06/16',
          numOunces: 69
        },
        {
          userID: 1,
          date: '2019/06/17',
          numOunces: 96
        },
        {
          userID: 1,
          date: '2019/06/18',
          numOunces: 61
        },
        {
          userID: 1,
          date: '2019/06/19',
          numOunces: 91
        },
        {
          userID: 1,
          date: '2019/06/20',
          numOunces: 50
        },
        {
          userID: 1,
          date: '2019/06/21',
          numOunces: 50
        },
        {
          userID: 1,
          date: '2019/06/22',
          numOunces: 43
        },
        {
          userID: 1,
          date: '2019/06/23',
          numOunces: 39
        }
      ]);
    });
  });

  it('should do stuff', () => {
    hydration.returnUserAvgAllTime(1, 'numOunces')
  })
});