import Layout from '@/components/layout';
import  getError  from '../utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
function ProfileScreen() {
    const{data:session}=useSession();
    const{
        handleSubmit,
        register,
        getValues,
        setValue,
        formState:{errors}

    }=useForm();
    useEffect(()=>{
        setValue('name',session.user.name);
        setValue('email',session.user.email);
    },[session.user,setValue]);
    const submitHandler=async({name,email,password,confirmPassword})=>{
        try{
            await axios.put('/api/auth/update',{
                name,
                email,
                password
            });
            const result=await signIn('credentials',{
                redirect:false,
                email,
                password
            });
            toast.success('profile updated successf')
            if(result.error){
                toast.error(result.error)
            }
        }catch(err){
            toast.error(getError(err))
        }    }
  return (
    <Layout title='profile'>
        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl'>update profile</h1>
            <div className='mb-4'>
                <label htmlFor='name'>Name</label>
                <input type='text' autoFocus name='name' className='w-full' id='name'
                {...register('name',{
                    required:'please enter your name'
                })}
                />
                {errors.name &&(
                    <div className='text-red-500'>{errors.name.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' className='w-full' id='email'
                {...register('email',{
                    required:'please enter your email'
                })}
                />
                {errors.email &&(
                    <div className='text-red-500'>{errors.email.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password'className='w-full' id='password'
                {...register('password',{
                    required:'please enter your password'
                })}
                />
                {errors.password &&(
                    <div className='text-red-500'>{errors.password.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='confirmpassword'>confirmPassword</label>
                <input type='password'className='w-full' name='confirmpassword' id='confirmpassword'
                {...register('confirmPassword',{
                    validate:(value)=>value===getValues('password')
                })}
                />
                {errors.confirmPassword &&(
                    <div className='text-red-500'>{errors.confirmPassword.message}</div>
                )}
                {
                    errors.confirmPassword && errors.confirmPassword.type==='validate' &&(
                        <div className='text-red-500'>paasword dont match</div>
                    )
                }
            </div>
            <div className='mb-4'>
                <button className='primary-button'>update ptofile</button>
            </div>
        </form>
    </Layout>
  )
}
ProfileScreen.auth=true;
export default  ProfileScreen;