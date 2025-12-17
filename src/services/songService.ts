import api from "@/axios/axios"
import { PlayerContext } from "@/context/PlayerContext";
import { useQuery } from "@tanstack/react-query"
import { useContext,useEffect } from "react";

export const useGetRandomTenSongs = () => {
    return useQuery({
        queryKey: ['random', 'ten-songs'],
        queryFn: async () => {
            const response = await api.get('api/v1/songs/random-ten');
            return response.data.data;
        },
        staleTime: 1000 * 60 * 60 * 12
    })  
}
