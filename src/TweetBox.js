import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import db from "./firebase";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [localTweets, setLocalTweets] = useState([]); // Add local state for temporary tweets

  const sendTweet = (e) => {
    e.preventDefault();
    // Add tweet to local state instead of backend
    if (tweetMessage.trim() !== "") {
      setLocalTweets([
        ...localTweets,
        {
          displayName: "Rafeh Qazi",
          username: "cleverqazi",
          verified: true,
          text: tweetMessage,
          image: tweetImage,
          avatar:
            "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
        },
      ]);
    }
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form onSubmit={sendTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button type="submit" className="tweetBox__tweetButton">
          Tweet
        </Button>
      </form>
      {/* Show local tweets below input */}
      <div style={{ marginTop: 20 }}>
        {localTweets.map((tweet, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #e6ecf0",
              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={tweet.avatar} style={{ marginRight: 10 }} />
              <div>
                <strong>{tweet.displayName}</strong> @{tweet.username}{" "}
                {tweet.verified && (
                  <span style={{ color: "#1da1f2" }}>✔</span>
                )}
              </div>
            </div>
            <div style={{ marginTop: 10 }}>{tweet.text}</div>
            {tweet.image && (
              <img
                src={tweet.image}
                alt="tweet"
                style={{
                  marginTop: 10,
                  maxWidth: "100%",
                  borderRadius: 10,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TweetBox;
