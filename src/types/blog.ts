import { Timestamp } from "firebase/firestore";

export type TBlogData = {
  title: string;
  not_found: string;
};

export type TBlog = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user_email: string;
  create_time: Timestamp;
  update_time: Timestamp;
};

