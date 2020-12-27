import React from "react"
import ContentLoader from "react-content-loader"

const UserLoader = (props) => (
  <ContentLoader
    speed={2}
    width={270}
    height={140}
    viewBox="0 0 270 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="140" y="51" rx="3" ry="3" width="100" height="10" />
    <rect x="140" y="75" rx="3" ry="3" width="100" height="36" />
    <circle cx="74" cy="74" r="52" />
  </ContentLoader>
)

export default UserLoader