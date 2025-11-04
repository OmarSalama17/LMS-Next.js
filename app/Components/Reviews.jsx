"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
const Reviews = ({ courseId }) => {
  const { user } = useUser();

  console.log(user);

  const t = useTranslations("course_details");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/comments?course_id=${courseId}`
        );
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (e) {
        console.log(e);
        setComments([]);
      }
    };
    fetchComments();
  }, [courseId]);

  const addComment = async () => {
    const { fullName, id: userId, imageUrl, unsafeMetadata } = user;
    console.log("comment", comment);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          content: comment,
          name: fullName,
          image: imageUrl,
          role: unsafeMetadata.role,
          course_id: courseId,
          createdAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      setComments([...comments, data]);
      setComment("");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(comments);

  const handelDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
      method: "DELETE",
    });
    const newComments = comments.filter((comment) => comment.id !== id);

    setComments(newComments);
  };
  return (
    <div className="lg:col-span-1">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {t("reviews_title")}
          </h3>

          <div className="space-y-6">
            {comments && comments.length > 0 ? (
              comments?.map((comment, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-center bg-no-repeat aspect-square bg-cover rounded-full shrink-0">
                      <Image
                        className="rounded-full"
                        width={48}
                        height={48}
                        src={comment.image}
                        alt={comment.name}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {comment.name}
                      </p>
                      <div className="flex items-center gap-1 text-amber-400 mt-1">
                        {comment.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-300">
                    {comment.content}
                  </p>

                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => handelDelete(comment.id)}
                      className="absolute top-2 right-2 flex items-center justify-center size-12 hover:text-[red] duration-100 cursor-pointer ease-in"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  {"No reviews yet"}
                </p>
              </div>
            )}
            {user ? (
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className="flex items-center gap-4">
                  <input
                    className="flex-1 bg-background-light dark:bg-background-dark border-none rounded-full h-12 px-5 focus:ring-primary/50 text-sm"
                    value={comment}
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={addComment}
                    className="flex items-center justify-center size-12 bg-primary text-white rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
