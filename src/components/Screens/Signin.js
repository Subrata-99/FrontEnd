import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

const Signin = () => {
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const PostData = () => {
    fetch("/signin",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res=>res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error,classes:"#f44336 red"})
      }else{
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type:"USER", payload:data.user})
        M.toast({html:"Signed in successfully!",classes:"#66bb6a green lighten-1"})
        history.push("/")
      }
    }).catch(err => {
      console.log(err)
    })
  }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Blog-App</h2>
                <input 
                  type="text" 
                  placeholder="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button className="btn waves-effect waves-light #2196f3 blue" 
                 onClick={()=> PostData()}
                >
                    Signin
                </button>
                <h5>
                  <Link to="/signup">Dont have an account ?</Link>    
                </h5> 
                <h6><Link to="/reset" style={{color:"red"}}>Forget password ?</Link></h6>
            </div>
        </div>
    )
}

export default Signin