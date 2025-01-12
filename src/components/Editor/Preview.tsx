import hljs from "highlight.js";
import { useEffect, useRef } from "react";

type Props = {
  title?: string;
  content: string;
  img?: string;
};

const Preview: React.FC<Props> = ({ content, title, img }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <div>
      {img && <img src={img} className="w-full h-96 object-cover" />}
      {title && <h1 className="mb-12 mt-16 px-10">{title}</h1>}
      <div
        className="whitespace-pre-wrap px-10 leading-7"
        ref={previewRef}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      ;
    </div>
  );
};

export default Preview;
