import Layout from "../components/layout";
import React, { useEffect } from "react";
import Link from "next/link";
import {signIn, useSession} from 'next-auth/react'
import { useForm } from "react-hook-form";
import getError from '../utils/error'
import {toast} from 'react-toastify'
import {useRouter} from "next/router";
export default function LoginScreen() {
  const router=useRouter()
  const {data:session}=useSession();
  const {redirect}=router.query;
  useEffect(()=>{
    if(session?.user){
      router.push(redirect||'/')
    }
  },[router,session,redirect]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async({ email, password }) => {
    try{
      const result=await signIn('credentials',{
        redirect:false,
        email,
        password
      })
      if(result.error){
        toast.error(result.error);
      }
    }catch(err){
      toast.error(getError(err))
    }
  };
 
  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">login</h1>
        <div className="mb-4">
          <label htmlfor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "please enter an email" })}
            id="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmfor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "please enter password",
              minLength: {
                value: 8,
                message: "password must be more than 8 characters",
              },
            })}
            id="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
