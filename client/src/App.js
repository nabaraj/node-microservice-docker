import React, { useEffect } from "react";
import './App.css';
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  // const getBg = async () => {
  //   // console.log(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASHKEY}&username=ns_moble_photography`);
  //   let res = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASHKEY}&username=ns_moble_photography`);
  //   let data = await res.json();
  //   document.body.style.backgroundImage = "url('" + data.urls.regular + "')"
  // }
  // useEffect(() => {
  //   // document.body.classList.add('gradient-custom')
  //   // getBg()
  // }, []);
  return (
    <div className="container glass py-3 px-5">
      <h1 className="text-black">Create Post</h1>
      <PostCreate />
      <h1 className="text-black py-3">Posts</h1>
      <PostList />
    </div>);
};

export default App;
