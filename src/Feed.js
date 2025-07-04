import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import db from "./firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );

    return unsubscribe;
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map(
          ({ id, displayName, username, verified, text, avatar, image }) => (
            <Post
              key={id}
              displayName={displayName}
              username={username}
              verified={verified}
              text={text}
              avatar={avatar}
              image={image}
            />
          )
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
