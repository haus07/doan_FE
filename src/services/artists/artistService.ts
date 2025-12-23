import { useQuery } from '@tanstack/react-query'
import api from '../../axios/axios'
import { useEffect, useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';




export const useHandleGetPopularArtist = () => {
    return useQuery({
        queryKey: ['popular','artist'],
        queryFn: async () => {
            const response = await api.get('api/v1/artists/popular')
            return response.data.data
            
        },
        staleTime: 1000 * 60 * 60 * 12
    })
}



export const useHandleGetArtistDetail = (id) => {
    const { setSongsData } = useContext(PlayerContext);

    const query = useQuery({
        queryKey: ['artistDetail', id],
        queryFn: async () => {
            const response = await api.get(`api/v1/artists/${id}`);
            // CHỈ return data, không set state ở đây
            return response.data.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 12, 
    });

    // Dùng useEffect để sync data vào Context
    useEffect(() => {
        if (query?.data?.songs) {
            setSongsData(query?.data?.songs);
        }
    }, [query.data, setSongsData]); // Chạy lại khi data thay đổi

    return query;
}