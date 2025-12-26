// src/components/common/LikeButton.tsx
import { Heart } from 'lucide-react'; // Hoặc icon ông thích
import { useToggleFavourite } from '@/hooks/useToggleFavourite';

interface LikeButtonProps {
    targetId: number;
    targetType: 'song' | 'album' | 'artist';
    initialLiked?: boolean;
    className?: string; // Để custom CSS tùy chỗ
    size?: number;
}

export const LikeButton = ({ 
    targetId, 
    targetType, 
    initialLiked = false,
    className = "",
    size = 24
}: LikeButtonProps) => {
    
    // Gọi Hook
    const { isLiked, handleToggle } = useToggleFavourite(targetId, targetType, initialLiked);
    return (
        <button 
            onClick={handleToggle}
            className={`transition-transform active:scale-90 ${className}`}
        >
            <Heart 
                size={size}
                // Nếu like rồi thì tô màu đỏ, chưa thì trong suốt có viền
                fill={isLiked ? "#ef4444" : "transparent"} 
                color={isLiked ? "#ef4444" : "currentColor"}
            />
        </button>
    );
};