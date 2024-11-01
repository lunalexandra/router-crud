import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../../api/api";
import classes from "./creationPage.module.css";
import publication from "/src/assets/img/pencil.png";
import ether from "/src/assets/img/camera.png";
import photoVideo from "/src/assets/img/photo_color.png";
import another from "/src/assets/img/dots.png";
import emoji from "/src/assets/img/emoji.png";

export const CreationPage = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const closeCreationPage = () => {
    navigate("/posts");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);
    try {
      await createPost(content);
      console.log("Создан");
      closeCreationPage();
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes["top-line"]}>
          <div className={classes.item}>
            <img src={publication} alt="" className={classes.icon} />
            <span className={classes["icon-title"]}>Публикация</span>
          </div>

          <div className={classes.item}>
            <img src={photoVideo} alt="" className={classes.icon} />
            <span className={classes["icon-title"]}>Фото/видео</span>
          </div>

          <div className={classes.item}>
            <img src={ether} alt="" className={classes.icon} />
            <span className={classes["icon-title"]}>Прямой эфир</span>
          </div>

          <div className={classes.item}>
            <img src={another} alt="" className={classes.icon} />
            <span className={classes["icon-title"]}>Еще</span>
          </div>

          <button className={classes.cross} onClick={closeCreationPage}>
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes["creation-box"]}>
            <div className={classes["avatar-img"]}>
              <img src="" alt="" />
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={classes.textarea}
            ></textarea>
            <img src={emoji} alt="" className={classes.emoji} />
          </div>

          <div className={classes["send"]}>
            <button type="submit" className={classes.btn}>
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
