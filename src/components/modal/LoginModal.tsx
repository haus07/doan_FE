import React, { useState, useContext } from 'react';
import { Eye, EyeOff, X, Github } from 'lucide-react';
import { JWTContext } from '@/context/JwtContext';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema,LoginFormData } from '@/schemas/auth.schema';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
} 




const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(JWTContext);
  
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!login) return;
    setApiError(null); // Reset lỗi API cũ

    try {
      // Gọi hàm login (React Hook Form tự xử lý loading qua biến isSubmitting)
      await login(data.email, data.password);
      onClose();
      toast.success("Đăng nhập thành công!");
    } catch (err: any) {
      // Lấy message lỗi từ backend trả về
      const message = err.response?.data?.message || "Đăng nhập thất bại";
      setApiError(message);
      toast.error(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-[450px] bg-[#121212] p-8 rounded-xl shadow-2xl border border-zinc-800 animate-fade-in-up z-10 mx-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition bg-transparent hover:bg-zinc-800 p-2 rounded-full"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-2 text-white">Music App</h2>
          <p className="text-zinc-400 text-sm">Đăng nhập để tiếp tục nghe nhạc</p>
        </div>

        {/* Form - Thay đổi onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Error Message từ API (Lỗi logic) */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-2 rounded-md text-center">
              {apiError}
            </div>
          )}

          {/* Email Input */}
          <div className="relative group">
            <input
              type="text"
              {...register("email")} // Thay thế value & onChange bằng register
              placeholder="Email hoặc tên đăng nhập"
              className={`w-full pl-4 pr-4 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition font-medium
                ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#1DB954] focus:ring-[#1DB954]'}
              `}
            />
            {/* Hiển thị lỗi Validation của Zod */}
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")} // Đăng ký input password
              placeholder="Mật khẩu"
              className={`w-full pl-4 pr-10 py-3 bg-[#2a2a2a] border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 transition font-medium
                ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-transparent focus:border-[#1DB954] focus:ring-[#1DB954]'}
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Hiển thị lỗi Validation của Zod */}
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="rounded bg-zinc-800 border-zinc-600 text-[#1DB954] focus:ring-0 cursor-pointer" />
              <span className="text-zinc-400 group-hover:text-white transition">Ghi nhớ tôi</span>
            </label>
            <a href="#" className="text-[#1DB954] hover:text-[#1ed760] hover:underline transition font-medium">Quên mật khẩu?</a>
          </div>

          {/* Button Submit */}
          <button
            type="submit"
            disabled={isSubmitting} // Tự động disable khi đang gửi API
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full uppercase tracking-wider transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Đang xử lý...
              </>
            ) : "Đăng nhập"}
          </button>
        </form>

        {/* ... Phần Divider và Social Buttons giữ nguyên ... */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#121212] text-zinc-500 font-medium">Hoặc</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 border border-zinc-600 text-white py-2.5 rounded-full hover:border-white hover:bg-zinc-800 transition font-bold text-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span>Đăng nhập bằng Google</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 border border-zinc-600 text-white py-2.5 rounded-full hover:border-white hover:bg-zinc-800 transition font-bold text-sm">
            <Github size={20} />
            <span>Đăng nhập bằng GitHub</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-400 border-t border-zinc-800 pt-6">
          Bạn chưa có tài khoản?
          <button onClick={onSwitchToRegister} className="text-white font-bold hover:text-[#1DB954] hover:underline ml-1">Đăng ký ngay</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;