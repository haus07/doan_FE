import api from "@/axios/axios";
import { useDispatch,useSelector } from "@/store";
import { RootState } from "@/store/reducers";
import { createContext, ReactElement, useEffect, useState ,useMemo } from "react";
import Cookies from "universal-cookie";
import { loginStore } from "@/store/reducers/auth"; 
import toast from "react-hot-toast";
import { JwtContextType } from "@/types/auth";
import Lottie from "lottie-react";
import batmanAnim from '@/assets/lottie/batman.json'; 
import supermanAnim from '@/assets/lottie/superman.json';

export const JWTContext = createContext<JwtContextType>(null)

export const JWTProvider = ({ children }: {children:ReactElement}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.authSlice);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);


    const getProfile = async () => {
        try {
            const response = await api.get('api/v1/auth/me');
            dispatch(loginStore({isLoggedIn:true,user:response?.data.user}))
        } catch (err) {
            toast.error(err?.response.data.message);
        } finally {
            setIsInitialized(true);
        }
    }

    useEffect(() => {
        getProfile()
    },[])
    

    const login = async (email:string,password:string) => {
        try {
        const response = await api.post('api/v1/auth/login', {
        email,
        password
        });
        dispatch(loginStore({ isLoggedIn: true, user: response?.data.user }));
        toast.success(response?.data.message);
        } catch (err) {
            throw err;
        }
    }


    const contextValue = {
        ...state,
        login
    };

    const loadingConfig = useMemo(() => {
    const options = [
      {
        id: 'batman',
        animation: batmanAnim,
        // Màu vàng nghệ đặc trưng Batman
        textColor: 'text-[#F5C518]', 
        text: 'Batcomputer is connecting...',
        // Nếu thích background khác nhau thì thêm vào đây, còn ko thì thôi
      },
      {
        id: 'superman',
        animation: supermanAnim,
        // Màu đỏ tươi đặc trưng logo Superman
        textColor: 'text-[#E62429]', 
        text: 'Man of Steel is landing...',
      },
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }, []);

    if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#000000]">
        <div className="w-48 h-48">
          <Lottie animationData={loadingConfig.animation} loop={true} />
        </div>
        <p className={`font-bold mt-2 tracking-[0.2em] uppercase text-xs ${loadingConfig.textColor}`}>
           {loadingConfig.text}
        </p>
      </div>
    );
  }
    return (
        <JWTContext.Provider value={contextValue}>
            {children}
        </JWTContext.Provider>
    );
}

export default JWTProvider;
