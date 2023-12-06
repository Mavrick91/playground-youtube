'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import EmailVerificationPopup from '~/components/EmailVerificationPopup';
import Button from '~/components/shared/Button';
import { useModal } from '~/providers/ModalProvider';
import { useUser } from '~/providers/UserProvider';
import {
  applyActionCode,
  auth,
  sendEmailVerification,
} from '~/services/firebase';

export default function ValidateEmailPage() {
  const user = useUser();
  const router = useRouter();
  const { openModal, modalState, closeModal } = useModal();
  const [popupContent, setPopupContent] = useState({
    title: 'Please wait, your email address is being verified...',
    message:
      "We are currently processing your email verification. This shouldn't take long.",
    footer: <Button isLoading />,
  });
  const queryParams = useSearchParams();
  const oobCode = queryParams.get('oobCode');
  const mode = queryParams.get('mode');

  const handleResendEmail = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      await sendEmailVerification(user);
      setPopupContent({
        title: 'Email sent',
        message: 'Please check your inbox and follow the instructions',
        footer: <div />,
      });
    } catch (error: any) {
      const errorsCase: { [key: string]: string } = {
        'auth/too-many-requests':
          'You have reached the limit of email verification requests. Please try again later',
      };

      setPopupContent({
        title: 'Error sending email',
        message: errorsCase[error.code] || 'Please try again later',
        footer: (
          <Button buttonType="red" type="button">
            Re-send confirmation email
          </Button>
        ),
      });
    }
  }, [user]);

  const verifyEmail = useCallback(async () => {
    try {
      await applyActionCode(auth, oobCode as string);
      setPopupContent({
        title: 'Verification successful',
        message: 'Your email has been verified',
        footer: <Button type="button">Confirm</Button>,
      });
    } catch (error: any) {
      setPopupContent({
        title: 'Verification error',
        message: 'There was an error verifying your email address',
        footer: (
          <Button buttonType="red" type="button" onClick={handleResendEmail}>
            Re-send confirmation email
          </Button>
        ),
      });
    }
  }, [handleResendEmail, oobCode]);

  useEffect(() => {
    if (!user) {
      openModal('signin');
    } else if (user.emailVerified) {
      router.push('/');
    } else if (user && modalState.isOpen) {
      closeModal();
    }
  }, [closeModal, modalState.isOpen, openModal, router, user]);

  useEffect(() => {
    if (mode === 'verifyEmail' && oobCode && user?.emailVerified === false) {
      setTimeout(() => {
        verifyEmail();
      }, 2000);
    }
  }, [mode, oobCode, user, verifyEmail]);

  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div className="relative grow h-72">
      <EmailVerificationPopup {...popupContent} />
    </div>
  );
}
