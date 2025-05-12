// frontend/src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import { getMenuItems } from '../services/api';

const MenuPage = ({ currentUser }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const items = await getMenuItems();
                setMenuItems(items);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchMenu();
    }, []);

    if (loading) return <div>Loading menu...</div>;

    return (
        <div className="menu-page">
            <h2>Our Menu</h2>
            <div className="menu-grid">
                {menuItems.map(item => (
                    <MenuCard 
                        key={item.id} 
                        item={item} 
                        currentUser={currentUser} 
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuPage;