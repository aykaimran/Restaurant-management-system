// frontend/src/components/MenuCard.js
import React from 'react';
import { addToCart } from '../services/api';

const MenuCard = ({ item, currentUser }) => {
    const handleAddToCart = async () => {
        try {
            await addToCart({
                userid: currentUser.userid,
                itemname: item.name,
                price: item.price
            });
            
            // You might want to update your cart state or show a notification
            alert(`${item.name} added to cart!`);
            
            // Alternatively, you could use a state management solution
            // updateCartItems(prev => [...prev, item]);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    return (
        <div className="menu-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default MenuCard;