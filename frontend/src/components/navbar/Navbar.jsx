import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import Modal from '../Modal/Modal'
import { HashLink } from 'react-router-hash-link'

const Navbar = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMessage, setAuthMessage] = useState('')

  const isLoggedIn = !!localStorage.getItem('currentUser')

  const getActiveMenu = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path === '/reserve-table') return 'Reserve-Table'
    if (path === '/login') return 'login'
    if (path === '/signup') return 'signup'
    if (path === '/cart') return 'cart'
    return ''
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleDisabledClick = () => {
    setAuthMessage('Please login or sign up to access this feature')
    setShowAuthModal(true)
    setMobileMenuOpen(false)
  }

  const navItems = [
    { path: '/', name: 'Home', id: 'home' },
    { path: '/reserve-table', name: 'Reserve Table', id: 'Reserve-Table', requiresAuth: true },
    { path: '/about-us', name: 'About Us', id: 'About-Us' },
    { path: '#footer', name: 'Contact Us', id: 'Contact-Us' }
  ]

  const renderNavLink = (item) => {
    const isHashLink = item.path.includes('#')
    const commonProps = {
      className: getActiveMenu() === item.id ? 'active' : '',
      onClick: () => setMobileMenuOpen(false)
    }

    if (item.requiresAuth && !isLoggedIn) {
      return (
        <button
          className={`nav-link disabled ${getActiveMenu() === item.id ? 'active' : ''}`}
          onClick={handleDisabledClick}
          disabled
        >
          {item.name}
        </button>
      )
    }

    return isHashLink ? (
      <HashLink smooth to={item.path} {...commonProps}>
        {item.name}
      </HashLink>
    ) : (
      <Link to={item.path} {...commonProps}>
        {item.name}
      </Link>
    )
  }

  return (
    <nav className='navbar' id='top'>
      <div className='navbar-container'>
        <Link to='/' className='logo-link'>
          <img src={assets.logo} alt='Restaurant Logo' className='logo' />
        </Link>

        <button
          className='mobile-menu-button'
          onClick={toggleMobileMenu}
          aria-label='Toggle navigation menu'
        >
          <img
            src={mobileMenuOpen ? assets.close_icon : assets.menu_icon}
            alt={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </button>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>{renderNavLink(item)}</li>
          ))}
        </ul>

        <div className='navbar-right'>
          <div className='auth-links'>
            {isLoggedIn ? (
              <button
                className='logout-btn'
                onClick={() => {
                  localStorage.removeItem('currentUser')
                  navigate('/')
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to='/login'
                  className={getActiveMenu() === 'login' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className={getActiveMenu() === 'signup' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className='navbar-cart'>
            {isLoggedIn ? (
              <Link to='/cart' onClick={() => setMobileMenuOpen(false)}>
                <img src={assets.basket_icon} alt='Shopping cart' />
                <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
              </Link>
            ) : (
              <button className='cart-btn' onClick={handleDisabledClick}>
                <img src={assets.basket_icon} alt='Shopping cart' />
                <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
              </button>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <Modal
          message={authMessage}
          onClose={() => setShowAuthModal(false)}
          buttons={[
            {
              text: 'Login',
              onClick: () => {
                setShowAuthModal(false)
                navigate('/login')
              }
            },
            {
              text: 'Sign Up',
              onClick: () => {
                setShowAuthModal(false)
                navigate('/signup')
              }
            }
          ]}
        />
      )}
    </nav>
  )
}

export default Navbar
