import React, { FC } from 'react';

interface IProps {
  title: string;
  description:string;
  ogType:string;
  url: string;
  image: string;
  twitterUsername: string;
}

const SEO: FC<IProps> = ({title, description, ogType, url, image, twitterUsername}) => {
  return (
    <>
      <meta name='title' content='Meta Tags — Preview, Edit and Generate' />
      <meta
        name='description'
        content={description}
      />

      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={url}/>
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:image'
        content={image}
      />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url}/>
      <meta key="twitter:site" property="twitter:site" content={twitterUsername}/>
      <meta
        property='twitter:title'
        content={title}
      />
      <meta
        property='twitter:description'
        content={description}
      />
      <meta
        property='twitter:image'
        content={image}
      />
    </>
  );
};

export default SEO;
