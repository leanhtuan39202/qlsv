"use client";
import {
    changePassword,
    getUserbyUsername,
} from "@/app/(dashboard)/lib/prisma/user";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { Md5 } from "ts-md5";
import * as Yup from "yup";
function Page() {
    const { data: session } = useSession();

    const username = session?.user?.name as string;

    const schema = Yup.object({
        password: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
        newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Mật khẩu phải trùng nhau")
            .required("Vui lòng nhập lại mật khẩu"),
    });
    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            const user = await getUserbyUsername(username);
            if (user?.password === Md5.hashStr(values.password)) {
                toast.promise(changePassword(username, values.newPassword), {
                    loading: "Đang đổi mật khẩu",
                    success: "Đổi mật khẩu thành công",
                    error: "Đổi mật khẩu thất bại",
                });
            } else {
                toast.error("Mật khẩu hiện tại không đúng");
            }
        },
    });
    return (
        <div className="w-full h-screen">
            <h1 className="text-2xl p-6">Đổi mật khẩu</h1>
            <form action="" className="p-6" onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="password">Mật khẩu hiện tại</label>
                    <input
                        className="input input-bordered w-full max-w-sm"
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div className="form-control my-4">
                    <label htmlFor="password">Mật khẩu mới</label>
                    <input
                        className="input input-bordered w-full max-w-sm"
                        type="password"
                        name="newPassword"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                    />
                    <p>
                        <span className="text-error">
                            {formik.errors.newPassword}
                        </span>
                    </p>
                </div>
                <div className="form-control my-4">
                    <label htmlFor="password">Nhập lại mật khẩu mới</label>
                    <input
                        className="input input-bordered w-full max-w-sm"
                        type="password"
                        name="confirmPassword"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    <p>
                        <span className="text-error">
                            {formik.errors.confirmPassword}
                        </span>
                    </p>
                </div>
                <div>
                    <input
                        type="submit"
                        value={"Đổi mật khẩu"}
                        className="btn btn-primary"
                    />
                    <Link
                        href={"/setting"}
                        className={"btn btn-secondary mx-4"}
                    >
                        Quay lại
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Page;
