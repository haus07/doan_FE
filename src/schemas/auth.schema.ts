//=== | AUTH VALIDATION | ===//
import { z } from "zod";


export const loginSchema = z.object({
    email: z.string()
        .min(1, "Vui lòng nhập email")
        .email("Email không hợp lệ"),
    password: z.string()
        .min(8, "Mật khẩu có ít nhất 8 kí tự")
});

export type LoginFormData = z.infer<typeof loginSchema>;

