import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePost } from "../../api/api";
import classes from "./editPage.module.css";
import emoji from "/src/assets/img/emoji.png";
import { useState } from "react";

export const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { content, id } = location.state || { content: "", created: "", id: 0 };
  const [newContent, setNewContent] = useState(content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(e.target.value);
  };

  const closeEditPage = () => {
    navigate(`/posts/${id}`);
  };

  const handleUpdate = async () => {
    try {
      await updatePost(id, newContent);
      console.log("Пост обновлен");
    } catch (error) {
      console.error("Ошибка при обновлении поста:", error);
    }

    navigate(`/posts/${id}`);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className={classes["card-container"]}>
        <div className={classes.title}>
          <span>Редактировать публикацию</span>
          <button className={classes.cross} onClick={closeEditPage}>
            ✖
          </button>
        </div>
        <div className={classes["edit-post"]}>
          <div className={classes["avatar-img"]}>
            <img src="" alt="" />
          </div>
          <textarea
            name=""
            id=""
            className={classes.textarea}
            ref={textareaRef}
            value={newContent}
            onChange={handleChange}
          ></textarea>
          <img src={emoji} alt="" className={classes.emoji} />
        </div>

        <div className={classes["safe"]}>
          <button
            type="button"
            className={classes["safe-btn"]}
            onClick={handleUpdate}
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};
