import { Dispatch, useEffect, useMemo, useState } from "react";
import hljs from "highlight.js";
import ReactQuill from "react-quill";
import { TCreateBlogAction } from "src/types/actions";

import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.min.css";
import { TCreateBlogState, TFetchingStates } from "src/types/states";

type Props = {
  state: TFetchingStates<TCreateBlogState>;
  dispatch: Dispatch<TCreateBlogAction>;
};

const RichTextEditor = ({ dispatch, state }: Props) => {
  const [content, setContent] = useState(state.data?.content);

  useEffect(() => {
    setContent(state.data?.content);
  }, [state.data?.content]);

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "code-block"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link", "image", "code-block"];

  const handleChange = (value: string) => {
    setContent(value);
    dispatch({ type: "SUCCESS", payload: { ...state.data, content: value } });
  };

  return (
    <ReactQuill
      value={content!}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      placeholder="Write blog content here ..."
      className="min-h-64"
    />
  );
};

export default RichTextEditor;