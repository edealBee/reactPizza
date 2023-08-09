import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={200}
    height={350}
    viewBox="0 0 200 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="15" rx="100" ry="100" width="180" height="180" />
    <rect x="30" y="200" rx="0" ry="0" width="140" height="25" />
    <rect x="35" y="230" rx="20" ry="20" width="130" height="74" />
    <rect x="10" y="310" rx="0" ry="0" width="70" height="28" />
    <rect x="90" y="310" rx="10" ry="10" width="105" height="28" />
  </ContentLoader>
);

export default MyLoader;
