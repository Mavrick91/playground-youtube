'use client';

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useModal } from '~/providers/ModalProvider';
import { app } from '~/services/firebase';
import Alert, { AlertType } from '~/components/shared/Alert';
import { InputText } from '~/components/shared/input/InputText';
import { useState } from 'react';
import Button from '../shared/Button';
import useOnClickOutside from '~/hooks/useOnClickOutside';

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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: AlertType | '';
    message: string;
  }>({
    type: '',
    message: '',
  });
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();
  useOnClickOutside(modalRef, closeModal);

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

  const onSubmit = async (data: FormValues) => {
    const auth = getAuth(app);
    setIsLoading(true);
    setMessage({ type: '', message: '' });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);

        setMessage({
          type: 'success',
          message: 'Verification email sent',
        });
      }
    } catch (error: any) {
      const errorsCase: { [key: string]: string } = {
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-email': 'Invalid email',
      };

      setMessage({
        type: 'danger',
        message: errorsCase[error.code],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50/50 dark:bg-gray-900/50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {message.type && (
          <Alert type={message.type} message={message.message} timeout={5000} />
        )}
        <div
          ref={modalRef}
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
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
              <Button type="submit" isLoading={isLoading}>
                Create an account
              </Button>
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
