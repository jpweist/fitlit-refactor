import $ from 'jquery';

import UserParent from './user-parent';
import User from './User';
import UserRepository from './User-repository';
import Activity from './Activity-Repository';
import Hydration from './Hydration-Repository';
import Sleep from './Sleep-Repository';

import './css/styles.scss';
import variables from './css/styles.scss';

import './images/building.svg'
import './images/coffin.svg'
import './images/ghost (1).svg'
import './images/ghost-happy.svg'
import './images/ghost-sad.svg'
import './images/glass-empty.svg'
import './images/glass-full.svg'

let user, userRepo, hydration, sleep, activity;
let userData, sleepData, actData, hydData;
let getCounter = 0;

function getHelper(ext, callback) {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/' + ext)
    .then(data => data.json())
    .then(data => {
      callback(data);
      getCounter++;
      getCheck();
    })
}

function theInitializer() {
  getHelper('users/userData', (data) => {
    userData = data.userData;
    user = new UserParent(userData);
    userRepo = new UserRepository(userData);
    getHelper('sleep/sleepData', (sleepData) => {
      sleepData = sleepData;
      sleep = new Sleep(userData, sleepData.sleepData);
    })
    getHelper('activity/activityData', (actData) => {
      actData = actData;
      activity = new Activity(userData, actData.activityData);
    })
    getHelper('hydration/hydrationData', (hydData) => {
      hydData = hydData;
      hydration = new Hydration(userData, hydData.hydrationData);
    })
  })
}

theInitializer();

function getCheck() {
  if (getCounter === 4) {
    initDom();
  }
}

function initDom() {
  const userIdNum = generateRandomUserId();
  const currentDate = '2019/06/30';
  const user = userRepo.returnUserData(userIdNum);
  const newUser = new User(user);
  const friendNames = returnFriendListNames();
  const friendSteps = returnFriendListSteps();
  const stepsTrend = (activity.returnThreeDayStepStreak(user.id)[0]);

  $('#user-name').text(newUser.returnUserFirstName());
  $('#current-date').text(currentDate);
  $('#user-info-name').text(newUser.name);
  $('#user-info-email').text(newUser.email);
  $('#user-info-address').text(newUser.address);
  $('#user-info-step-goal').text(newUser.dailyStepGoal);
  $('#average-step-goal-all-users').text(userRepo.returnAllUsersAverageStepGoal());
  $('#user-water-by-day').text(hydration.returnDataByDate(user.id, currentDate, 'numOunces'));
  $('#user-sleep-by-day').text(sleep.returnDataByDate(user.id, currentDate, 'hoursSlept'));
  $('#user-sleep-quality-by-day').text(sleep.returnDataByDate(user.id, currentDate, 'sleepQuality'));
  $('#user-sleep-by-week').text(sleep.returnUserDataByWeek(user.id, currentDate, 'hoursSlept'));
  $('#user-sleep-quality-by-week').text(sleep.returnUserDataByWeek(user.id, currentDate, 'sleepQuality'));
  $('#user-average-sleep-quality').text(sleep.returnUserAvgAllTime(user.id, 'sleepQuality'));
  $('#user-average-hours-slept').text(sleep.returnUserAvgAllTime(user.id, 'hoursSlept'));
  $('#user-current-step-count').text(activity.returnDataByDate(user.id, currentDate, 'numSteps'));
  $('#user-rested').text(displaySleepStatus());
  $('#user-current-mins-active').text(activity.returnDataByDate(user.id, currentDate, 'minutesActive'));
  $('#user-current-miles-walked').text(activity.returnMilesWalkedByDate(user, currentDate));
  $('#user-current-step-count-vs-average').text(activity.returnDataByDate(user.id, currentDate, 'numSteps'));
  $('#all-users-average-step-count').text(activity.returnUserAvgsByDate(currentDate, 'numSteps'));
  $('#user-current-stairs-climbed').text(activity.returnDataByDate(user.id, currentDate, 'flightsOfStairs'));
  $('#all-users-average-stairs-climbed').text(activity.returnUserAvgsByDate(currentDate, 'flightsOfStairs'));
  $('#user-current-active-mins').text(activity.returnDataByDate(user.id, currentDate, 'minutesActive'));
  $('#all-users-average-active-mins').text(activity.returnUserAvgsByDate(currentDate, 'minutesActive'));
  $('#user-step-count-by-week').text(activity.returnUserDataByWeek(user.id, currentDate, 'numSteps'))
  $('#user-stairs-climbed-by-week').text(activity.returnUserDataByWeek(user.id, currentDate, 'flightsOfStairs'))
  $('#user-mins-active-by-week').text(activity.returnUserDataByWeek(user.id, currentDate, 'minutesActive'))
  $('#winner-name').text(returnFriendChallengeWinner(friendNames))
  $('#user-water-trend-week').text(displayWaterStatus());
  $('#republic-plaza-challenge').text(activity.republicPlazaChallenge(user.id))

  function generateRandomUserId() {
    let randomNumOneToFifty = (Math.random() * 50);
    return Math.ceil(randomNumOneToFifty);
  }

  function displaySleepStatus() {
    sleep.checkUserRestedByDate(user.id, currentDate)
    if (sleep.isRested === true) {
      $('#sleep-status').attr('src', '../images/ghost-happy.svg');
      $('#sleep-comment').text('You\'ve been getting enough sleep!');
    } else {
      $('#sleep-status').attr('src', '../images/ghost-sad.svg');
      $('#sleep-comment').text('Getting 8 hours of sleep will make you more productive!');
    }
  }

  function displayWaterStatus() {
    let checkWater = hydration.returnDidUserDrinkEnoughWater(user.id, currentDate, 'numOunces')
    if (checkWater === true) {
      $('#water-status').attr('src', '../images/glass-full.svg');
      $('#water-comment').text('Keep up the good work! You\'ve averaged more than 64 ounces per day this week');
    } else {
      $('#water-status').attr('src', '../images/glass-empty.svg');
      $('#water-comment').text('You need more water. Make sure you\'re staying hydrated!');
    }
  }

  function populateFriends(userFriends) {
    let friends = userFriends.map(friend => {
      let userFriend = new User(userRepo.returnUserData(friend));
      return ({
        id: userFriend.id,
        name: userFriend.returnUserFirstName(),
        steps: (activity.returnUserDataByWeek(userFriend.id, currentDate, 'numSteps')).reduce((acc, day) => acc += day)
      })
    });
    friends.push(populateUserDataForFriendChallenge());
    return friends.sort((userA, userB) => userB.steps - userA.steps);
  }

  function populateUserDataForFriendChallenge() {
    return {
      id: user.id,
      name: newUser.returnUserFirstName(),
      steps: activity.returnUserDataByWeek(user.id, currentDate, 'numSteps')
        .reduce((acc, day) => acc += day)
    }
  }

  function returnFriendListNames() {
    let friendObjs = populateFriends(user.friends);
    return friendObjs.map(friend => friend.name);
  }

  function returnFriendListSteps() {
    let friendObjs = populateFriends(user.friends);
    return friendObjs.map(friend => friend.steps);
  }

  function returnFriendChallengeWinner(friendNames) {
    if (friendNames[0] === newUser.returnUserFirstName()) {
      return `You win!!`;
    }
    return `${friendNames[0]} is the Winner!`
  }

  function returnDatesOfWeek(userId, date) {
    let userInfo = newUser.findCurrentUserData(userId, userData);
    let index = userData.findIndex((data) => data.date === date);
    return userData.splice(index - 6, 7).map(day => {
      day.date
      console.log('day', day, 'day.date', day.date)

    });
  }

  Chart.defaults.global.defaultFontColor = 'white';
  var ctx = $('#user-water-by-week');
  var hydrationByWeek = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: returnDatesOfWeek(user.id, currentDate),
      datasets: [{
        label: 'ounces',
        data: hydration.returnUserDataByWeek(user.id, currentDate, 'numOunces'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgb(221, 160, 221, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(192, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(221, 160, 221, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#user-sleep-by-week');
  var sleepQualityHrsByWeek = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: returnDatesOfWeek(user.id, currentDate),
      datasets: [{
          label: 'hours',
          data: sleep.returnUserDataByWeek(user.id, currentDate, 'hoursSlept'),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgb(221, 160, 221, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(192, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(221, 160, 221, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(192, 192, 192, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'quality score',
          data: sleep.returnUserDataByWeek(user.id, currentDate, 'sleepQuality'),
          backgroundColor: [
            'rgb(221, 160, 221, 0.2)',

          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(221, 160, 221, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(192, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
          type: 'line',
        }
      ]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#user-step-count-by-week');
  var stepsByWeek = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [returnDatesOfWeek(user.id, currentDate)],
      datasets: [{
        label: 'steps',
        data: activity.returnUserDataByWeek(user.id, currentDate, 'numSteps'),
        backgroundColor: [
          'rgba(221, 160, 221, 0.2)',
        ],
        borderColor: [
          'rgba(221, 160, 221, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }, ]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#user-mins-active-by-week');
  var activityByWeek = new Chart(ctx, {
    type: 'line',
    data: {
      labels: returnDatesOfWeek(user.id, currentDate),
      datasets: [{
        label: 'active minutes',
        data: activity.returnUserDataByWeek(user.id, currentDate, 'minutesActive'),
        backgroundColor: [
          'rgb(221, 160, 221, 0.2)',
        ],
        borderColor: [
          'rgba(221, 160, 221, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#user-stairs-climbed-by-week');
  var stairsByWeek = new Chart(ctx, {
    type: 'line',
    data: {
      labels: returnDatesOfWeek(user.id, currentDate),
      datasets: [{
        label: 'stairs climbed',
        data: activity.returnUserDataByWeek(user.id, currentDate, 'flightsOfStairs'),
        backgroundColor: [
          'rgb(221, 160, 221, 0.2)',
        ],
        borderColor: [
          'rgba(221, 160, 221, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#friend-info');
  var friendStepChallenge = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: friendNames,
      datasets: [{
        label: 'steps',
        data: friendSteps,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgb(221, 160, 221, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(192, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(221, 160, 221, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  var ctx = $('#step-trend');
  var stepTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(stepsTrend).reverse(),
      datasets: [{
        label: 'steps',
        data: Object.values(stepsTrend).reverse(),
        backgroundColor: [
          'rgb(221, 160, 221, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(192, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(221, 160, 221, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(192, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
