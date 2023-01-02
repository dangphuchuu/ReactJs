import {useEffect, useState} from 'react'
//1.useEffect(callback)->ít dùng
//_callback bị gọi lại mỗi khi component re-render
//2.useEffect(callback,[]) ->Thường dùng
//_Chỉ gọi 1 lần khi component mounted
//3.useEffect(callback, [dependency])
//_callback sẽ được gọi lại khi dependency thay đổi

const tabs = ['posts','comments','albums','photos','todos','users'] //khởi tạo tabs để gọi các api
function Content()
{
    const[title,setTitle] = useState('')
    const [posts,setPosts] = useState([]);
    const [type,setType] = useState('posts')//set các loại button vừa chọn(posts,comments,albums,photos,todos,users), gán giá trị đầu là posts

    console.log(type)
    
        useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res=>res.json())
        .then(posts=>{
            setPosts(posts);
        })
    },[type])
    
    return (
    <div>
        {tabs.map(tab=>(
            <button key={tab}
            style = {type === tab ?{color:'white',backgroundColor:'red'}:{}}
             onClick={() =>setType(tab)}
             >
                {tab}
            </button>
        ))}
        <input value={title} onChange={e=>setTitle(e.target.value)} />
        <ul>
        {posts.map(post=>(
            <li key={post.id}>{post.title || post.name}</li>
        ))}
        </ul>
    </div>
    )
}
export default Content