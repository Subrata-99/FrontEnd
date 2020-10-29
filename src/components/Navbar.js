import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
        if(state){
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create Post</Link></li>,
                <li>
                    <button className="btn #d32f2f red darken-1" 
                    onClick={()=> {
                        localStorage.clear()
                        dispatch({type: "CLEAR"})
                        history.push("/signin")
                    }}
                    >
                    Logout
                </button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return(
        <div>
            <nav>
                <div className="nav-wrapper blue" >
                <Link to={state?"/":"/signin"} className="brand-logo left">Blog-App</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
                </div>
            </nav>
        </div>
        
    )
}

export default Navbar