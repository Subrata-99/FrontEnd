import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

  useEffect(() => {
    if(url) {
      uploadFields()
    }
  },[url])
  const uploadPic = () => {
    const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","blog-app")
        data.append("cloud_name","subdas")

        fetch("https://api.cloudinary.com/v1_1/subdas/image/upload",{
            method: "post",
            body: data
        }).then(res => res.json())
        .then(data=> {
            setUrl(data.url)
        }).catch(err => {
            console.log(err)
        })
  }

  const uploadFields = () => {
    fetch("/signup",{
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        pic: url,
        password
      })
    }).then(res=>res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error,classes:"#f44336 red"})
      }else{
        M.toast({html:data.message,classes:"#66bb6a green lighten-1"})
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const postData = () => {
    if(image) {
      uploadPic()
    }else {
      uploadFields()
    }
  }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Blog-App</h2>
                <input 
                  type="text" 
                  placeholder="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #2196f3 blue">
                        <span>Upload Pic</span>
                        <input type="file" onChange={(event) => setImage(event.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #2196f3 blue" 
                 onClick={() => postData()}  
                >
                    Signup
                </button>
                <h5>
                  <Link to="/signin">Already have an account ?</Link>    
                </h5>  
            </div>
        </div>
    )
}

export default Signup