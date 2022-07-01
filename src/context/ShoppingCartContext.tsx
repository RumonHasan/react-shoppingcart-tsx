import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from '../components/ShoppingCart';
// type for shopping provider
type ShoppingCartProviderProps = {
    children: ReactNode
}
// type for cart items .. id and qty are the two main items for accessing all teh information
type CartItem = {
    id:number, 
    quantity:number
}

// type for shopping context
type ShoppingCartContextProps = {
    openCart: ()=> void,
    closeCart: ()=> void,
    getItemQuantity: (id:number) => number,
    increaseCartQty: (id:number) => void, // works for adding and increasing the cart qty
    decreaseCartQty: (id:number) => void,
    removeFromCart: (id:number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// main shopping cart functions
export const useShoppingCart = ()=>{
    return useContext(ShoppingCartContext)
}

// main context provider for the shopping cart
export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps)=>{
    // main states
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const openCart = ()=>{
        setIsOpen(true);
    }
    const closeCart = ()=> {
        setIsOpen(false);
    }

    const cartQuantity = cartItems.reduce((qty, item)=> item.quantity + qty,0)

    // getting the item qty
    const getItemQuantity = (id:number)=>{
       let cartItemCheck = cartItems.find((item)=> item.id === id);
       if(cartItemCheck){
            return cartItemCheck.quantity;
       }else{
            return 0;
       }
    }
    // increasing qty
    const increaseCartQty = (id:number)=>{
        setCartItems(currentItems => {
            if(currentItems.find((item)=> item.id === id)){
                return currentItems.map((item)=>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item;
                    }
                })
            }else{
                return [...currentItems, {id, quantity: 1}]
            }
        })
    };

    // decrease qty
    const decreaseCartQty = (id:number)=>{
        setCartItems(currentItems=> {
            if(currentItems.find((item)=> item.id === id)?.quantity === 1){
                return currentItems.filter((item)=> item.id !== id)
            }else{
                return currentItems.map((item)=> item.id === id ?
                    {...item, quantity: item.quantity - 1}
                    : item
                )
            }
        })
    }

    // remove from cart
    const removeFromCart = (id:number)=>{
            setCartItems(currentItems => {
                return currentItems.filter((item)=> item.id !== id)
            }
        )
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQty,
            decreaseCartQty,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}