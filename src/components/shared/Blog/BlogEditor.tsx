import { ChangeEvent, Dispatch } from "react";
import { Fragment } from "react/jsx-runtime";
import RichTextEditor from "../../Editor/RichTextEditor";
import { TCreateBlogState } from "src/types/states";
import { TCreateBlogAction } from "src/types/actions";

type Props = {
  state: TCreateBlogState;
  dispatch: Dispatch<TCreateBlogAction>;
};

const BlogEditor = ({ dispatch, state }: Props) => {
  return (
    <Fragment>
      <div className="flex flex-col gap-y-10 mt-16">
        <textarea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({ type: "SUCCESS", payload: { ...state, title: e.currentTarget.value } })
          }
          placeholder="Write blog title here ..."
          className="text-4xl mx-10 bg-transparent font-bold focus-visible:outline-none outline-none border-none italic"
          value={state.title as string}
          rows={3}
        />

        <RichTextEditor dispatch={dispatch} state={state} />
      </div>
    </Fragment>
  );
};

export default BlogEditor;
