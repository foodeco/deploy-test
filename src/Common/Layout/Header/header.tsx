import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import './headers.scss';
import { LogoutForm, TokenMe } from '@/Apis/register';
import { getList } from '@/Apis/productApi';

interface User {
  displayName: string; // 사용자 표시 이름
  profileImg: string; // 사용자 프로필 이미지 URL
}

interface Product {
  product_no: number;
  product_name: string;
  small_image: string;
  price: string;
}

function Header() {
  const defaultProfileImgUrl = '/public/images/default-profile.jpg';
  const [user, setUser] = useState<User>({ displayName: '', profileImg: '' });
  const [keyword, setKeyWord] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [product, setProductInfo] = useState([]);
  const [showInputButton, setShowInputButton] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
    setShowInputButton(e.target.value.trim() !== '');
  };

  const handleInputButtonClick = () => {
    if (keyword === '') {
      alert('검색어를 입력해주세요');
    } else {
      onSubmit();
    }
  };

  const logoutHandler = () => {
    LogoutForm()
      .then(() => {
        localStorage.removeItem('token');
        alert('로그아웃 되셨습니다');
        navigate('/');
      })
      .catch((error: string) => {
        console.log('Logout failed:', error);
      });
  };

  const onSubmit = async () => {
    navigate('/search/' + keyword);
  };

  const token = localStorage.getItem('token');

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
      }
    };
    if (token) {
      authenticate();
    }
  }, [token]);

  const OnKeyPress = (e: any) => {
    if (keyword === '') {
      alert('검색어를 입력해주세요');
    } else if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const filterItems = (searchTerm: string) => {
    const filtered = product.filter((item: Product) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  useEffect(() => {
    filterItems(keyword);
  }, [keyword, product]);

  async function getItem() {
    const cate = {
      limit: 100,
    };
    const data = await getList(cate);
    console.log(data);
    setProductInfo(data);
  }

  useEffect(() => {
    (async () => {
      await getItem();
    })();
  }, []);

  return (
    <>
      <header className="headerContainer">
        <div className="itemsWrapper">
          <Link to="/" className="logoBox">
            <img src="/images/Wink_logo.png" alt="logo" />
          </Link>
          <div className="searchBox">
            <input
              type="text"
              placeholder="검색"
              onChange={handleInputChange}
              onKeyPress={OnKeyPress}
            />
            <img
              src="/images/search-icon.png"
              alt="searchicon"
              onClick={handleInputButtonClick}
            />

            {showInputButton && keyword && (
              <div className="Input-Buttom">
                <div className="Input-Buttom__inner">
                  {keyword &&
                    filteredItems.map((v: Product) => {
                      if (v.product_name.trim() !== '') {
                        return (
                          <Link
                            to={`/detail/${v.product_no}`}
                            key={v.product_no}
                            className="Input-Buttom__innerBox"
                          >
                            <div className="Input-Buttom__ImageBox">
                              <img src={v.small_image} alt="searchbookimage" />
                            </div>

                            <div className="Input-Buttom__title">
                              <span>{v.product_name}</span>
                              <span>{v.price.slice(0, -3)}원</span>
                            </div>
                          </Link>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
            )}
          </div>

          <div className="Header-box">
            <Link className="Header-box__text" to="/cart">
              장바구니
            </Link>
            <Link className="Header-box__text" to="/mypage">
              마이페이지
            </Link>
            {token ? (
              <div className="Header-box__text">
                <div className="Header-box__logout" onClick={logoutHandler}>
                  로그아웃
                </div>
                <div className="cart">
                  <img className="cartPhoto" src={user.profileImg} />
                </div>
              </div>
            ) : (
              <>
                <Link className="Header-box__text" to="/join">
                  <p>회원가입</p>
                </Link>
                <Link className="Header-box__text" to="/login">
                  <p>로그인</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
