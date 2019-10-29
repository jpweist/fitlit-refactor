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

  it('should return a boolean determining whether the user drank enough water for the last week', () => {
    expect(hydration.returnDidUserDrinkEnoughWater(1, '2019/06/21', 'numOunces')).to.equal(true);
  });  
});