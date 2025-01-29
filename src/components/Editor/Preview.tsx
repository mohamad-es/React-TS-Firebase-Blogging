import hljs from "highlight.js";
import { Image01Icon } from "hugeicons-react";
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
      {state?.img ? (
        <img src={state.img} alt="" className="w-full h-96 object-cover border-b bg-white" />
      ) : (
        <div className="w-full bg-gray-200 border-b h-96 flex items-center justify-center">
          <Image01Icon size={150} color="gray" />
        </div>
      )}

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
