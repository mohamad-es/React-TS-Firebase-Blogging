import hljs from "highlight.js";
import { useEffect, useRef } from "react";

const Preview: React.FC<{ content: string }> = ({ content }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });
    }
  }, [content]);

  return <div className="whitespace-pre-wrap leading-7" ref={previewRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Preview;
