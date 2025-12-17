import api from "@/axios/axios"
import { PlayerContext } from "@/context/PlayerContext";
import { useQuery } from "@tanstack/react-query"
import { useContext,useEffect } from "react";

export const useGetRandomFiveAlbums = () => {
    return useQuery({
        queryKey: ['random', 'five-albums'],
        queryFn: async () => {
            const response = await api.get('api/v1/albums/random-five');
            console.log(response);
            return response.data.data;
        },
        staleTime: 1000 * 60 * 60 * 12
    })  
}

export const useGetAlbumDetail = (id: number) => {
    const { setSongsData } = useContext(PlayerContext)
    const query = useQuery({
        queryKey: ['albumDetail', id],
        queryFn: async () => {
            const response = await api.get(`api/v1/albums/${id}`);
            console.log(response)
            return response.data.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 12
    })

     useEffect(() => {
            if (query?.data?.songs) {
                setSongsData(query?.data?.songs);
            }
     }, [query.data, setSongsData]);
    return query;
}