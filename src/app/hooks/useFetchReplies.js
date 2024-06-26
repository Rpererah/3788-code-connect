import { useQuery } from "@tanstack/react-query"

const fetchReplies = async ({commentId,slug})=>{
    const response= await fetch(`/api/comment/${commentId}/replies?slug=${slug}`)

    if(!response.ok){
        throw new Error("A resposta de rede nao esta ok")
    }

    return response.json()
}

export const useFetchReplies = ({commentId,slug}) => {
    return(
        useQuery({
            queryKey:["replies",commentId],
            queryFn:() => fetchReplies({commentId,slug}),
            enabled:!!commentId && !!slug,
        })
    )
}