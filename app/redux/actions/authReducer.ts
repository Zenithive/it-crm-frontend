import { useDispatch } from "react-redux";
import { loginSuccess } from "../slice/authSlice"; // Import Redux action
import { useLoginUser } from "../../../graphQl/functions/login.function"; // Import GraphQL login function
import { useRouter } from "next/navigation"; // Import Next.js router

export default function Login() {
  const dispatch = useDispatch();
  const { loginUser, error: apiError, reset } = useLoginUser();
  const router = useRouter();

  const handleNextClick = async (values: { email: string; password: string }) => {
    const response = await loginUser(values.email, values.password);
    
    if (response?.token) {
      localStorage.setItem("token", response.token);

      // Dispatch user data to Redux
      dispatch(loginSuccess({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        token: response.token,
      }));

      router.push("/dashboard");
    }
  };
}
