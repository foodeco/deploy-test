import { useEffect } from 'react';

interface PaymentInfo {
  amount: number;
  productlists: any;
  setdatalist: any;
}

interface BuyItem {
  id: number;
  product_name: string;
  price: string;
  detail_image: string;
  product_no: string;
  selectedItem?: any;
  setdatalist: any;
}

const { VITE_IMP_OWNER } = import.meta.env;

const Payment = ({ amount, productlists, setdatalist }: PaymentInfo) => {
  const orderNumber = `mid_${new Date().getTime()}`;
  console.log(orderNumber);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  const onClickPayment = () => {
    console.log(productlists);

    const itemName = productlists
      .map((obj: { product_name: any }) => obj.product_name)
      .join(',');

    console.log(itemName);
    const IMP = (window as any).IMP;
    IMP.init(VITE_IMP_OWNER);

    const data = {
      pg: 'html5_inicis', // PG사 html5_inicis: KG이니시스, kakaopay: 카카오페이, naverpay: 네이버페이, payco: 페이코
      pay_method: 'card', // 결제수단
      merchant_uid: orderNumber,
      amount: amount, // 결제금액
      name: `${itemName}`, // 주문명
      buyer_name: '', // 구매자 이름
      buyer_email: '',

      custom_data: productlists,
    };
    IMP.request_pay(data, callback);
  };

  function callback(response: any) {
    const { success, error_msg } = response;

    if (success) {
      alert('결제 성공');
      const mypayarray: string | null =
        window.localStorage.getItem('mypayment');
      const combinedArray: string[] | null = mypayarray
        ? JSON.parse(mypayarray)
        : null;
      if (!combinedArray) {
        window.localStorage.setItem('mypayment', JSON.stringify([orderNumber]));
      } else {
        combinedArray.push(orderNumber);
        window.localStorage.setItem('mypayment', JSON.stringify(combinedArray));
      }

      const productItemlist = productlists
        .map((obj: { product_no: any }) => obj.product_no)
        .join(',');
      const cartlist: BuyItem[] = JSON.parse(
        window.localStorage.getItem('cart') || '[]'
      );

      const updatedArray = cartlist.filter(
        (item) => !productItemlist.includes(item.product_no)
      );
      window.localStorage.setItem('cart', JSON.stringify(updatedArray));
      setdatalist(updatedArray);
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment;
