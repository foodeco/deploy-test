import './MainPage.scss';
import Carousel from './Component/Carousel';
import Main from './Component/Main';
import Recommand from './Component/Recommand';

export default function MainPage() {
  return (
    <div className="wrapper">
      <Carousel />
      <Recommand />
      <Main />
    </div>
  );
}
