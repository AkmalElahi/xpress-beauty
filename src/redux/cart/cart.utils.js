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