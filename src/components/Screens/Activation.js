import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import M from 'materialize-css'

const Activation = () => {
  const history = useHistory()
  const {token} = useParams()
  console.log(token)
  const PostData = () => {
    fetch("/activation",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
                <p>Click on the button to activate your account</p>
                <button className="btn waves-effect waves-light #2196f3 blue" 
                 onClick={()=> PostData()}
                >
                    Activation
                </button>
            </div>
        </div>
    )
}

export default Activation