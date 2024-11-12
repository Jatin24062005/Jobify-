import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../constant/index";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { navLists } from "../../constant/index";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((store) => store.auth.loading);
  const user = useSelector((store) => store.auth.user);

  const logoutHandler = async () => {
    try {

      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white  flex justify-between items-center py-3 px-6">
      <h1 className="font-cg font-semibold text-2xl">
        Jobi <span className="text-electric-lime-500">fy</span>
      </h1>

      {
                            user && user.role === 'recruiter' ? (
                                <div className="w-fit"> 
                                    <Link to="/admin/companies" className="px-5 text-sm text-gray-100 hover:text-electric-lime-400 transition-all">Companies</Link>
                                    <Link to="/admin/jobs" className="px-5 text-sm text-gray-100 hover:text-electric-lime-400 transition-all">Jobs</Link>
                                </div>
                            ) : (
        <div className="flex flex-1 justify-center max-sm:hidden">
          <Link to="/" className="px-5 text-sm text-gray-100 hover:text-electric-lime-400 transition-all">Home </Link>
          <Link to="/jobs" className="px-5 text-sm text-gray-100 hover:text-electric-lime-400 transition-all">Job </Link>
          <Link to="/browse" className="px-5 text-sm text-gray-100 hover:text-electric-lime-400 transition-all">Browse </Link>

        </div>
      )}

      <div className="flex items-center">
        {!user ? (
          <div className="space-x-4">
            <Button
              variant="outline"
              className="bg-gradient-to-t from-electric-lime-600 to-electric-lime-500 text-white hover:to-transparent hover:from-transparent transition-all"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex gap-4 space-y-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <p className="text-sm font-cg font-bold">
                    Hello {user.name}!
                  </p>
                  <h6 className="text-xs">{user.bio}</h6>
                </div>
              </div>

              <div className="flex flex-col my-2 text-gray-600">
                {/* Conditionally render View Profile for students */}
                {user.role === "student" && (
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}

                {/* Logout Button */}
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}