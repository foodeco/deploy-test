import Header from "@/Common/Layout/Header/header";
import Footer from "@/Common/Layout/Footer/footer";
import MainPage from "@/Components/Views/MainPage/MainPage";
import Join from "@/Common/Form/Signin/join";
import Login from "@/Common/Form/Login/login";
import CartPage from "@/Components/Views/CartPage/CartPage";
import MyPage from "@/Components/Views/MyPage/MyPage";
import PrivatePage from "./privateRoute";
import DetailPage from "@/Components/Views/DetailPage/DetailPage";
import UserInfo from "@/Components/Views/MyPage/UserInfo";
import SearchPage from "@/Components/Views/SearchPage/SearchPage";
import './route.scss';
import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      </>
  );
};

function RoutesPage() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:productNo" element={<DetailPage />} />
            <Route path="/search/:keyword" element={<SearchPage />} />
            <Route
              path="/cart"
              element={<PrivatePage component={<CartPage />} status={""} />}
            />
            <Route
              path="/mypage"
              element={<PrivatePage component={<MyPage />} status={""} />}
            />
            <Route
              path="/mypage/userinfo"
              element={<PrivatePage component={<UserInfo />} status={""} />}
            />
            {/* <Route path="/mypage" element={<MyPage/>}/> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default RoutesPage;
