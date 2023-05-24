import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext'

const LoginPage = () => {
  const [ username, setUsername ] = useState(null)
  const [ password, setPassword ] = useState(null)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleClick = async () => {
    // if (username.length === 0) return;
    // if (password.length === 0) return;
    const success = await login({
      username,
      password,
    });
    if (success) {
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'top',
      });
      // navigate('/todo');
      return;
    }

    Swal.fire({
      title: '登入失敗',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      position: 'top',
    });
  };

  useEffect(() => {
    if(isAuthenticated) {
     navigate('/todo')
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>
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
          type="password"
          label={'密碼'}
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>
        登入
      </AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
