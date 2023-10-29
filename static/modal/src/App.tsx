import { useEffect, useState } from "react";
import { view } from "@forge/bridge";

import "./App.css";
import * as API from "./api";

type Topic = {
  id: number;
  title: string;
  author: string;
  date_published: string;
  content: string;
};

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  const fetchTopics = async () => {
    try {
      setIsFetching(true);
      const response = await API.fetchTopics();
      setTopics(response.data);
    } catch (err) {
      console.log("error", err);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const onClick = (e: React.MouseEvent) => {
    const id = parseInt(e.currentTarget.id);
    const topic = topics.find((aTopic) => aTopic.id === id);
    if (!topic) {
      return;
    }
    view.close({ topic });
  };

  return (
    <>
      <div>
        <h1>Select a blog to continue</h1>
        <div className="topic-list">
          {topics.map((aTopic) => {
            return (
              <div key={aTopic.id} className="topic-item">
                <div>
                  {aTopic.title} by{" "}
                  <b>
                    <i>{aTopic.author}</i>
                  </b>
                </div>
                <div>
                  <button onClick={onClick} id={aTopic.id.toString()}>
                    Select this blog
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
