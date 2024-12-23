interface Props {
  htmlString: string;
}
export const RenderHtml: React.FC<Props> = ({ htmlString }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlString }} // Render HTML safely
    />
  );
};
