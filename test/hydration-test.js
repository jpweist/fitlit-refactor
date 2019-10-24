const chai = require('chai');
const expect = chai.expect;

import UserParent from '../src/user-parent.js';
import Hydration from '../src/Hydration-Repository';
import hydrationTestData from '../test-data/hydration-test-data';
import userTestData from '../test-data/user-test-data.js';

describe('Hydration', () => {
  let hydration, parent;

  beforeEach(() => {
    parent = new UserParent(userTestData);
    hydration = new Hydration(userTestData, hydrationTestData);
  });

  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });
  
  it('should calculate average fluid ozs consumed per day for all time', function() {
    expect(hydration.returnAvgFluidOzPerDayAllTime(1)).to.equal(536);
  });

  // it('should calculate fluid ounces by specific date', function() {
  //   expect(hydration.returnFluidOzByDate(3, '2019/06/15')).to.equal(47);
  // });

  // it('should calculate water consumption over a week period', function() {
  //   expect(hydration.returnFluidOzByWeek(3, '2019/06/21')).to.deep.eql([47, 99, 28, 40, 85, 51, 41]);
  // });

  // it('should return a boolean determining whether the user drank enough water for the last week', () => {
  //   expect(hydration.returnDidUserDrinkEnoughWater(1, '2019/06/21')).to.equal(true);
  // })
  
});