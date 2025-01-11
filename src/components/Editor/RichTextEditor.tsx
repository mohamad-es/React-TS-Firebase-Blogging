import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.min.css"; // Import Highlight.js theme
import ReactQuill from "react-quill";

type Props = {
  content: string;
  title: string;
  setContent: any;
};

const RichTextEditor: React.FC<Props> = ({ content, setContent }) => {
  // Configure Quill modules
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
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      placeholder="Write blog content here ..."
      className="min-h-64"
    />
  );
};

export default RichTextEditor;
