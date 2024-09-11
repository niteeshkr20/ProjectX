import { setActiveChat, setChatListData, setPresence, setActivity } from './chatListActions'
import { setChatData, addChatMessage } from './chatRoomActions'
import { loadGameState, setTaskData, setTaskDetails, setGiftTaskData, emptyGiftTaskData,setLeaderBoard, setGiftTaskDetails, setUserGiftTask } from './GameActions'
import { setAchievements, setUserAchievement } from './AchievementActions'
import { getFactory, getUserFactory } from './FactoryActions'
import { getWalletJewels } from './WalletActions'
export default {
     setActiveChat, setChatListData, setChatData,
     addChatMessage, setPresence, setActivity, loadGameState, setTaskData,
     setTaskDetails, setGiftTaskData, emptyGiftTaskData, setGiftTaskDetails, setUserGiftTask,
     setAchievements, setUserAchievement, setLeaderBoard, getFactory, getUserFactory, getWalletJewels
}