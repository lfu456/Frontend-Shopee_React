import React, { useContext } from "react";
import { RegisterLayout } from "../../layouts";
import { Login } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Schema, getRules, schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../apis/auth.api";
import { omit } from "lodash";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse } from "../../types/utils.type";
import { AppContext } from "../../contexts/app.context";
import { Button, Input } from "../../components";
import { path } from "../../constant/path";

type FormData = Pick<Schema, "email" | "password" | "confirm_password">;
const registerSchema = schema.pick(["email", "password", "confirm_password"]);

export const Register = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // const rules = getRules()

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        navigate("/");
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FormData, "confirm_password">>
          >(error)
        ) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) =>
              setError(key as keyof Omit<FormData, "confirm_password">, {
                message:
                  formError[key as keyof Omit<FormData, "confirm_password">],
                type: "Server",
              })
            );
          }
        }
      },
    });
  });

  //console.log('error', errors);

  return (
    <div className="bg-orange">
      <div className="container  w-[1200px] m-auto">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="rounded bg-white p-10 shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng Ký</div>
              <div className="flex flex-col mt-8 ">
                <Input
                  name="email"
                  type="email"
                  register={register}
                  placeholder="email"
                  errorMessage={errors.email?.message}
                />
                <Input
                  name="password"
                  placeholder="password"
                  type="password"
                  register={register}
                  errorMessage={errors.password?.message}
                />
                <Input
                  name="confirm_password"
                  placeholder="confirm password"
                  type="password"
                  register={register}
                  errorMessage={errors.confirm_password?.message}
                />
              </div>

              <div className="mt-3">
                <Button
                  type="submit"
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className="flex  w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600"
                >
                  Đăng nhập
                </Button>
              </div>

              <div className="mt-8  "></div>

              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-red-400" to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
