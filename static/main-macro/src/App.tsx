import { useEffect, useState } from "react";
import { Modal, invoke } from "@forge/bridge";

import "./App.css";

type Topic = {
  id: number;
  title: string;
  author: string;
  date_published: string;
  content: string;
};
export type InitResponse = {
  blog: Topic;
  isEditing: boolean;
};

function App() {
  const [blog, setBlog] = useState<Topic>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    invoke<InitResponse>("init").then((data) => {
      setIsEditing(data.isEditing);
      setLoading(false);
      setBlog(data.blog);
    });
  }, []);

  console.log("is", isEditing, loading, blog);
  useEffect(() => {
    if (isEditing && !blog && !loading) {
      const modal = new Modal({
        resource: "modal-content",
        onClose: (payload) => {
          setBlog(payload.topic);
          invoke("updateBlogContext", {
            blog: payload.topic,
          });
        },
        size: "large",
      });
      modal.open();
    }
  }, [isEditing, loading]);

  return (
    <>
      {blog ? (
        <>
          <h1>{blog.title}</h1>
          <h3>
            {blog.author} on {blog.date_published}
          </h3>
          <p>{blog.content}</p>
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default App;
