import React from 'react';
import { LoginModal } from './LoginModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: (userEmail: string) => void;
  onNavigateSignup?: () => void;
}

/**
 * AuthModal adapts to the new LoginModal implementation.
 * Signup has been elevated to a dedicated standalone page (/signup).
 */
export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onNavigateSignup = () => {},
}) => {
  return (
    <LoginModal
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={(user) => {
        if (onSuccess) onSuccess(user.email);
      }}
      onNavigateSignup={onNavigateSignup}
    />
  );
};

export default AuthModal;
