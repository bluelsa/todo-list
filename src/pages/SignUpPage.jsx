import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'api/auth';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (username.length === 0) return;
      if (email.length === 0) return;
      if (password.length === 0) return;

      const { success, authToken } = await register({
        username,
        email,
        password,
      });
      if (success) {
        localStorage.setItem('authToken', authToken);
        Swal.fire({
          title: '註冊成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          position: 'top',
        });
        navigate('/login'); //註冊完成後navigate到login頁面重新登入，較符合邏輯
        return;
      }
      Swal.fire({
        title: '註冊失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        position: 'top',
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      <AuthButton onClick={handleClick}>
        註冊
      </AuthButton>
      <Link to="/login"> 
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
