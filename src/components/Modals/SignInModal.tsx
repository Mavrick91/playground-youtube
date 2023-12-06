'use client';

import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { InputText } from '../shared/input/InputText';
import { useModal } from '~/providers/ModalProvider';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import Alert, { AlertType } from '../shared/Alert';
import Button from '../shared/Button';
import { auth, signInWithEmailAndPassword } from '~/services/firebase';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

type FormValues = {
  email: string;
  password: string;
};

export default function SignInModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: AlertType | '';
    message: string;
  }>({
    type: '',
    message: '',
  });

  const modalRef = React.useRef<HTMLDivElement>(null);
  const { closeModal, openModal } = useModal();
  useOnClickOutside(modalRef, closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setMessage({ type: '', message: '' });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage({
          type: 'danger',
          message: 'Please verify your email address',
        });

        return;
      }

      closeModal();
    } catch (error: any) {
      const errorsCase: { [key: string]: string } = {
        'auth/invalid-credential': 'Password or email is incorrect',
      };

      setMessage({
        type: 'danger',
        message: errorsCase[error.code] || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50/50 dark:bg-gray-900/50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {message.type && (
          <Alert type={message.type} message={message.message} />
        )}
        <div
          ref={modalRef}
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <InputText
                name="email"
                type="text"
                register={register}
                label="Your email"
                error={errors.email}
              />
              <InputText
                name="password"
                type="password"
                register={register}
                label="Password"
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <button
                  onClick={() => openModal('signup')}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
