import { Dispatch, useEffect, useMemo, useState } from "react";
import hljs from "highlight.js";
import ReactQuill from "react-quill";
import { TCreateBlogAction } from "src/types/actions";

import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.min.css";
import { TCreateBlogState } from "src/types/states";

type Props = {
  state: TCreateBlogState;
  dispatch: Dispatch<TCreateBlogAction>;
};

const RichTextEditor = ({ dispatch, state }: Props) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    dispatch({ type: "SUCCESS", payload: { ...state, content: value } });
  }, [value]);

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

  // Configure Quill formats
  const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link", "image", "code-block"];

  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder="Write blog content here ..."
      className="min-h-64"
    />
  );
};

export default RichTextEditor;
