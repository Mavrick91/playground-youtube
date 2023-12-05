'use client';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { InputText } from '../shared/input/InputText';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useModal } from '~/providers/ModalProvider';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Password confirmation is required'),
});

export default function SignUpModal() {
  const { openModal } = useModal();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <section className="bg-gray-50/20 dark:bg-gray-900/20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputText
                name="email"
                type="text"
                placeholder="john.doe@gmail.com"
                label="Your email"
                register={register}
                error={errors.email}
              />
              <InputText
                name="password"
                type="password"
                placeholder="••••••••"
                label="Password"
                register={register}
                error={errors?.password}
              />
              <InputText
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                label="Confirm Password"
                register={register}
                error={errors?.confirmPassword}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => openModal('signin')}
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
