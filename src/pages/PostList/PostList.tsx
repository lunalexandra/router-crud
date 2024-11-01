import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchPosts, ListData } from "../../api/api"
import { Card } from "../../components/Card/Card";
import classes from "./postList.module.css";

interface PostListProps {
  children?: ReactNode;
}

export const PostList = ({ children }: PostListProps) => {
  const [list, setList] = useState<ListData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const createPost = () => {
    navigate('/posts/new');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPosts();
        const result: ListData[] = response;
        console.log("render")
        setList(result);
      } catch (error) {
        setError("Ошибка загрузки данных. Попробуйте еще раз позже.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["send"]}>
        <button type="button" className={classes.btn} onClick={createPost}>Создать пост</button>
      </div>
      {error ? (
        <div className={classes.error}>{error}</div>
      ) : (
        <>
          {list.length === 0 ? (
            <div className={classes.empty}>Постов пока нет.</div>
          ) : (
            list.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()).map((item) => (
              <Card key={item.id} id={item.id} content={item.content} created={item.created} />
            ))
          )}
        </>
      )}
      {children}
    </div>
  );
};
