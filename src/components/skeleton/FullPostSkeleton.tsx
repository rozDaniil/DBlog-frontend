import React from "react";
import ContentLoader from "react-content-loader";

export const FullPostSkeleton = () => (
  <ContentLoader
    speed={2}
    width={950}
    height={665}
    viewBox="0 0 950 665"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="300" height="15" />
    <rect x="0" y="58" rx="4" ry="4" width="900" height="60" />
    <rect x="0" y="152" rx="4" ry="4" width="920" height="500" />
    <rect x="1" y="200" rx="0" ry="0" width="620" height="30" />
  </ContentLoader>
);
