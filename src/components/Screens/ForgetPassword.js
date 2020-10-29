import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const ForgetPassword = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")

  const PostData = () => {
    fetch("/reset-password",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    }).then(res=>res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error,classes:"#f44336 red"})
      }else{
        M.toast({html: data.message,classes:"#66bb6a green lighten-1"})
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
                <p>Send your email to reset password</p>
                <input 
                  type="text" 
                  placeholder="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button className="btn waves-effect waves-light #2196f3 blue" 
                 onClick={()=> PostData()}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ForgetPassword