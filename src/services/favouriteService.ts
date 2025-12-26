import api from "@/axios/axios"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const toggleFavourite = async (favouriteId:number,type:string) => {
        const response = await api.post('api/v1/favourites/toggle', {
            favouriteId,
            type
        });
        return response.data.message;
}

