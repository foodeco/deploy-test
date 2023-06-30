import { Navigate } from 'react-router-dom';

interface Props {
  component: any;
  status: '';
}

function PrivatePage({ component: Component, status: Status }: Props) {
  const token = localStorage.getItem('token');

  let tokenCheck = false;
  let result = null;

  if (token) {
    tokenCheck = true;
  }

  if (tokenCheck) {
    result = Component;
  } else {
    if (!Status) {
      alert('접근할수 없는 페이지 입니다');
      result = <Navigate to="/login" />;
    } else {
      result = Status;
    }
  }
  return result;
}
export default PrivatePage;
