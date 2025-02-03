import { Link } from 'wouter'
import './NavBar.css'

function NavBar() {
  return (
            <nav className='navBar'>
                <div>                
                <Link href="/" >Home</Link>
                <Link href="/shop">Shop</Link>

                </div>
              <h1>🛍️ MyStore</h1>
              <div >

                <Link href="/cart">🛍️ Cart</Link>
              </div>
            </nav>
    
  )
}

export default NavBar