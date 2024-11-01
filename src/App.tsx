import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Layout } from "./components/index.tsx"
import {PostList, CreationPage, ViewPage, EditPage} from "./pages/index.tsx"
import "./App.css";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<CreationPage />} />
        <Route path="/posts/:id" element={<ViewPage />} /> 
        <Route path="/posts/edit/:id" element={<EditPage />} />
      </Route>
    ),
    { basename: '/router-crud/' }
  );

  return (
    <RouterProvider router={routes} />
  );
}

export default App;