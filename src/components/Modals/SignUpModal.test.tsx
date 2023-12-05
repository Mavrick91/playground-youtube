import React from 'react';
import { render, screen, fireEvent } from '~/test-utils';
import { act } from 'react-dom/test-utils';
import SignUpModal from './SignUpModal';
import * as ModalModule from '../../providers/ModalProvider';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
}));

const mockResponseCreateUser: UserCredential = {
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

describe('SignUpModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SignUpModal />);
    expect(screen.getByText('Create and account')).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(<SignUpModal />);
    const submitButton = screen.getByText('Create an account');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(
      screen.getByText('password must be at least 8 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Password confirmation is required')
    ).toBeInTheDocument();
  });

  it('opens the sign in modal when the login here button is clicked', async () => {
    const openModal = jest.fn();
    const modalState = {
      isOpen: false,
      modalType: () => null as unknown as JSX.Element,
    };
    const closeModal = jest.fn();
    jest
      .spyOn(ModalModule, 'useModal')
      .mockReturnValue({ openModal, modalState, closeModal });

    render(<SignUpModal />);
    const loginButton = screen.getByText('Login here');

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(openModal).toHaveBeenCalledWith('signin');
  });

  it('calls createUserWithEmailAndPassword with the correct values', async () => {
    const mockCreateUserWithEmailAndPassword =
      createUserWithEmailAndPassword as jest.MockedFunction<
        typeof createUserWithEmailAndPassword
      >;
    mockCreateUserWithEmailAndPassword.mockResolvedValueOnce(
      mockResponseCreateUser
    );

    render(<SignUpModal />);
    const emailInput = screen.getByPlaceholderText('john.doe@gmail.com');
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0];
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      'test@test.com',
      'password'
    );
  });

  it('calls sendEmailVerification when a user is returned', async () => {
    const mockCreateUserWithEmailAndPassword =
      createUserWithEmailAndPassword as jest.MockedFunction<
        typeof createUserWithEmailAndPassword
      >;
    const mockSendEmailVerification =
      sendEmailVerification as jest.MockedFunction<
        typeof sendEmailVerification
      >;
    mockCreateUserWithEmailAndPassword.mockResolvedValueOnce(
      mockResponseCreateUser
    );

    render(<SignUpModal />);
    const emailInput = screen.getByPlaceholderText('john.doe@gmail.com');
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0];
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockSendEmailVerification).toHaveBeenCalledWith(
      mockResponseCreateUser.user
    );

    expect(screen.getByText('Verification email sent')).toBeInTheDocument();
  });

  it('sets the correct error message when an error is thrown', async () => {
    const mockCreateUserWithEmailAndPassword =
      createUserWithEmailAndPassword as jest.MockedFunction<
        typeof createUserWithEmailAndPassword
      >;
    mockCreateUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/invalid-email',
    });

    render(<SignUpModal />);
    const emailInput = screen.getByPlaceholderText('john.doe@gmail.com');
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0];
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Invalid email')).toBeInTheDocument();

    mockCreateUserWithEmailAndPassword.mockRejectedValueOnce({
      code: 'auth/email-already-in-use',
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email already in use')).toBeInTheDocument();
  });
});
