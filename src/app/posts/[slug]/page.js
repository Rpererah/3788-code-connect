"use client";

import { CardPost } from "@/components/CardPost";
import { CommentList } from "@/components/CommentList";
import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";

const fetchPostBySlug = async({slug})=>{
  const results=await fetch(`/api/post/${slug}`)
  const data= await results.json()
  return data
}

const PagePost = ({ params }) => {
  const { slug } = params;

  const {data:post} =useQuery({
    queryKey:['post',slug],
    queryFn:()=>fetchPostBySlug({slug}),
    staleTime:2000,
    //refetchOnWindowFocus:false //por padrao is true entao ele faz o retched sempre que o usuario sai de tela
    //gcTime:2000, //-> tempo para jogar no lixo
    //refetchInterval:2000 //-> tempo para fazer o refetched 
  })


  const postRating = null;

  return (
    <div>
      {post && (
        <>
          <CardPost
            post={post}
            rating={postRating?.rating}
            category={postRating?.category}
            highlight={true}
          />
          <h3 className={styles.subtitle}>Código:</h3>
          <div className={styles.code}>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
          </div>
          <CommentList comments={post.comments} slug={slug} />
        </>
      )}
    </div>
  );
};

export default PagePost;
