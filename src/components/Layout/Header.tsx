import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../../redux/loginSlice';
import { RootState } from '../../redux/store';

const Header = () => {
  const navigate = useNavigate();

  // Redux 상태에서 login 상태 가져오기
  const loginState = useSelector((state: RootState) => state.auth.login);
  const dispatch = useDispatch();

  // 로그인 상태를 토글하는 함수
  const handleLogin = (value: boolean) => {
    if (value) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  };

  // 로그인 토큰 받아오기
  const getLoginToken = async () => {
    try {
      const response = await axios.get(
        'https://api.safehomes.co.kr/realtors/api/token'
      );

      if (response.status === 200 && response.data.message === 'success') {
        const token = response.data.cookie;

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('authToken', token);
        handleLogin(true);
      }
    } catch (error) {
      console.error('Error fetching the token:', error);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 삭제
    handleLogin(false);
  };

  // 페이지가 로드될 때 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // 토큰이 있으면 로그인 상태로 설정
      handleLogin(true);
    }
  }, []);

  const clickLogo = () => {
    navigate('/');
  };

  return (
    <>
      <div className='h-[100px] flex items-center bg-[#fff] border-b border-[#ededed]'>
        <div
          className='text-[40px] w-[164px] h-[50px] flex items-center justify-center ml-[40px] font-black text-[#347fff] cursor-pointer select-none'
          onClick={clickLogo}
        >
          JobNest
        </div>
        <div className='flex items-center ml-auto'>
          <ul className='flex gap-[38px]'>
            <li className='font-medium text-[18px] select-none'>매물 관리</li>
            <li className='font-medium text-[18px] select-none'>
              <Link to='/contractManagement'>계약 관리</Link>
            </li>
            <li
              className='font-medium text-[18px] cursor-pointer select-none'
              onClick={() => navigate('/registrationIssuance')}
            >
              등기/대장 발급
            </li>
          </ul>
          {loginState ? (
            <>
              <span className='text-[#8894A0] ml-[88px] select-none'>
                박지우님 환영합니다!
              </span>
              <button
                className='bg-[#347fff] w-[130px] h-[42px] ml-[50px] font-medium mr-[41px] text-white select-none'
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className='bg-[#347fff] w-[130px] h-[42px] ml-[50px] font-medium mr-[41px] text-white select-none'
              onClick={getLoginToken}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
