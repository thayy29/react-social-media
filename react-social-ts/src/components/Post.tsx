
import { formatDistanceToNow, format } from "date-fns";
import {  ptBR } from 'date-fns/locale/pt-BR'
import {  useState, FormEvent, ChangeEvent, InvalidEvent} from "react";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import styles from "./Post.module.css";

  interface Author {
    avatarUrl: string,
    name: string,
    role: string
  }

  interface Content {
    type : "paragraph" | "link",
    content: string
  }

  interface PostProps {
    author: Author,
    content: Content[],
    publishedAt: string
  }


export function Post({author, content, publishedAt } : PostProps) {

  //controla quais comentários o post tem
  const [comments, setComments ] = useState(["Que post bacana, hein?!"]);

  //controla as novas alterações no input do textarea
  const[ newCommentText, setnewCommentText ] = useState("")

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'")
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
    locale: ptBR
  })

  //MOSTRA NOVO COMENTÁRIO
  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

    //pega o valor mais atual da textarea e substitui o parametro da função que atualiza a lista
    //depois chama a função que retorna o estado da textarea para o inicial
    const newCommentText = event.target.comment.value;
    setComments([...comments, newCommentText])
    setnewCommentText("")
  } 
  //MONITORAR TODA ALTERAÇÃO NO INPUT
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setnewCommentText(event.target.value);
  }

  //MONITORA SE O COMENTARIO FOI ENVIADO COM ALGUM VALOR
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
      event.target.setCustomValidity("Nova mensagem") 
}

  //DELETA O COMENTÁRIO
  function deleteComments(commentToDelete : string){
        const commentsWithoutDeletedOne = comments.filter(comment  => {
      return comment != commentToDelete
    })
    setComments(commentsWithoutDeletedOne)
  }
  
  const isNewCommentEmpty = newCommentText.length === 0


  return (
    <article className={styles.post}>
      <header>
          <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
          <strong>{author.name}</strong>
          <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toString()}>
              {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if(line.type === "paragraph"){
            return (
              <p key={line.content}>{line.content}</p>
            )
          } else if (line.type ==="link") {
            return(
              <p key={line.content}><a href="#">{line.content}</a></p>
            )
          }
        })}
        
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
        name ="comment" 
        onChange={handleNewCommentChange}
        value={newCommentText}
        onInvalid={handleNewCommentInvalid}
        required
        placeholder="Deixe um comentário" />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
       {comments.map((comment)=> {
        return (
          <Comment key={comment} content={comment} onDeleteComment={deleteComments}/>
        )
       })}
      </div>
    </article>
  );
}``
