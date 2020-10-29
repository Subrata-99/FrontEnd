import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost =() => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if(url) {
            fetch("/createpost",{
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                  title,
                  body,
                  pic: url
                })
              }).then(res=>res.json())
              .then(data => {
                if(data.error) {
                  M.toast({html: data.error,classes:"#f44336 red"})
                }else{
                  M.toast({html:"Created post successfully!",classes:"#66bb6a green lighten-1"})
                  history.push("/")
                }
              }).catch(err => {
                console.log(err)
            })
        }
        
    },[url])
    
    const postDetails = () => {
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

    return(
        <div className="Card input-fld"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input
             type="text" 
             placeholder="title"
             value={title}
             onChange={(event) => setTitle(event.target.value)} 
            />
            <input
             type="text" 
             placeholder="body"
             value={body}
             onChange={(event) => setBody(event.target.value)} 
            />
            <div className="file-field input-field">
                <div className="btn #2196f3 blue">
                    <span>Upload Image</span>
                    <input type="file" onChange={(event) => setImage(event.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #2196f3 blue" 
             onClick={() => postDetails()}
            >
                    Submit Post
            </button>
        </div>
    )
}

export default CreatePost