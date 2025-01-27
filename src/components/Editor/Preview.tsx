import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { TCreateBlogState } from "src/types/states";

type Props = {
  state: TCreateBlogState;
};

const Preview = ({ state }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });
    }
  }, [state.content]);

  return (
    <div className="relative">
      {state.img && <img src={state.img} className="w-full h-96 object-cover" />}
      <h1 className="mb-12 mt-16 px-10">{state.title}</h1>
      <div
        className="whitespace-pre-wrap px-10 leading-7"
        ref={previewRef}
        dangerouslySetInnerHTML={{ __html: state.content! }}
      />
    </div>
  );
};

export default Preview;
