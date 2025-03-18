import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/footer.css'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import isoWhite from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>

        <div className='footer-logo-container'>
          <Link to='/'>
            <img src={isoWhite} alt='Logo de la marca' className='footer-logo' />
          </Link>
        </div>

        <div className='footer-copyright'>
          <p>&copy; {new Date().getFullYear()} Kail. Todos los derechos reservados.</p>
        </div>

        <div className='footer-social'>
          <Link to='https://facebook.com/phdnavi' aria-label='Facebook' className='social-icon'>
            <FaFacebook />
          </Link>
          <Link to='https://instagram.com/phdkail' aria-label='Instagram' className='social-icon'>
            <FaInstagram />
          </Link>
          <Link to='https://linkedin.com/in/k4iL' aria-label='LinkedIn' className='social-icon'>
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
