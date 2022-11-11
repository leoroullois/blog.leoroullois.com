// INFO: types articles/posts

export type PostMeta = {
  id: string;
  title: string;
  description: string;
  author: string;
  date: number;
  tags: string[];
  image: string;
};

export type PostSlugParams = {
  params: {
    slug: string;
    post: BlogPostCategory;
  };
};


export type Post = {
  code: string;
  frontmatter: PostMeta;
  id: string;
};

export type BlogPostCategory = "articles" | "writeups";

// INFO: Functions

export type SortPosts = (arr: PostMeta[]) => PostMeta[];

export type GetSortedPostsData = (category: BlogPostCategory) => PostMeta[];

export type GetPostBySlug = (
  category: BlogPostCategory,
  slug: string
) => Promise<Post>;

export type GetPostsSlugs = (category: BlogPostCategory) => PostSlugParams[];
