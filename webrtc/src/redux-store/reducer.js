const initialState={

    count:0,
    sum:0,
    products:[]
}


export const cartReducer=(state=initialState,action)=>{

    switch(action.type){
     
        case 'ADD_TO_CART':
         
        return{
            ...state,
          count:state.count+1,
          sum:state.sum+parseInt(action.payload.cost),
          
          products:[...state.products,{id:action.payload.id,name:action.payload.name,img:action.payload.img,cost:action.payload.cost}]
           
        };

        case 'REMOVE_CART':
         const prod=state.products.find((product)=>product.id===action.payload)
         const costprice=prod.cost
       const  updated =state.products.filter((product)=>product.id!==action.payload)

        return{
            ...state,
           count:state.count-1,
           sum:state.sum-costprice,
           products:updated

        }


        default:

        return{
            count:state.count,
            sum:state.sum,
            products:[...state.products]
        };





    }
};