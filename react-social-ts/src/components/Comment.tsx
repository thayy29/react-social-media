import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { ThumbsUp, Trash } from "phosphor-react";
import React, { useState } from "react";

interface CommentProps {
  content: string,
  onDeleteComment: (comment: string) => void
}

export function Comment({content, onDeleteComment} : CommentProps) {

  const [likeCount, setLikeCount ] = useState(0)

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/thayy29.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Thayana Classo</strong>
              <time title="14 de fevereiro as 10h30" dateTime="2023-02-14">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário" >
              <Trash size={20} />``
            </button>
          </header>
          <p>{content}</p> 
        </div>
        <footer>
          <button onClick={handleLikeComment}> 
            <ThumbsUp /> Aplaudir<span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
