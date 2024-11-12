import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../constant/index.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const loading = useSelector((store) => store.auth.loading);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      console.log("Sending login request:", input);
      
      // Perform login request
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log("Response received:", res.data);
      if (res.data.success) {
        dispatch(setUser(res.data.user));   // Set user in Redux
        toast.success(res.data.message);    // Show success toast
        navigate("/");                      // Navigate to home page
      } else {
        console.log("Login failed:", res.data.message);
      }
    } catch (error) {
      console.log("Error during login:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));           // Set loading to false
    }
  };

  // Effect to watch for `user` state changes and navigate when user is set
  useEffect(() => {
    if (user) {
      console.log("User is logged in, navigating to home page...");
      navigate("/");
    }
  }, [user, navigate]);  // Only re-run when `user` changes

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md hover:shadow-md hover:shadow-electric-lime-800 p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="YourEmail@example.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="*********"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full bg-electric-lime-800 hover:bg-electric-lime-950 my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-electric-lime-800 hover:bg-electric-lime-950 my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline-offset-4 hover:underline">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
