import { ReactNode } from "react";
import ErrorMessage from "../Custom/ErrorMessage";
import Loading from "../Custom/Loading";

type Props<T> = {
  children: ReactNode;
  loading: boolean;
  loadingRender?: ReactNode;
  error: string | null;
  data?: T | null;
  emptyListText?: string;
};

const RenderState = <T,>({ loading, error, children, loadingRender }: Props<T>) => {
  if (loading) return loadingRender ? loadingRender : <Loading />;
  if (error) return <ErrorMessage text={error} />;

  return children;
};

export default RenderState;
