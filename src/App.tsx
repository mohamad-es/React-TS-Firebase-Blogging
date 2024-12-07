import "./App.css";
import PostBlog from "./PostBlog";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "auto",
      }}
    >
      <PostBlog />
    </div>
  );
}

export default App;
