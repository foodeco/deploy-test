import './Category.scss'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { TokenMe } from "@/Apis/register";

interface User {
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

const Category = () => {

// 기본 프로필 이미지 URL
const defaultProfileImgUrl = "/public/images/default-profile.jpg";
const [user, setUser] = useState<User>({ displayName: "", profileImg: defaultProfileImgUrl });

useEffect(() => {
  const authenticate = async () => {
    try {
      const userData = await TokenMe(); 

      // 사용자 정보를 업데이트하기 전에 profileImg가 존재하지 않을 경우에만 기본 프로필 이미지 URL을 사용
      setUser((prevUser) => ({
        ...prevUser,
        displayName: userData.displayName,
        profileImg: userData.profileImg || defaultProfileImgUrl,
      }));
    } catch (error) {
      console.error(error);
      // 오류 처리
    }
  };

  authenticate();
}, []);

  useEffect(() => {
    if (location.pathname === "/mypage") {
      document.querySelector(".LeftContainer-category__order")?.classList.add("active");
      document.querySelector(".LeftContainer-category__infoTap")?.classList.remove("active");
    } else if (location.pathname === "/mypage/userinfo") {
      document.querySelector(".LeftContainer-category__order")?.classList.remove("active");
      document.querySelector(".LeftContainer-category__infoTap")?.classList.add("active");
    } 
  }, [location]);

  return (
    <>
      <div className="LeftContainer-profile">
        <img 
          className="LeftContainer-profile__Photo"
          src={user.profileImg} 
          alt="프로필사진" 
        />
        <div className="LeftContainer-profile__box">
          <div className="LeftContainer-profile__text">
            <p>{user?.displayName}</p>
          </div>
        </div>
      </div>
      <div className="LeftContainer-category">
      <Link to="/mypage"> 
        <div className={`LeftContainer-category__order${location.pathname === "/mypage" ? " active" : ""}`}>
              주문내역조회
        </div>
      </Link>
      <Link to="/mypage/userinfo">

      <div className={`LeftContainer-category__infoTap${location.pathname === "/mypage/userinfo" ? " active" : ""}`}>
        회원정보 수정
      </div>
      </Link>
    </div>
    </>
  );
};

export default Category;