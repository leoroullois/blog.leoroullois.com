export type PostMeta = {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string;
};

export type Post = {
  code: string;
  frontmatter: PostMeta;
  id: string;
};
