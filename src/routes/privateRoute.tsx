import { Navigate } from 'react-router-dom';


function PrivatePage({component:Component, status:Status}) {
  
  const token = localStorage.getItem("token")

  let tokenCheck = false;
  let result = null;

  if(token){
    tokenCheck  = true;
  }

  if(tokenCheck){
    result = Component;
  } else {
    !Status ? result = <Navigate to='/login'{...alert("접근할수 없는 페이지 입니다")}/> : result = Status;
  }
  return result;
}
export default PrivatePage