import { useNavigate } from 'react-router-dom';
import { FormattedDate } from '../FormattedDate/FormattedDate';
import classes from "./card.module.css";
import emoji from "/src/assets/img/emoji.png";
import photo from "/src/assets/img/photo.png";
import gif from "/src/assets/img/gif.png";
import like from "/src/assets/img/like.png";
import comment from "/src/assets/img/comment.png";

interface CardProps {
  id: number;
  content: string;
  created: string;
}

export const Card: React.FC<CardProps> = ({ id, content, created}) => {
  
const navigate = useNavigate();

 const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  console.log(e.type)
  console.log(`/posts/${id}`)
  navigate(`/posts/${id}`);
 }

   return (
    <>
      <div className={classes["card-container"]} onClick={handleClick}>
        <div className={classes.author}>
          <div className={classes["avatar-img"]}>
            <img src="" alt="" />
          </div>
          <div className="about-author">
            <p className={classes.name}>Ivan Ivanov</p>
            <p>
              Основатель группы
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
        <div className={classes["create-comment-container"]}>
          <img src="" alt="" className={classes["small-avatar"]} />
          <textarea
            name=""
            id=""
            className={classes["textarea"]}
            placeholder="Напишите комментарий..."
          ></textarea>
          <div className={classes.icons}>
            <img src={emoji} alt="" className={classes.emoji} />
            <img src={photo} alt="" className={classes["photo-icon"]} />
            <img src={gif} alt="" className={classes["gif-icon"]} />
          </div>
        </div>
      </div>
    </>
  );
};
