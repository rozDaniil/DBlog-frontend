import React from "react";
import ContentLoader from "react-content-loader";

export const BlogHomePageSkeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={296}
    height={322}
    viewBox="0 0 296 322"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="1" y="0" rx="3" ry="3" width="296" height="150" />
    <rect x="0" y="169" rx="4" ry="4" width="150" height="42" />
    <rect x="0" y="229" rx="4" ry="4" width="200" height="40" />
    <rect x="0" y="287" rx="4" ry="4" width="30" height="30" />
    <rect x="49" y="287" rx="4" ry="4" width="30" height="30" />
    <rect x="197" y="287" rx="4" ry="4" width="100" height="30" />
  </ContentLoader>
);
