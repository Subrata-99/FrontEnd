import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {
  const history = useHistory()
  const [password, setPassword] = useState("")
  const {token} = useParams()
  const PostData = () => {
    fetch("/new-password",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        token
      })
    }).then(res=>res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error,classes:"#f44336 red"})
      }else{
        M.toast({html:data.message, classes:"#66bb6a green lighten-1"})
        history.push("/signin")
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
                  type="password" 
                  placeholder="Enter new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button className="btn waves-effect waves-light #2196f3 blue" 
                 onClick={()=> PostData()}
                >
                    Reset 
                </button>
            </div>
        </div>
    )
}

export default Signin