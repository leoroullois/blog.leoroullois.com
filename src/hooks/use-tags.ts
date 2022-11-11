export const useTags = (tags: string): string[] => {
  const tagsArray = tags.split(' ');
  return tagsArray.map((elt) => `#${elt}`);
};
