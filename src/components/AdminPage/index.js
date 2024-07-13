import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import supabase from "../../supabaseClient";

function extractVideoCode(url) {
  const matches = url.match(/youtu\.be\/(.+)/);
  return matches ? matches[1] : null;
}

const AdminPage = () => {
  const [youtubeUrl, setyoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsValid(false);

    if (youtubeUrl && title && description) {
      setIsValid(true);
      setIsSent(false);
    }
  }, [youtubeUrl, title, description, answer]);

  const handleClick = async () => {
    try {
      const data = {
        video_code: extractVideoCode(youtubeUrl),
        title,
        description,
        answer,
      };

      setIsLoading(true);

      const { data: response, error } = await supabase
      .from('youtube_videos')
      .insert(data);

      if (error) {
        throw error;
      }

      if (response) {
        setIsSent(true);
        setyoutubeUrl("");
        setTitle("");
        setDescription("");
        setAnswer("");
      }
    } catch (error) {
      console.error(error);
      setIsSent(false);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }

    setIsLoading(false); // set loading state to false once response is received
  };

  return (
    <section>
      <div className="container margin-bottom--xl center">
        <div className={clsx("row", styles.form)}>
          <input
            type="text"
            placeholder="Youtube Share Url (Required)"
            value={youtubeUrl}
            onChange={(e) => setyoutubeUrl(e.target.value)}
            className={clsx(styles.input)}
          />
          <textarea
            type="text"
            placeholder="Title (Required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={clsx(styles.input)}
          />
          <textarea
            type="text"
            placeholder="Description (Required)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={clsx(styles.input)}
            rows="4"
          />
          <textarea
            type="text"
            placeholder="Answer (Optional)"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={clsx(styles.input)}
            rows="4"
          />

          <button
            disabled={!isValid}
            onClick={handleClick}
            className={clsx(styles.button)}
          >
            {isLoading ? "Sending..." : isSent ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
