"use client";

import axios from "axios";
import { apiKey } from "../dev";

const sendReply = async (parentId: any, replyText: any) => {
  const data = {
    snippet: {
      textOriginal: replyText.reply,
      parentId: parentId,
    },
  };

  try {
    const Token = await axios.get(
      "http://localhost:3000/auth/users/659629f645e36205daed5339?key=AutoCommentIQ"
    );
    console.log(Token.data, "fetchToken");
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/comments?part=snippet,id`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token.data.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("Reply sent:", result);
  } catch (error) {
    console.error("Error sending reply:", error);
  }
};

export async function handleBardAI(commentText: string, videoInfo: any) {
  try {
    const response = await axios.get(`http://localhost:3000/fetchData`, {
      // const response = await axios.get(`http://localhost:3000/v1/ai`, {
      params: {
        message: `i need a replay message for you tube comment i will give you tiitle and des and also i will give you comment message and can you write a replay message as a like human in one line  write only answer replay no need explain only answer , no need this only meessage text only\"**\n like this **\n  title='${commentText}' description='${videoInfo.description} '  youtubeTag='${videoInfo.tags}' youtubechennal='${videoInfo.channelTitle}' comment='${commentText} ' `,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error from Bard AI:", error);
    return "Default response if Brand AI fails";
  }
}
export const fetchChannels = async () => {
  try {
    const Token = await axios.get(
      "http://localhost:3000/auth/users/659629f645e36205daed5339?key=AutoCommentIQ"
    );
    const accessToken = Token.data.accessToken; // Replace with your actual access token
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=${accessToken}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.items.id, "data");
    } else {
      throw new Error("Failed to fetch channels");
    }
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
};

export const fetchVideoDetails = async (videoId: any) => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    const data = await response.json();
    return data.items[0]; // Return the first video item
  } catch (error) {
    console.error("Error fetching video details:", error);
    return {};
  }
};
export const sendComment = async (videoId: any) => {
  let commentCount = 0;
  let totalLoadingTime = 0;
  console.log(commentCount, "commentCount");
  console.log(totalLoadingTime, "totalLoadingTime");

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&key=${apiKey}&maxResults=2000`
    );
    const data = await response.json();
    const comments = data.items || [];
    console.log(data, "data");

    for (const comment of comments) {
      console.log(comments, "comments");

      const parentId = comment.snippet.topLevelComment.id;
      const commentText = comment.snippet.topLevelComment.snippet.textOriginal;

      // Process comment with Bard AI and pass video title and description
      // const videoId = comment.snippet.topLevelComment.snippet.videoId; // Add this line if video title is available
      const videoDetails = await fetchVideoDetails(videoId);

      const videoInfo = {
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        tags: videoDetails.snippet.tags,
        channelTitle: videoDetails.snippet.channelTitle,
      };

      const bardResponse = await handleBardAI(commentText, videoInfo);

      // Reply to comment using Bard AI response
      await sendReply(parentId, bardResponse);
    }
    const startProcessingTime = performance.now(); // Start time for processing each comment

    // Process comment with Bard AI and send reply

    const endProcessingTime = performance.now(); // End time for processing each comment
    const commentLoadingTime = endProcessingTime - startProcessingTime;

    // Calculate total loading time for comments
    totalLoadingTime += commentLoadingTime;
    commentCount++;

    console.log(`Total time to process all comments: ${totalLoadingTime}ms`);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
