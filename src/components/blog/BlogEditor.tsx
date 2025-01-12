import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";
import RichTextEditor from "../Editor/RichTextEditor";

type Props = {
  title: string;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

const BlogEditor = ({ content, setTitle, title, setContent }: Props) => {
  return (
    <Fragment>
      <div className="flex flex-col gap-y-10 mt-16">
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.currentTarget.value)}
          placeholder="Write blog title here ..."
          className="text-4xl mx-10 bg-transparent font-bold focus-visible:outline-none outline-none border-none italic"
          value={title}
          rows={3}
        />

        <RichTextEditor setContent={setContent} content={content} title={title} />
      </div>
    </Fragment>
  );
};

export default BlogEditor;
