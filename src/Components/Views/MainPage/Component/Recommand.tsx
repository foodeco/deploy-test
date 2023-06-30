import { useEffect, useState } from "react";
import { getRecommand, getList } from "@/Apis/productApi";
import "./Recommand.scss";
import { Link } from "react-router-dom";

type RecommandProducts = RecommandProduct[];

interface RecommandProduct {
  shop_no: number;
  product_no: number;
  product_name: string;
  summary_description: string;
  list_image: string;
  model_name: string;
}

export default function Recommand() {
  const [list, setList] = useState<RecommandProducts>();

  async function recommand() {
    try {
      const res = await getRecommand();
      console.log(res.products);
      setList(res.products);
      const productList = res.products.map((obj:any) => obj.product_no).join(",");
      return productList;
    } catch (err) {
      console.log(err);
    }
  }

  async function getItem() {
    const productList = await recommand();
    console.log(productList);
    const data = await getList({ product_no: productList });
    setList(data);
  }

  useEffect(() => {
    (async () => {
      await getItem();
    })();
  }, []);

  return (
    <div className="Recommand">
      <h1>추천도서</h1>
      <div className="Recommand-wrapper">
        {list &&
          list.map((item) => (
            <Link
              to={`/detail/${item.product_no}`}
              key={item.product_no}
              className="test"
            >
              <img src={item.list_image} />
              <h3>{item.product_name}</h3>
              <span>{item.model_name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
