import React, { useContext } from 'react'
import './nav.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function NavBar() {
  const {currentUser,logout} = useContext(AuthContext);
  return (
    <div>
      <div className="n-container">
        <div className="n-logo">
          Logo
        </div>
          <div className="n-links">
                <Link to={'/?cat=science'} className='link'>
                  <h6 className="n-link">Science</h6>
                </Link>
                <Link to={'/?cat=teconology'} className='link'>
                  <h6 className="n-link">Tecnology</h6>
                  </Link>
                  <Link className="link" >
                  <h6 className="n-link">Design</h6>
                </Link><Link className='link'>
                  <h6 className="n-link">Food</h6>
                </Link><Link to={'/?cat=art'} className='link'>
                  <h6 className="n-link">Art</h6>
                </Link>  
                {currentUser!=null ?
                  <>
                  <span className="n-link">{currentUser.username}</span>
                  <span style={{cursor:'pointer'}} onClick={logout} className="n-link">Logout</span>
                  </>:<Link to={'/login'}>Login</Link>}
                <Link to={'/write'} className='link'><button className="write">Write</button ></Link>
                

          </div>
      </div>
    </div>
  )
}

export default NavBar