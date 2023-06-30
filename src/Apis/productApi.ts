import axios from 'axios';

const { VITE_CLIENT_ID } = import.meta.env;

const ajax = axios.create({
  baseURL: '/cafe24',
  headers: {
    'Content-Type': 'application/json',
    'X-Cafe24-Api-Version': '2023-03-01',
    'X-Cafe24-Client-Id': VITE_CLIENT_ID,
  },
});

interface GetList {
  category?: number;
  product_no?: string;
  limit?: number;
}
export async function getList(info: GetList) {
  try {
    const { data } = await ajax.get('/products', {
      params: {
        display: 'T',
        selling: 'T',
        category: info.category,
        product_no: info.product_no,
        limit: info.limit
      },
    });
    //console.log(data.products);
    return data.products;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecommand() {
  try {
    const res = await ajax.get('/mains/2/products');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getDetail(product_no: string) {
  try {
    const res = await ajax.get(`/products/${product_no}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const GetImpToken = async () => {
  try {
    const response = await axios.post(
      '/iamport/users/getToken',
      {
        imp_key: '5758023681388354',
        imp_secret: 'tCdwGmiflqhMA3It54n6aLBIeA7LCg0O3WYu5qI1SKpwQ85FKXtJsiHu8yUWTynhDx7fxCFY1wsA3KVc',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};