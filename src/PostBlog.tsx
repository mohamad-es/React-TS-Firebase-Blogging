import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "./services/api";
import { auth } from "./services/firebase";

type TBlog = {
  fields: {
    title: { stringValue: string };
    content: { stringValue: string };
    createdAt: { timestampValue: string };
  };
};

const PostBlog = () => {
  const url =
    "https://firestore.googleapis.com/v1/projects/blog-d9a1e/databases/(default)/documents/blog";

  const [blogs, setBlogs] = useState<null | TBlog[]>(null);
  const [newBlog, setNewBlog] = useState<{} | TBlog>({});

  const fetchBlogs = async () => {
    const userId = auth.currentUser?.uid;

    if (userId) throw new Error("user not authenticated");

    const blogJson = await api.get(url);
    return blogJson;
  };

  useEffect(() => {
    const loadBlogs = async () => {
      const allBlogs = await fetchBlogs();
      setBlogs(allBlogs?.data.documents);
    };

    loadBlogs();
  }, []);

  const createBlog = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api
      .post(url, {
        body: JSON.stringify(newBlog),
      })
      .then((res) => console.log(res));
  };

  return blogs ? (
    blogs.length === 0 ? (
      <div>no item added yet!</div>
    ) : (
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "50px",
          width: "100%",
          height: "100%",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "static",
            top: "0",
          }}
          onSubmit={(e) => createBlog(e)}
        >
          <h1>PostBlog</h1>
          <input
            style={{}}
            placeholder="create blog here ..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setNewBlog({
                fields: {
                  title: { stringValue: e.target.value },
                  content: { stringValue: "" },
                  createdAt: { stringValue: "" },
                },
              });
            }}
          />
          <button
            style={{
              background: "blue",
            }}
          >
            Create Blog
          </button>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: "1 1",
          }}
        >
          {blogs.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <div>{item?.fields?.title?.stringValue || "no title"}</div>
              <div>{item?.fields?.content?.stringValue || "no content"}</div>
            </div>
          ))}
        </div>
      </div>
    )
  ) : (
    <div>loading ...</div>
  );
};

export default PostBlog;
