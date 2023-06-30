import "./CartPage.scss";
import { useState, useEffect } from "react";
import CartItems from "./CartItems/CartItems";
import RentalItems from "./CartRent/CartRent";
import Payment from "./Payment/Payment";

interface BuyItem {
  id: number;
  product_name: string;
  price:string;
  detail_image: string;
  product_no: number;
}

function CartPage() {
  const [CartItemsValue, setCartItemsValue] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<BuyItem[]>([]);
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [buyItem, setbuyItem] = useState<BuyItem[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const buyItems = cartData ? JSON.parse(cartData) : [];
    setbuyItem(buyItems);
  }, []);
  
  useEffect(() => {
    calculateTotal();
  }, [selectedItem]);

  const checkOne = (event: React.ChangeEvent<HTMLInputElement>, buyItem: any[], gubun: string) => {
    const checkedValue = event.target.checked;
    const filteredItems = buyItem.filter((item) => item.gubun === gubun);

    if(checkedValue) {
      const combinedItems = new Set([...selectedItem, ...filteredItems]);
      setSelectedItem(Array.from(combinedItems));
    } else {
      const remainingItems = selectedItem.filter(item => !filteredItems.some(filteredItem => filteredItem.product_no === item.product_no));
      setSelectedItem(remainingItems);
    }
    // Reset filteredItems indices if unchecked
    const updatedCheckedItems = checkedValue ? filteredItems.map((_, index) => index) : [];
    
    return updatedCheckedItems;
  };

  const checkTwo = (event: React.ChangeEvent<HTMLInputElement>, checkedItems:number[], el:any) => {
    const itemId = parseInt(event.target.name);
      let updatedCheckedItems: number[] = [];
      let updatedItems: any[] = [];
      if (event.target.checked) {
        updatedCheckedItems = [...checkedItems, itemId];
        updatedItems = [...selectedItem, el];
      } else {
        updatedCheckedItems = checkedItems.filter((id) => id !== itemId);
        updatedItems = selectedItem.filter((item) => item.product_no !== el.product_no);
      }
      setSelectedItem(updatedItems);
      return updatedCheckedItems;
  };

  const calculateTotal = () => {
    setTotal(0);
    console.log(selectedItem);
    let total = 0;
    if (Array.isArray(selectedItem)) {
      selectedItem.forEach((item) => {
        const itemPrice = parseFloat(item.price);
        if (!isNaN(itemPrice)) {
          total += itemPrice;
        }
      });
    }else{
      total = 0;
    }
    setTotal(total);
    setShowTotal(true);
  };

  const RemoveBuyItem = (key: any) => {
    console.log(key);
    const confirmation = window.confirm("삭제하시겠습니까?");
    if (confirmation) {
      const cartDataString = localStorage.getItem("cart");

      if (cartDataString !== null) {
        const updatedCartData: BuyItem[] = JSON.parse(cartDataString);
        const datalist = JSON.stringify( updatedCartData.filter((item) => item.product_no !== key))
        localStorage.setItem("cart",datalist);
        setbuyItem(JSON.parse(datalist));
        alert("삭제되었습니다.");
      } else {
        console.log("cart data not found");
      }
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <>
      <div className="CartPage-AllLayout">
          <span className="ProductText">구매</span>
          <div className="CartContainer">
            <CartItems
              check={CartItemsValue}
              //setItems={setSelectedItem}
              delete={RemoveBuyItem}
              datalist={buyItem}
              //setdata={setbuyItem}
              checkOne={checkOne}
              checkTwo={checkTwo}
            />
          </div>
          <span className="RentText">대여 </span>
          <div className="RentContainer">
            <RentalItems
              check={CartItemsValue}
              //setItems={setSelectedItem}
              delete={RemoveBuyItem}
              datalist={buyItem}
              //setdata={setbuyItem}
              checkOne={checkOne}
              checkTwo={checkTwo}
            />
          </div>

          <span className="BuyText">결제</span>
          <div className="BuyContainer">
            <div className="NowBuy">
              <div className="Buy-Container">
                <div className="Pay-Container">
                  <span>총 상품 가격 </span>
                  {ShowTotal && <h3>${Total}원</h3>}
                </div>
              </div>

              <div className="AllCount-Container">
                <div className="AllCount-Container__box">
                  <span>총 결제 예상 금액</span>
                  <span>${Total}</span>
                </div>
              </div>

              <div className="Buy-ButtonBox">
                <Payment amount={Total} productlists={selectedItem} setdatalist={setbuyItem}/>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default CartPage;