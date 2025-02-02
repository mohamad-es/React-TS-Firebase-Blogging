import { ReactNode } from "react";
import ErrorMessage from "../custom/ErrorMessage";
import Loading from "../custom/Loading";

type Props<T> = {
  children: ReactNode;
  loading: boolean;
  loadingRender?: ReactNode;
  error: string | null;
  data?: T[] | null | undefined;
  emptyListText?: string;
};

const RenderState = <T,>({ loading, error, children, loadingRender, data }: Props<T>) => {
  if (loading) return loadingRender ? loadingRender : <Loading />;
  if (error) return <ErrorMessage text={error} />;
  if (data?.length === 0) return <ErrorMessage text="No content availabe" />;

  return children;
};

export default RenderState;
