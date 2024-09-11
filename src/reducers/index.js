import { combineReducers } from 'redux'
import mytoken from './mytoken'
import appstate from './appstate'
import network from './network'
import game from './game'
import tasks from './tasks'
import taskdetails from './taskdetails'
import gifttasks from './gifttasks'
import usergifttasks from './usergifttasks'
import gifttaskdetails from './gifttaskdetails'
import achievements from './achievements'
import chatslist from './chatslist'
import chatroom from './chatroom'
import contactlist from './contactlist'
import userachievements from './userachievements'
import referralAchievement from './referralAchievement'
import leaderboard from './leaderboard'
import factory from './factory'
import userfactory from './userfactory'
import walletjewels from './walletjewels'
import activechat from './activechat'
import presence from './presence'

export default combineReducers({
    mytoken, appstate, network, game, activechat, presence, chatslist, chatroom,
    contactlist, achievements, userachievements, tasks, taskdetails,
    gifttasks, usergifttasks, gifttaskdetails, referralAchievement,
    leaderboard, factory, userfactory, walletjewels
});