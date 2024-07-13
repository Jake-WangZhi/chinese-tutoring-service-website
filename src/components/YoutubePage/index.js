import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import YoutubeEmbed from "../Youtube";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";
import supabase from "../../supabaseClient";

const Youtube = ({
  video_code,
  title,
  description,
  answer,
  width,
  height,
  isNew,
}) => {
  return (
    <div className={clsx("text--center", styles.column)}>
      <div className={clsx(styles.youtubeBlock)}>
        <YoutubeEmbed embedId={video_code} width={width} height={height} />
        <div className={clsx(styles.description)}>
          <h3>
            {title}{" "}
            {isNew && (
              <span className={clsx(styles.latestLabel)}>(Latest)</span>
            )}
          </h3>
          <p>{description}</p>
          {answer && (
            <>
              <div className={styles.dashed}></div>
              <h3>Answers for the video questions:</h3>
              <p>{answer}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function LatestItem({ latestItem }) {
  return (
    <div className={clsx("row", styles.latestBlock)}>
      <Youtube width={640} height={480} isNew={true} {...latestItem} />
    </div>
  );
}

function Items({ currentItems }) {
  return (
    <div className={clsx("row", styles.row)}>
      {currentItems &&
        currentItems.map((props, idx) => (
          <Youtube key={idx} width={480} height={360} {...props} />
        ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [youtubeList, setYoutubeList] = useState([]);
  const [latestVideo, setLatestVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .order('created_at', { ascending: false });

        setLatestVideo(data.shift());
        setYoutubeList(data);
        setIsLoading(false);

        if (error) {
          throw error;
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = youtubeList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(youtubeList.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % youtubeList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading ? (
        <BeatLoader color="#6EA4CA" />
      ) : (
        <>
          {itemOffset === 0 && <LatestItem latestItem={latestVideo} />}
          <Items currentItems={currentItems} />
          <div className={styles.paginationLayout}>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< prev"
              pageClassName={clsx(styles.paginationItem)}
              pageLinkClassName={clsx(styles.paginationItem)}
              previousClassName={clsx(styles.paginationItem)}
              previousLinkClassName={clsx(styles.paginationItem)}
              nextClassName={clsx(styles.paginationItem)}
              nextLinkClassName={clsx(styles.paginationItem)}
              breakLabel="..."
              breakClassName={clsx(styles.paginationItem)}
              breakLinkClassName={clsx(styles.paginationItem)}
              containerClassName={clsx(styles.pagination)}
              activeClassName={clsx(styles.active)}
            />
          </div>
        </>
      )}
    </>
  );
}

const YoutubePage = () => {
  return (
    <section className={styles.layout}>
      <div>
        <PaginatedItems itemsPerPage={12} />
      </div>
    </section>
  );
};

export default YoutubePage;
