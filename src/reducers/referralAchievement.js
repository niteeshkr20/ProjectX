
let initialState = {
    1: { total_count: 0},
    2: { total_count: 0},
    18: { total_count: 1},
    19: { total_count: 0},
    20: { total_count: 0},
    21: { total_count: 0},
    22: { total_count: 0},
    23: { total_count: 0},
    24: { total_count: 0},
    25: { total_count: 0},
    26: { total_count: 0},
    27: { total_count: 0},
    28: { total_count: 0},
    29: { total_count: 0},
    30: { total_count: 0},
    31: { total_count: 0},
    32: { total_count: 0}
};  

        
const referralAchievement = (state = initialState, action) => {
    console.log('Referral Reducer')
	console.log(action)	
    switch (action.type) {
        
        case 'UPDATE_REFERRAL_ACHIEVEMENTS':            
            return Object.assign({}, state, action.payload)        
        
        default:            
            return state        
    }
}

export default referralAchievement