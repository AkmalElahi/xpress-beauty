export const addService = (services, itemToAdd) => {
    console.log("services IN UTILS", services)
    const existingItem = services.find(item => item.id === itemToAdd.id)

    if (!existingItem) {
        // return services.map(cartItem =>
        //     cartItem.id === itemToAdd.id
        //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
        //         : cartItem
        // )
        return [...services, { ...itemToAdd, quantity: 1 }]
    }
    return services
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const existingItem = cartItems.find(item => item.id === itemToRemove.id)

    if (existingItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
    }

    // return cartItems.map(cartItem =>
    //     cartItem.id === itemToRemove.id
    //         ? {...cartItem , quantity:cartItem.quantity -1}
    //         : cartItem)
}