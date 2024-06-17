

export const addProduct = (id, name, cost, img) => {
    return {
      type: 'ADD_TO_CART',
      payload: {
        id: id,
        name: name,
        img: img,
        cost: cost,
      },
    };
  };
  
export const removeProduct=(id)=>{
    return{
        type:'REMOVE_CART',
        payload:id
    }
}