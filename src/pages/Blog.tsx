import { useEffect } from "react";
import { Pagination } from "antd";

import { BlogRecentPost } from "../components/BlogPosts/BlogRecentPost";
import { BlogSmallPost } from "../components/BlogPosts/BlogSmallPost";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPosts } from "../redux/slices/posts/postsSlice";
import { BlogHomePageSkeleton } from "../components/skeleton/BlogHomePage";

export const Blog = () => {
  const { postsData } = useAppSelector(({ posts }) => posts);
  const { commentData } = useAppSelector(({ comment }) => comment);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const allPosts = postsData && postsData.slice(2);
  const recentPosts = postsData && postsData.slice(0, 2);

  const recentPostRender = () => {
    if (recentPosts) {
      return recentPosts.map((post) => (
        <BlogRecentPost
          key={post._id}
          id={post._id}
          title={post.title}
          text={post.text}
          tags={post.tags}
          img={post.imageUrl ? post.imageUrl : ""}
          createdAt={post.createdAt}
          userName={post.user.fullName}
          userImg={post.user?.avatarUrl as string}
          userId={post.user._id}
        />
      ));
    } else {
      return Array(6)
        .fill(null)
        .map((item, index) => <BlogHomePageSkeleton key={index} />);
    }
  };

  const allPostsRender = () => {
    if (allPosts) {
      return allPosts.map((post) => (
        <BlogSmallPost
          key={post._id}
          id={post._id}
          title={post.title}
          text={post.text}
          img={post.imageUrl ? post.imageUrl : ""}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={
            commentData.filter((comment) => comment.post === post._id).length
          }
        />
      ));
    } else {
      return Array(6)
        .fill(null)
        .map((item, index) => <BlogHomePageSkeleton key={index} />);
    }
  };

  return (
    <>
      <div className="content">
        <div className="latestContent">
          <div>
            <p className="content--title">Featured Posts</p>
            <div className="underline" />
          </div>
          <div className="latestContentContainer">{recentPostRender()}</div>
        </div>

        <div className="mostViewedContent">
          <div>
            <p className="content--title">Recent Posts</p>
            <div className="underline" />
          </div>
          <div className="mostViewedContenttContainer">{allPostsRender()}</div>
          <div className="pagination">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </>
  );
};
