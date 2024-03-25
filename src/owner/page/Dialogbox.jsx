// DialogBox.js
import React, { useState } from "react";
import "./css/dialogbox.css";

const DialogBox = ({ isOpen, onClose }) => {
    const [productName, setProductName] = useState('');

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h2>Add product name</h2>
                <input 
                    type="text" 
                    placeholder="Name..." 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)}
                />
                <div className="dialog-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => console.log('Product Name:', productName)}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;
