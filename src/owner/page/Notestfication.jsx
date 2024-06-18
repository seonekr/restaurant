import React from 'react'
import addNotification from 'react-push-notification';
import imageicon from "../../img/imageicon.jpg";

function Notestfication() {

    const clickTONotify = () => {
        addNotification({
            title: 'Code With Yd',
            message: 'visit my channel',
            duration: 4000,
            icon: imageicon,
            native: true,
            onClick: () => console.log('Push Notification'),
        });
    }

    return (
        <div>
            <div>
                <button onClick={clickTONotify} style={{ margin: '100px' }}>
                    Click to notify
                </button>
            </div>
        </div>

    )
}

export default Notestfication
