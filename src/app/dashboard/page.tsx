"use client";
import React, { useState } from "react";
import { apiKey, channelId } from "@/components/dev";
import { useQuery } from "react-query";
import { sendComment } from "@/components/utils/DashboardU";

const Dashboard = () => {
  const [comments, setComments] = useState<any>();
  const [shawcomments, setShawComments] = useState<any>([]);
  const [videodetails, setVideoDetails] = useState<any>([]);
  const { isLoading, error, data } = useQuery<any>("fetchVideo", () =>
    fetch(
      `http://localhost:3000/v1/search?order=date&part=snippet&channelId=${channelId}&key=${apiKey}&maxResults=2000`
    ).then((res) => res.json())
  );
  console.log("working");

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error;

  const fetchComments = async ({ videoId }: any) => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&part=replies&videoId=${videoId}&key=${apiKey}&maxResults=2000`
      );

      if (response.ok) {
        const data = await response.json();

        setComments(data.items);
      } else {
        console.error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div className="">
      <div>
        <h1>YouTube Videos</h1>
        <div>
          {data?.data?.items?.map((video: any, index: any) => {
            const videoInfo = {
              title: video.snippet.title,
              description: video.snippet.description,
              tags: video.snippet.tags,
              channelTitle: video.snippet.channelTitle,
            };

            return (
              <div
                key={video.id}
                className="flex flex-col items-center py-6 justify-between px-24"
              >
                <div className="flex gap-6 items-center">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                  <div className="">
                    <h2>{video.snippet.title}</h2>
                    <p>{video.snippet.publishedAt}</p>
                  </div>
                  <button
                    className="px-6 py-3 bg-red-600 rounded-xl"
                    onClick={() => sendComment(video.id.videoId)}
                  >
                    Send Auto Comment
                  </button>
                  <button
                    onClick={() => {
                      fetchComments(video.id);
                      setShawComments(shawcomments === index ? null : index);
                      setVideoDetails(videoInfo);
                    }}
                    className="px-6 py-3  bg-gray-600 rounded-xl"
                  >
                    Show
                  </button>
                </div>
                {shawcomments === index && (
                  <div className="">
                    {comments?.map((comment: any) => {
                      // const bardResponse = handleBardAI(
                      //   comment.snippet.topLevelComment.snippet.textOriginal,
                      //   videodetails
                      // );

                      return (
                        <div className="flex items-center justify-between">
                          <div className="">
                            <img
                              className="rounded-xl"
                              src={
                                comment.snippet.topLevelComment.snippet
                                  .authorProfileImageUrl
                              }
                              alt=""
                            />
                            <h2>
                              {
                                comment.snippet.topLevelComment.snippet
                                  .authorDisplayName
                              }
                            </h2>
                            <p>
                              {
                                comment.snippet.topLevelComment.snippet
                                  .publishedAt
                              }
                            </p>
                            <p className="border rounded-xl py-4 px-6">
                              {
                                comment.snippet.topLevelComment.snippet
                                  .textOriginal
                              }
                            </p>

                            <div className="pl-24">
                              replyed comment :
                              {comment?.replies?.comments.map((reply: any) => (
                                <div className="flex items-center mt-6">
                                  <div className="border rounded-xl py-4 px-6">
                                    <div className="flex items-center gap-6">
                                      <img
                                        className="rounded-full"
                                        src={
                                          reply.snippet.authorProfileImageUrl
                                        }
                                        alt=""
                                      />
                                      <h2>{reply.snippet.authorDisplayName}</h2>
                                    </div>
                                    <p>{reply.snippet.publishedAt}</p>
                                    <p className="text-2xl">
                                      {reply.snippet.textOriginal}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
