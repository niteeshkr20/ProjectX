

let initialState = {
    myid: null,
    myphone: 1,
    token: null,
    cookie: null,
    isLoading: true    
}
    

        
const mytoken = (state = initialState, action) => {
    //console.log('REDUCER');
    //console.log(action);
    switch (action.type) {

        case 'USER_TOKEN_LOADED':            
            return Object.assign({}, state, action.myTokens)
        default:
            return state
        
    }
}

export default mytoken