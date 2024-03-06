import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import "./global.css";

import styles from "./App.module.css";


const posts = [
{
  id: 1,
  author: {
    avatarUrl: 'https://www.github.com/thayy29.png',
    name: 'thayana classo',
    role: 'front-end developer'
  },
  content : [
    {type: 'paragraph', content: 'Fala galera', },
    {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.'},
    {type: 'link', content: 'jane.design/doctorcare'},
  ],
  publishedAt: new Date ("2022-05-03 20:00:00")
},
{
  id: 2,
  author: {
    avatarUrl: 'https://www.github.com/maykbrito.png',
    name: 'Mayk Brito',
    role: 'Front-end Developer'
  },
  content : [
    {type: 'paragraph', content: 'Fala galera', },
    {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa.'},
    {type: 'link', content: 'jane.design/doctorcare'},
  ],
  publishedAt: new Date ("2022-05-03 20:00:00")
}
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
