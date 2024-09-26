import React, { FC } from "react";

const containerStyle: React.CSSProperties = {
  margin: "10px 15%",
  fontSize: 18,
};

interface AboutViewProps {
  data: string | undefined;
}

const AboutView: FC<AboutViewProps> = (props) => {
  const { data } = props;
  return (
    <>
      <h3>About us</h3>
      <hr />

      <div
        style={containerStyle}
        dangerouslySetInnerHTML={{ __html: data as string }}
      />
    </>
  );
};

export default AboutView;
