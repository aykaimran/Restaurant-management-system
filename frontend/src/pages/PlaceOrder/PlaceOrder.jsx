
import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import Modal from "../../components/Modal/Modal";
import { useLocation } from 'react-router-dom';

const PlaceOrder = () => {
    const location = useLocation();
    const userId = location.state?.userId || JSON.parse(localStorage.getItem('currentUser'))?.userId;
    console.log("Received userId from login:", userId);

    const {
        getTotalCartAmount,
        cartItems,
        food_list,
        setCartItems
    } = useContext(StoreContext);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (getTotalCartAmount() === 0) {
            alert('Your cart is empty!');
            return;
        }
    
        try {
            let totalBill = 0;
    
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    const itemInfo = food_list.find(product => product._id === itemId);
    
                    const cartPayload = {
                        user: { userid: userId },
                        itemname: itemInfo.name,
                        price: itemInfo.price,
                        itemquantity: cartItems[itemId],  // 👈 actual quantity now
                    };
    
                    // Save cart item
                    const cartResponse = await fetch("http://localhost:8080/cart/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(cartPayload)
                    });
    
                    if (!cartResponse.ok) {
                        throw new Error("Failed to save cart item");
                    }
    
                    totalBill += itemInfo.price * cartItems[itemId];
                }
            }
    
            // After all cart items are saved, create a bill
            const billPayload = {
                user: { userid: userId },
                billQuantity: totalBill + 20  // 👈 subtotal + service fee
            };
    
            await fetch("http://localhost:8080/bill/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(billPayload)
            });
    
            setShowConfirmation(true);
            // setCartItems({}); // uncomment if you want to clear cart
    
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("There was an error placing your order. Please try again.");
        }
    };
    
    
    return (
        <form className='place-order' onSubmit={handleSubmit}>
            <div className="place-order-left">
                <p className="title">Personal Information</p>
                <div className="multi-fields">
                    <input 
                        type="text" 
                        placeholder='First Name'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder='Last Name'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input 
                    type="email" 
                    placeholder='Email address'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input 
                    type="tel" 
                    placeholder='Phone Number'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <p className="pickup-instructions">
                    Your order will be ready for pickup in approximately 20-30 minutes.
                </p>
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Order Summary</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₨{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Service Fee</p>
                            <p>₨{getTotalCartAmount() === 0 ? 0 : 20}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₨{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
                        </div>
                    </div>
                    <button type="submit">PLACE ORDER FOR PICKUP</button>
                </div>
            </div>

            {showConfirmation && (
                <Modal 
                    message={`Thank you for your order, ${formData.firstName}! Your food will be ready for pickup shortly.`}
                    onClose={() => {
                        setShowConfirmation(false);
                    }}
                />
            )}
        </form>
    );
};

export default PlaceOrder;
