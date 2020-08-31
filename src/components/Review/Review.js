import React from 'react';
import { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';


const Review = () => {
    const [ cart, setCart] = useState([]);

    const handlePlaceOrder = () => {
        setCart([]);
        processOrder();
    }

    const removeProduct = (productkey) => {
        
        const newCart = cart.filter(pd => pd.key !== productkey)
        setCart(newCart);
        removeFromDatabaseCart(productkey);
    }

    useEffect(() =>{
        //cart
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);

        const cartProducts = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])
    return (
        <div className="twin-container">
            
        <div className="product-container">
        {
                cart.map(pd =>  <ReviewItem 
                    key = {pd.key}
                    removeProduct = {removeProduct}
                    product = {pd}></ReviewItem>)
            }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className ='main-button'>Place Order</button>
            </Cart>
        </div>
        </div>
    );
};

export default Review;