import React from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { render, screen, fireEvent, act } from '~/test-utils';
import SignInModal from './SignInModal';
import * as ModalModule from '../../providers/ModalProvider';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

const mockResponseSignIn: UserCredential = {
  user: {
    email: 'test@test.com',
    emailVerified: false,
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    providerId: '',
    uid: '',
    isAnonymous: false,
    metadata: {
      creationTime: '01 January 2022 00:00:00 UTC',
      lastSignInTime: '01 January 2022 00:00:00 UTC',
    },
    providerData: [],
    refreshToken: 'REFRESH_TOKEN',
    tenantId: null,
    delete: jest.fn(),
    getIdToken: jest.fn(),
    getIdTokenResult: jest.fn(),
    reload: jest.fn(),
    toJSON: jest.fn(),
  },
  providerId: 'test',
  operationType: 'signIn',
};

describe('SignInModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens the sign up modal when the sign up button is clicked', async () => {
    const openModal = jest.fn();
    const modalState = {
      isOpen: false,
      modalType: () => null as unknown as JSX.Element,
    };
    const closeModal = jest.fn();
    jest
      .spyOn(ModalModule, 'useModal')
      .mockReturnValue({ openModal, modalState, closeModal });

    render(<SignInModal />);
    const loginButton = screen.getByText('Sign up');

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(openModal).toHaveBeenCalledWith('signup');
  });

  it('calls signInWithEmailAndPassword with the correct values', async () => {
    const mockSignInWithEmailAndPassword =
      signInWithEmailAndPassword as jest.MockedFunction<
        typeof signInWithEmailAndPassword
      >;
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({
      ...mockResponseSignIn,
      user: { ...mockResponseSignIn.user, emailVerified: true },
    });

    const closeModal = jest.fn();
    jest.spyOn(ModalModule, 'useModal').mockReturnValue({
      openModal: jest.fn(),
      modalState: {
        isOpen: false,
        modalType: () => null as unknown as JSX.Element,
      },
      closeModal,
    });

    render(<SignInModal />);
    const emailInput = screen.getByLabelText('Your email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      'test@test.com',
      'password'
    );
    expect(closeModal).toHaveBeenCalled();
  });

  it('shows an error message when the email is not verified', async () => {
    const mockSignInWithEmailAndPassword =
      signInWithEmailAndPassword as jest.MockedFunction<
        typeof signInWithEmailAndPassword
      >;
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({
      ...mockResponseSignIn,
      user: { ...mockResponseSignIn.user, emailVerified: false },
    });

    render(<SignInModal />);
    const emailInput = screen.getByLabelText('Your email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByText('Please verify your email address')
    ).toBeInTheDocument();
  });

  it('shows an error message when signInWithEmailAndPassword throws an error', async () => {
    const mockSignInWithEmailAndPassword =
      signInWithEmailAndPassword as jest.MockedFunction<
        typeof signInWithEmailAndPassword
      >;
    mockSignInWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/invalid-credential',
    });

    render(<SignInModal />);
    const emailInput = screen.getByLabelText('Your email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      screen.getByText('Password or email is incorrect')
    ).toBeInTheDocument();
  });
});
