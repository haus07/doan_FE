// src/hooks/useToggleLike.ts
import { useState } from 'react';
import { toggleFavourite } from '@/services/favouriteService';
import toast from 'react-hot-toast';

export const useToggleFavourite = (
    id: number, 
    type: 'song' | 'album' | 'artist', 
    initialLiked: boolean = false
) => {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Chặn sự kiện click xuyên qua (ví dụ click tim ko bị play nhạc)
        
        // 1. Optimistic UI: Đổi màu ngay lập tức cho user sướng
        const previousState = isLiked;
        setIsLiked(!previousState); 
        try {
            setIsLoading(true);
            // 2. Gọi API ngầm
            await toggleFavourite(id, type);
        } catch (err) {
            // 3. Nếu lỗi -> Revert lại trạng thái cũ
            setIsLiked(previousState);
             toast.error(err.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLiked, handleToggle, isLoading };
};