import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../../utils/rules";
import { Popover } from "..";
import { Link, Navigate } from "react-router-dom";
import icons from "../../utils/icons";
import { AppContext } from "../../contexts/app.context";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../apis/auth.api";
import { path } from "../../constant/path";
import { clearLs } from "../../utils/auth";

export const NavHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [islogin, setIslogin] = useState(true);

  const arrowRef = useRef(null);
  const { AiFillInstagram, TfiFacebook } = icons;
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const { profile, isAuthenticated,setIsAuthenticated} = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      clearLs()
    }
  })
  const handleLogOut= () => {
    logoutMutation.mutate()
  }

  return (
    <div className="text-[13px] flex justify-between font-[500] w-full">
      <div className="flex items-center justify-start gap-[8px] text-white ">
        <Link to={path.home} className=" border-r-[1px] border-gray pr-[8px] ">
          Kênh Người bán
        </Link>
        <Link to={path.home} className=" border-r-[1px] border-gray pr-[8px] ">
          Trở thành Người bán Shopee
        </Link>
        <Link to={path.home} className=" border-r-[1px] border-gray pr-[8px] ">
          Tải ứng dụng
        </Link>
        <div className="flex gap-2 items-center">
          <span>Kết nối</span>

          <a href="https://www.facebook.com" target="_blank">
            <div className="p-[3px] rounded-full bg-white flex justify-center items-center">
              <TfiFacebook color="red" fontSize=".75em" />
            </div>
          </a>

          <a href="https://www.instagram.com" target="_blank">
            <AiFillInstagram color="white" fontSize="1.5em" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 text-white">
        <Popover
          className="  flex items-center cursor-pointer py-1 "
          renderPopover={
            <div className="text-[14px] pl-4 py-[2px] pr-[80px]  rounded-sm bg-white border">
              <div className="  py-1 hover:text-orange cursor-pointer ">
                Tiếng Việt
              </div>
              <div className="  py-1 hover:text-orange cursor-pointer">
                English
              </div>
            </div>
          }
        >
          <div className="flex gap-1 hover:text-gray-200 hover:stroke-gray-200 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <span className="font-[400]">Tiếng việt </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </Popover>
        {!isAuthenticated && (
          <>
            <div className="  py-1 hover:text-gray-200 cursor-pointer   ">
              <Link to={path.register} >Đăng ký</Link> 
            </div>
            <div className="  py-1 hover:text-gray-200 cursor-pointer">
            <Link to={path.login}>Đăng Nhập</Link> 
            </div>
          </>
        )}
        {isAuthenticated && (
          <Popover
            renderPopover={
              <div className="text-[14px] w-[150px] h-[120px] py-[5px]  px-[10px]  rounded-sm bg-white border">
                <div className=" capitalize  py-2 hover:text-textGreen  cursor-pointer ">
                  Tài khoản của tôi
                </div>
                <div className=" capitalize   py-2 hover:text-textGreen cursor-pointer">
                  Đơn mua
                </div>
                <div onClick={handleLogOut} className=" capitalize  block py-2 hover:text-textGreen cursor-pointer">
                  Đăng xuất
                </div>
              </div>
            }
          >
            <div className="flex gap-1">
              <div className="bg-purple-600  p-[12px] rounded-full cursor-pointer "></div>{" "}
              <span className="flex items-center justify-center cursor-pointer font-[400]">{profile?.email}</span>
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};
