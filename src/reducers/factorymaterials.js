
let initialState = {
    
    taskdetails : 
        {
            1 : [
                {id: 1, factory_id: 1, jeweltype_id: 3, count: 9},
                {id: 2, factory_id: 1, jeweltype_id: 1, count: 10}
            ],
            
            2 : [
                {id: 4, factory_id: 2, jeweltype_id: 4, count: 6},
                {id: 14, factory_id: 2, jeweltype_id: 1, count: 20}
            ],

            3: [
                {id: 5, factory_id: 3, jeweltype_id: 1, count: 60},
                {id: 15, factory_id: 3, jeweltype_id: 6, count: 9}
            ]

        }
}

const tasks = (state = initialState, action) => {
    switch (action.type) {
             
        default:            
            return state        
    }
}

export default tasks