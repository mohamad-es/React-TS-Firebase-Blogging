import { ReactNode } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import ErrorEmptyList from "./ErrorEmptyList";

type Props <T>= {
  children: ReactNode;
  loading: boolean;
  error: string | null;
  data?: T;
  emptyListText?: string;
};

const RenderState = <T,>({
  loading,
  error,
  children,
  data,
  emptyListText,
}: Props<T>) => {
  if (loading) return <Loading />;
  if (error) return <ErrorMessage text={error} />;
  if (!data) return <ErrorEmptyList text={emptyListText || "Not found item"} />;
  return children;
};

export default RenderState;
