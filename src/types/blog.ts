export type TBlog = {
  name: string;
  fields: {
    title: {
      stringValue: string;
    };
    content: {
      stringValue: string;
    };
    authorId: {
      stringValue: string;
    };
  };
  createTime: string;
  updateTime: string;
};
