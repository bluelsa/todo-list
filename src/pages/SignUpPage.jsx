import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    const success = await register({
      username,
      email,
      password,
    });
    if (success) {
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'top',
      });
      return;
    }
    Swal.fire({
      title: '註冊失敗',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      position: 'top',
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label={'帳號'}
          value={username}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'Email'}
          value={email}
          placeholder={'請輸入 email'}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
