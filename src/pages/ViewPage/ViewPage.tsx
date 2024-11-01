import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { deletePost, fetchPostById } from "../../api/api"
import { FormattedDate } from "../../components/FormattedDate/FormattedDate"
import classes from "./viewPage.module.css";
import like from "/src/assets/img/like.png";
import comment from "/src/assets/img/comment.png";

export const ViewPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [created, setCreated] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostById(Number(id));
        setContent(data.post.content);
        setCreated(data.post.created);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  const closeViewPage = () => {
    navigate(`/`);
  };

  const handleDelete = async () => {
    try {
      await deletePost(Number(id));
      navigate('/');
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  const handleUpdate = () => {
    navigate(`/posts/edit/${id}`, { state: { content, created, id: Number(id) } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className={classes["card-container"]}>
      <button className={classes.cross} onClick={closeViewPage}>
            ✖
          </button>
      <div className={classes.author}>
          <div className={classes["avatar-img"]}>
            <img src="" alt="" />
          </div>
          <div className="about-author">
            <p className={classes.name}>Name</p>
            <p>
              status
              <FormattedDate date={Number(created)} />
            </p>
          </div>
        </div>
        <div className={classes.post}>{content}</div>
        <div className={classes.likes}>
            <div className={classes.like}>
                <img src={like} alt="" />
                <span className={classes["icon-title"]}>Нравится</span>
            </div>
            <div className={classes.comment}>
                <img src={comment} alt="" />
                <span className={classes["icon-title"]}>Комментировать</span>
            </div>
        </div>
        <div className={classes["buttons"]}>
          <button type="button" className={classes.edit} onClick={handleUpdate}>Изменить</button>
          <button type="button" className={classes.delete} onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </>
  );
};
