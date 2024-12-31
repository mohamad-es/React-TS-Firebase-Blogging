import React, { useMemo, useRef} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.min.css"; // Import Highlight.js theme
import Preview from "./Preview";

type Props = {
  content: string;
  setContent: any;
};

const RichTextEditor: React.FC<Props> = ({ content, setContent }) => {
  const modalsRef = useRef<HTMLDialogElement | null>(null);
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
      />

      {/* Preview Section */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button type="button" onClick={()=> modalsRef.current?.showModal()} className="btn">Preview</button>
      <dialog ref={modalsRef} className="modal w-screen">
        <div className="modal-box w-screen max-w-screen-xl">
          <h3 className="font-bold text-lg">Hello!</h3>
      <Preview content={content} />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RichTextEditor;
