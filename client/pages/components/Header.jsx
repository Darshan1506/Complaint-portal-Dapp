import React from 'react'
import logo from '../../public/logo.png'
import { ConnectWallet } from '@thirdweb-dev/react'
const Header = () => {
  return (
    <div className='header-container'>
        {/* <h1 className='header-logo'>COMPLAINT PORTAL</h1> */}
        <img  src='https://res.cloudinary.com/atharva-col/image/upload/v1682623173/logo_udrpol.png' className='max-w-xs' alt='logo'/>
        <ConnectWallet accentColor='blue' colorMode='light'/>
    </div>
  )
}

export default Header