import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'


const Profile = () => {
    const {state, dispatch} = useContext(UserContext)
    const [mypic, setPic] = useState([])
    const [image, setImage] = useState("")
    
    useEffect(() => {
        fetch("/mypost",{
            headers:{
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setPic(result)
        })
    },[])

    useEffect(() => {
        if(image) {
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","blog-app")
            data.append("cloud_name","subdas")

            fetch("https://api.cloudinary.com/v1_1/subdas/image/upload",{
                method: "post",
                body: data
            }).then(res => res.json())
            .then(data=> {
                fetch("/updatepic",{
                    method: "put",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic:data.url
                    })
                }).then(res=> res.json())
                .then(result => {
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type: "UPDATEPIC",payload: data.url})
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },[image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>

            
            <div style={{
                display:"flex",
                justifyContent:"space-around",
            }}>
                <div>
                    <img style={{width:"160px",hight:"",borderRadius:"80px" }}
                     src={state ? state.pic : "Loading..."}
                    />
                    
                </div>
                <div>
                    <h4>{state ? state.name : "Loading..."}</h4>
                    <h5>{state ? state.email : "Loading..."}</h5>
                    <div style={{display:"flex"}}>
                       <h6>{mypic.length} posts</h6>
                    </div>
                </div>
            </div>
            <div className="file-field input-field" style={{margin: "10px"}}>
                    <div className="btn #2196f3 blue">
                        <span>Update Pic</span>
                        <input type="file" onChange={(event) => updatePhoto(event.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
            </div>    
            <div className="gallery">
                {
                    mypic.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
               
            </div>
        </div>
    )
}

export default Profile