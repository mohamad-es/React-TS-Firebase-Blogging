import React, { RefObject, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.min.css"; // Import Highlight.js theme
import Preview from "./Preview";

type Props = {
  content: string;
  title: string;
  setContent: any;
  modalsRef: RefObject<HTMLDialogElement>;
};

const RichTextEditor: React.FC<Props> = ({
  content,
  title,
  setContent,
  modalsRef,
}) => {
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
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <div>
      {/* Rich Text Editor */}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write blog content here ..."
        style={{
          minHeight:'200px'
        }}
      />

      <dialog ref={modalsRef} className="modal w-screen">
        <div className="modal-box w-screen max-w-screen-xl">
          <h3 className="font-bold text-3xl mb-10">{title}</h3>
          <Preview content={content} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RichTextEditor;
