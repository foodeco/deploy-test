import axios from "axios";

export const ajax = axios({
  url: "/users/getToken",
  // POST method
  method: "post",
  // "Content-Type": "application/json"
  headers: { "Content-Type": "application/json" },
  data: {
    // REST API키
    imp_key: "5758023681388354",
    // REST API Secret
    imp_secret:
      "tCdwGmiflqhMA3It54n6aLBIeA7LCg0O3WYu5qI1SKpwQ85FKXtJsiHu8yUWTynhDx7fxCFY1wsA3KVc",
  },
});
