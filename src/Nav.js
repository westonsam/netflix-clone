import React, { useEffect, useState } from 'react';
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);


    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className='nav__contents'>
                <img
                    className='nav__logo'
                    src='https://th.bing.com/th/id/R.2ea85d7448475a744c1485c2eac3d3d1?rik=LOSTtarBPEnY%2fw&riu=http%3a%2f%2fwww.freepnglogos.com%2fuploads%2fnetflix-logo-0.png&ehk=PaZLUHaWmwAMEzdIDx7zGpBu053ZpXipTljxBidJnfU%3d&risl=&pid=ImgRaw&r=0'
                    alt=''
                />
                <img
                    className='nav__avatar'
                    src='https://th.bing.com/th/id/OIP.uDtPlCTKLnrQW_ipwKsCJAHaHa?pid=ImgDet&rs=1'
                    alt=''
                />
            </div>
        </div>
    )
}

export default Nav