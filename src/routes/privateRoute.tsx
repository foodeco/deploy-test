import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  component: ReactNode;
  status: '';
}

function PrivatePage({ component: Component, status: Status }: Props) {
  const token = localStorage.getItem('token');

  let tokenCheck = false;
  let result: any;

  if (token) {
    tokenCheck = true;
  }

  if (tokenCheck) {
    result = Component;
  } else {
    !Status
      ? (result = (
          <Navigate
            to="/login"
            {...{ state: alert('접근할수 없는 페이지 입니다') }}
          />
        ))
      : (result = Status);
  }
  return result;
}
export default PrivatePage;
