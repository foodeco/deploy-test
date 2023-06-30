import React from 'react';
import './TopHeader.scss'

type TopHeaderProps = {
  productName: string;
  productPrice: number;
}

const TopHeader: React.FC<TopHeaderProps> = ({ productName , productPrice}) => {
  return (
    <div className='TopHeader-container'>
      <ul className='TopHeader-container__text'>
        <li>[eBook] { productName }</li>
        <li>
          {productPrice}원 (종이책 정가 대비 30%할인) 쿠폰할인가
          <span>13,230원</span>
        </li>
      </ul>
    </div>
  );
};

export default TopHeader