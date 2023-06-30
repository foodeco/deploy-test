import { useState, useEffect } from "react";
import axios,{ AxiosResponse }  from "axios";
import Category from "./common/components/Category";
import { GetImpToken } from "@/Apis/productApi";
import "./MyPage.scss";

interface PaymentItem {
  merchant_uid: string;
  custom_data:string;
  paid_at: string;

}

interface PaymentsResponse {
  response: {
    list: PaymentItem[];
  };
}

interface CategoryMap {
  readonly [key: string]: string;
}

interface PageData {
  gubun: string;
  merchant_uid: string;
  small_image: string;
  product_name: string;
  price: number;
  custom_data:string;
  paid_at: string;
}

function MyPage() {

  const TopCategory: CategoryMap = {
    orderId:'주문번호',
    orderDate:'주문날짜',
    productname:'상품이름',
    price:'상품가격',
    cancel:'구매취소'
  } as const;

const [itemList, setItemList] = useState<PaymentItem[]>([]);
const [mydataList, setMydataList] = useState<PageData[]>([]);

const GetToken = async  () => {
  try{
    const tokenData = await GetImpToken();
  const accessToken = tokenData.data.response.access_token;
  return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }    
}


const fetchData = async (): Promise<void> => {
  try {
    const paynumber: string | null = window.localStorage.getItem('mypayment');

    if (paynumber) {
      const merchantUids = JSON.parse(paynumber);
      const accessToken = await GetToken();
      const paymentsResponse: AxiosResponse<PaymentsResponse> = await axios.get(
        `/iamport/payments/status/paid?limit=20&sorting=paid&_token=${accessToken}`
      );

      if (paymentsResponse.data && paymentsResponse.data.response && paymentsResponse.data.response.list) {
        const filteredList: PaymentItem[] = paymentsResponse.data.response.list.filter((item) =>
          merchantUids.includes(item.merchant_uid)
        );
        if(filteredList){
          setItemList(filteredList);
        }else{
          setItemList([]);
        }
      } else {
        console.log('Invalid response format');
        setItemList([]);
      }
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  setMydataList([]);
  if (itemList.length === 0) {
    return;
  }
  const useData = itemList.filter((item) => item.custom_data);
  useData.forEach((item) => {
    if (item.custom_data) {
      let parsedData: PageData[] = JSON.parse(item.custom_data);
      parsedData = parsedData.map((data) => ({
        ...data,
        paid_at: item.paid_at,
        merchant_uid: item.merchant_uid,
        // Add more properties as needed
      }));
       setMydataList((prevDataList) => [...prevDataList, ...parsedData]);
    }
  });
}, [itemList]);


const DeleteList = (itemnum: string) => {
  const MyPay = localStorage.getItem("mypayment");
  
  if (MyPay && MyPay.includes(itemnum)) {
    const updatedList = MyPay.replace(itemnum, "").trim();
    localStorage.setItem("mypayment", updatedList);
  }
  fetchData();
}

const onClickDelete = async (key:string) => {

  if(confirm("주문을 취소 하시겠습니까?")){
  const accessToken = await GetToken();
  const data = {
    merchant_uid : key
  }
  await axios.post(
    `/iamport/payments/cancel?_token=${accessToken}`, data)
    .then((res) => {
      if(res.status == 200){
        alert("주문이 취소 되었습니다");
        DeleteList(key);
      } else {
        console.log(res.status)
      }
    });
  } else {
    alert("취소되었습니다.")
  }
};


const getDate = function(param:any){
  const date = new Date(param * 1000);
  const koreaTime = date.toLocaleString("ko-KR", { 
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  return koreaTime;
}

  return (
    <>
      <div className="MyPage-AllLayout">
        <div className="MyPage-AllLayout__center">
          <div className="LeftContainer">
            <Category/>
          </div>

          <div className="RightContainer">
            <div className="orderText">구매 내역</div>
            <div className="orderContainer">
              <div className="TopCategory">
                  {Object.keys(TopCategory).map(key => {
                    return <span className="TopCategory-inner" key={key}>
                      {TopCategory[key]}
                    </span>
                  })}
              </div>
              <div className="orderBox">
                {mydataList
                .filter((el: PageData)  => el.gubun === 'buy') 
                .map((item: PageData, index: number) => (
                 
                  <div className="orderList" key={index}>
                    <span>{item.merchant_uid.replace("mid_","")}</span>
                      <span>{getDate(item.paid_at)}</span>
                          <div className="orderList-ImageBox">
                            <img src={item.small_image} alt="책이미지"/>
                            <span className="orderList-ImageBox__text">{item.product_name}</span>
                          </div>
                      <span className="orderList-priceBox">{item.price}</span> 
                      <div className="Buy-ButtonBox">
                        <button onClick={() => onClickDelete(item.merchant_uid)}>x</button>
                      </div>
                  </div>
                
                ))}
              </div>
            </div>

            <div className="RentContainer-text">대여내역</div>
              <div className="RentContainer">
                <div className="RentTop-Category">
                  {Object.keys(TopCategory).map(key => {
                    return <span className="RentCategory-inner" key={key}>
                      {TopCategory[key]}
                    </span>
                  })}
                </div>
                <div className="RentBox">
                {mydataList
                .filter((el: PageData) => el.gubun === 'rent') 
                .map((item: PageData, index: number)  => (
                 
                  <div className="RentList" key={index}>
                    <span>{item.merchant_uid.replace("mid_","")}</span>
                      <span>{getDate(item.paid_at)}</span>
                          <div className="RentList-ImageBox">
                            <img src={item.small_image} alt="책이미지"/>
                            <span className="RentList-ImageBox__text">{item.product_name}</span>
                          </div>
                      <span className="RentList-priceBox">{item.price}</span> 
                      <div className="Rent-ButtonBox">
                        <button onClick={() => onClickDelete(item.merchant_uid)}>x</button>
                      </div>
                  </div>
                
                ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
