declare type CategoryProducts = CategoryProductsInfo[];
declare type Products = Product[];

declare type PointsAmout = {
  payment_method?: string;
  points_rate?: string;
};

declare type PointAmount = {
  payment_method: string;
  type: string;
  value: string;
  rate: string;
};
declare type ExpriationDate = {
  start_date: string;
  end_date: string;
};
declare type PromotionPeriod = {
  start_date: string;
  end_date: string;
  dc_price: string;
};
declare type ListIcon = {
  soldout_icon: boolean;
  recommend_icon: boolean;
  new_icon: boolean;
};

declare type Product = {
  /** 멀티쇼핑몰 번호
   * 멀티쇼핑몰 구분을 위해 사용하는 멀티쇼핑몰 번호.
   */
  shop_no: number;
  /** 상품번호

상품의 고유한 일련 번호. 해당 쇼핑몰 내에서 상품 번호는 중복되지 않음. */
  product_no: number;
  /** 형식 : [A-Z0-9]
글자수 최소: [8자]~최대: [8자]

상품코드

시스템이 상품에 부여한 코드. 해당 쇼핑몰 내에서 상품코드는 중복되지 않음.
  */
  product_code: string;
  /** 최대글자수 : [40자]

자체상품 코드

사용자가 상품에 부여 가능한 코드. 재고 관리등의 이유로 자체적으로 상품을 관리 하고 있는 경우 사용함. */
  custom_product_code: string;
  /** 최대글자수 : [250자]

상품명

상품의 이름. 상품명은 상품을 구분하는 가장 기초적인 정보이며 검색 정보가 된다. HTML을 사용하여 입력이 가능하다. */
  product_name: string;
  /** 최대글자수 : [250자]

영문 상품명

상품의 영문 이름. 해외 배송 등에 사용 가능함. */
  eng_product_name: string;
  /** 최대글자수 : [100자]

모델명

상품의 모델명. */
  model_name: string;
  /** 상품가(세금 제외) */
  price_excluding_tax: string;
  /** 상품 판매가

상품의 판매 가격. 쿠폰 및 혜택을 적용하기 전의 가격.
상품 등록시엔 모든 멀티 쇼핑몰에 동일한 가격으로 등록하며, 멀티쇼핑몰별로 다른 가격을 입력하고자 할 경우 상품 수정을 통해 가격을 다르게 입력할 수 있다.
※ 판매가 = [ 공급가 + (공급가 * 마진율) + 추가금액 ] */
  price: string;
  /** 상품 소비자가

시중에 판매되는 소비자 가격. 쇼핑몰의 가격을 강조하기 위한 비교 목적으로 사용함. */
  retail_price: string;
  /** 진열상태

상품을 쇼핑몰에 진열할지 여부. 상품을 쇼핑몰에 진열할 경우 설정한 상품분류와 메인화면에 표시된다. 상품이 쇼핑몰에 진열되어 있지 않으면 쇼핑몰 화면에 표시되지 않아 접근할 수 없으며 상품을 구매할 수 없다.

T : 진열함
F : 진열안함 */
  display: string;
  /** 판매상태

상품을 쇼핑몰에 판매할지 여부. 상품을 진열한 상태로 판매를 중지할 경우 상품은 쇼핑몰에 표시되지만 "품절"로 표시되어 상품을 구매할 수 없다. 상품이 "진열안함"일 경우 "판매함" 상태여도 상품에 접근할 수 없기 때문에 구매할 수 없다.

T : 판매함
F : 판매안함 */
  selling: string;
  /** 최대값: [2147483647]

중고상품 사용 개월 */
  product_used_month: number;
  /** 최대글자수 : [255자]

상품요약설명

상품에 대한 요약 정보. 상품 진열 화면에서 노출 가능한 설명. HTML을 사용하여 입력이 가능하다.
[쇼핑몰 설정 > 상품 설정 > '상품 보기 설정 > 상품 정보 표시 설정']에서 노출되도록 설정 가능하다. */
  summary_description: string;
  /** 상품 검색어

검색 또는 분류를 위하여 상품에 입력하는 검색어 정보(해시태그) */
  product_tag: string;
  /** 세금 계산 유형

A : 자동 계산
M : 수동 계산 */
  tax_calculation: string;
  /** 최대글자수 : [20자]

판매가 대체문구

상품의 가격 대신 표시되는 문구. 품절이나 상품이 일시적으로 판매 불가할 때 사용. */
  price_content: string | null;
  /** 구매제한 개별 설정여부

T : 사용함
F : 사용안함 */
  buy_limit_by_product: string;
  /** 구매제한

해당 상품을 구매할 수 있는 회원 정보 표시.

N : 회원만 구매하며
구매버튼 감추기
M : 회원만 구매하며
구매버튼 보이기
F : 구매제한 안함
O : 지정된 회원만 구매하며 구매버튼 감추기
D : 지정된 회원만 구매하며 구매버튼 보이기 */
  buy_limit_type: string;
  /** 구매가능 회원 등급 */
  buy_group_list: number[];
  /** 구매가능 회원아이디 */
  buy_member_id_list: string[];
  /** 재구매 제한

T : 재구매 불가
F : 제한안함 */
  repurchase_restriction: string;
  /** 단독구매 제한

T : 단독구매 불가
F : 제한안함 */
  single_purchase_restriction: string;
  /** 구매단위 타입

해당 상품의 구매 단위를 1개 이상으로 설정한 경우 해당 구매 단위를 품목 단위로 할 것인지, 상품 단위로 할 것인지에 대한 설정

P : 상품 기준
O : 품목 기준 */
  buy_unit_type: string;
  /** 구매단위

구매할 수 있는 최소한의 단위 표시.
예) 구매 주문단위가 세 개일 경우, 3개, 6개, 9개 단위로 구매 가능함. */
  buy_unit: number;
  /** 주문수량 제한 기준

해당 상품의 주문 수량 제한시 제한 기준을 품목 단위로 할 것인지, 상품 단위로 할 것인지에 대한 설정

P : 상품 기준
O : 품목 기준 */
  order_quantity_limit_type: string;
  /** 최대값: [2147483647]

최소 주문수량

주문 가능한 최소한의 주문 수량. 주문 수량 미만으로 구매 할 수 없음. */
  minimum_quantity: number;
  /** 최대값: [2147483647]

최대 주문수량

주문 가능한 최대한의 주문 수량. 주문 수량을 초과하여 구매 할 수 없음.

최대 주문수량이 "제한없음"일 경우 "0"으로 표시된다. */
  maximum_quantity: number;
  /** 적립금 개별설정 사용여부

F : 기본설정 사용
T : 개별설정 */
  points_by_product: string;
  /** 결제방식별 적립금 설정 여부

B : 기본 적립금설정 사용
C : 결제방식에 따른 적립 */
  points_setting_by_payment: string;
  /** 적립금 설정 정보 */
  points_amount: PointsAmout[];
  /** 성인인증

성인인증이 필요한 상품인지 여부. 성인인증이 필요한 상품인 구매를 위해서는 본인인증을 거쳐야함.

T : 사용함
F : 사용안함 */
  adult_certification: string;
  /** 상세이미지

상품 상세 화면에 표시되는 상품 이미지. */
  detail_image: string;
  /** 목록이미지

상품 분류 화면, 메인 화면, 상품 검색 화면에 표시되는 상품의 목록 이미지. */
  list_image: string;
  /** 작은목록이미지

최근 본 상품 영역에 표시되는 상품의 목록 이미지. */
  tiny_image: string;
  /** 축소이미지

상품 상세 화면 하단에 표시되는 상품 목록 이미지. */
  small_image: string;
  /** 네이버페이 사용여부

T : 사용함
F : 사용안함 */
  use_naverpay: string | null;
  /** 네이버페이 판매타입

C : 네이버페이 + 쇼핑몰 동시판매 상품
O : 네이버페이 전용상품 */
  naverpay_type: string | null;
  /** 형식 : [A-Z0-9]
글자수 최소: [8자]~최대: [8자]

제조사 코드

제조사를 등록하면 자동으로 생성되는 코드로 상품에 특정 제조사를 지정할 때 사용.

미입력시 자체제작(M0000000) 사용 */
  manufacturer_code: string;
  /** 형식 : [A-Z0-9]
글자수 최소: [8자]~최대: [8자]

트렌드 코드

트렌드를 등록하면 자동으로 생성되는 코드로 상품에 특정 트렌드를 지정할 때 사용.

미입력시 기본트렌드(T0000000) 사용 */
  trend_code: string;
  /** 형식 : [A-Z0-9]
글자수 최소: [8자]~최대: [8자]

브랜드 코드

브랜드를 등록하면 자동으로 생성되는 코드로 상품에 특정 브랜드를 지정할 때 사용.

미입력시 자체브랜드(B0000000) 사용 */
  brand_code: string;
  /** 제조일자

상품을 제조한 제조일자. */
  made_date: string;
  /** 배열 최대사이즈: [2]

유효기간

상품을 정상적으로 사용할 수 있는 기간. 상품권이나 티켓 같은 무형 상품, 식품이나 화장품 같은 유형 상품의 유효기간을 표시.

주로 상품권이나 티켓 같은 무형 상품에 사용되며, 해당 무형 상품의 유효기간을 표시. */
  expiration_date: ExpriationDate;
  /** 원산지 국내/국외/기타

F : 국내
T : 국외
E : 기타 */
  origin_classification: string;
  /** 원산지 번호

원산지 번호를 List all Origin API를 통해 원산지를 조회하여 입력
origin_classification이 F(국내)인 경우, 해외 여부(foreign)가 "F"인 원산지만 입력 가능함.
origin_classification이 T(해외)인 경우, 해외 여부(foreign)가 "T"인 원산지만 입력 가능함. */
  origin_place_no: number;
  /** 최대글자수 : [30자]

원산지기타정보

원산지가 "기타(1800)"일 경우 원산지로 입력 가능한 정보. */
  origin_place_value: string;
  /** 원산지 국가코드 */
  made_in_code: string;
  /** 아이콘 노출 기간

상품에 설정한 아이콘이 노출되는 기간. */
  icon_show_period: ExpriationDate;
  /** 배열 최대사이즈: [5]

아이콘

상품에 표시되는 아이콘. 상품 판매를 강조하기 위한 목적으로 사용이 가능함. */
  icon: string[];
  /** 상품소재

상품의 소재. 복합 소재일 경우 상품의 소재와 함유랑을 함께 입력해야함. (예 : 면 80%, 레이온 20%) */
  product_material: string;
  /** 추천 / 품절 / 신상품 아이콘 노출 여부

추천, 품절, 신상품 아이콘을 목록에서 표시하는지 여부

※ 품절 아이콘

● 상품이 품절 상태임을 알려주는 아이콘
● 재고관리 및 품절 기능을 사용하는 상품에 대해 재고가 없을 경우 표시

※ 추천, 신상품 아이콘

● 상품분류나 메인화면의 추천상품, 신상품 영역에 진열된 상품인 경우, 설정에 따라 해당 아이콘을 표시함

※ 아이콘 노출 여부 설정위치 : [쇼핑몰 설정 > 상품 설정 > '상품 정책 설정 > 상품 관련 설정 > 상품 아이콘 설정'] */
  list_icon: ListIcon;
  /** 승인요청 결과

N : 승인요청 (신규상품)
E : 승인요청 (상품수정)
C : 승인완료
R : 승인거절
I : 검수진행중
Empty Value : 요청된적 없음 */
  approve_status: string;
  /** 품절여부

T : 품절
F : 품절아님 */
  sold_out: string;
  /** 형식 : [A-Z0-9]
글자수 최소: [8자]~최대: [8자]

해외통관코드 */
  clearance_category_code: string;
  /** 표시제한 범위

A : 모두에게 표시
M : 회원에게만 표시 */
  exposure_limit_type: string;
  /** 표시대상 회원 등급 */
  exposure_group_list: number[];
  /** 세트상품 타입

C : 일반세트
S : 분리세트 */
  set_product_type: string | null;
  /** 카카오페이 사용여부

T : 사용함
F : 사용안함 */
  use_kakaopay: string | null;
  /** 배송비 타입

(개별배송비를 사용할 경우) 상품의 배송비 타입.
shipping_calculation이 A(자동계산)일 경우 null로 반환.

T : 배송비 무료
R : 고정배송비 사용
M : 구매 금액에 따른 부과
D : 구매 금액별 차등 배송료 사용
W : 상품 무게별 차등 배송료 사용
C : 상품 수량별 차등 배송료 사용
N : 상품 수량에 비례하여 배송료 부과 */
  shipping_fee_type: string;
  /** 메인진열

상품을 "추천상품", "신상품"과 같은 메인진열에 진열할 경우, 메인 진열 번호를 표시한다. */
  main: number[] | null;
  /** 메모 리소스

조회시 Embed 파라메터를 사용하여 조회할 수 있다. */
  memos: string;
  /** 상품 조회수 리소스

조회시 Embed 파라메터를 사용하여 조회할 수 있다. */
  hits: string;
  /** 상품 Seo 리소스

조회시 Embed 파라메터를 사용하여 조회할 수 있다. */
  seo: string;
  /** 분류 번호

해당 상품이 진열되어있는 상품 분류. */
  category: any;
  /** 기획전 번호 */
  project_no: any;
  /** 상품상세설명

상품에 보다 상세한 정보가 포함되어있는 설명. HTML을 사용하여 입력이 가능하다. */
  description: string;
  /** 모바일 상품 상세설명

입력시 모바일 쇼핑몰에서 상품상세설명 대신 모바일 상품 상세 설명을 대신 표시함. */
  mobile_description: string;
  /** 모바일 별도 등록

T : 직접등록
F : 상품 상세설명 동일 */
  separated_mobile_description: string;
  /** 상품결제안내

상품의 결제 방법에 대한 안내 문구. HTML을 사용하여 입력이 가능하다. */
  payment_info: string;
  /** 상품배송안내

상품의 배송 방법에 대한 안내 문구. HTML을 사용하여 입력이 가능하다. */
  shipping_info: string;
  /** 교환/반품안내

상품의 교환/반품 방법에 대한 안내 문구. HTML을 사용하여 입력이 가능하다. */
  exchange_info: string;
  /** 서비스문의/안내

제품의 사후 고객 서비스 방법 대한 안내 문구. HTML을 사용하여 입력이 가능하다. */
  service_info: string;
  /** 부가세 표시 문구

[쇼핑몰 설정 > 상품 설정 > '상품 보기 설정 > 상품 정보 표시 설정 > 추가설정 > 판매가 부가세 표시문구']에서 설정한 문구 표시
tax_calculation이 A(자동계산)일 경우 null로 반환됨. */
  product_tax_type_text: string | null;
  /** 상품 간략 설명

상품에 대한 간략한 정보. 상품 진열 화면에서 노출 가능한 설명. HTML을 사용하여 입력이 가능하다.
[쇼핑몰 설정 > 상품 설정 > '상품 보기 설정 > 상품 정보 표시 설정']에서 노출되도록 설정 가능하다. */
  simple_description: string;
  /** 상품 태그 리소스

조회시 Embed 파라메터를 사용하여 조회할 수 있다. */
  tags: string;
  /** 옵션 사용여부

해당 상품이 옵션을 갖고 있는지에 대한 여부. 옵션을 갖고 있는 상품은 사이즈나 색상과 같은 다양한 선택지를 제공한다.

T : 옵션사용함
F : 옵션 사용안함 */
  has_option: string;
  /** 옵션 구성방식

옵션을 사용할 경우, 옵션의 유형 표시

● 조합 일체선택형 : 하나의 셀렉스박스(버튼 이나 라디오버튼)에 모든 옵션이 조합되어 표시됨
● 조합 분리선택형 : 옵션을 각각의 셀렉스박스(버튼 이나 라디오버튼)로 선택할 수 있으며 옵션명을 기준으로 옵션값을 조합할 수 있음
● 상품 연동형 : 옵션표시방식은 조합형과 유사하지만 필수옵션과 선택옵션을 선택할 수 있음. 옵션의 조합을 제한 없이 생성할 수 있음.
● 독립 선택형 : 독립적인 조건 여러개를 각각 선택할 수 있는 옵션으로 옵션 값이 조합되지 않고 각각의 품목으로 생성됨.

C : 조합 일체선택형
S : 조합 분리선택형
E : 상품 연동형
F : 독립 선택형 */
  option_type: string | null;
  /** 배송 계산 유형

A : 자동 계산
M : 수동 계산 */
  shipping_calculation: string;
  /** 배송방법

(개별배송비를 사용할 경우) 배송 수단 및 방법
shipping_calculation이 A(자동계산)일 경우 null로 반환.

01 : 택배
02 : 빠른등기
03 : 일반등기
04 : 직접배송
05 : 퀵배송
06 : 기타
07 : 화물배송
08 : 매장직접수령
09 : 배송필요 없음 */
  shipping_method: string | null;
  /** 배송비 선결제 설정

shipping_calculation이 A(자동계산)일 경우 null로 반환.

C : 착불
P : 선결제
B : 선결제/착불 */
  prepaid_shipping_fee: string | null;
  /** 배송기간

(개별배송비를 사용할 경우) 상품 배송시 평균적으로 소요되는 배송 기간.
shipping_calculation이 A(자동계산)일 경우 null로 반환.
 */
  shipping_period: string | null;
  /** 배송정보

국내에만 배송이 가능한 상품인지 해외에도 배송이 가능한 상품인지 표시. [쇼핑몰 설정 > 배송 설정 > '배송 정책 설정 > 배송비 설정 > 개별배송비 설정'] 에서 상품별 개별배송료 설정이 사용안함인 경우 설정 불가.
shipping_calculation이 A(자동계산)일 경우 null로 반환.

A : 국내배송
C : 해외배송
B : 국내/해외배송 */
  shipping_scope: string | null;
  /** 최대글자수 : [255자]

배송지역

(개별배송비를 사용할 경우) 상품을 배송할 수 있는 지역.
shipping_calculation이 A(자동계산)일 경우 null로 반환. */
  shipping_area: string | null;
  /** 구간별 배송비

개별배송비를 사용할 경우 상품의 개별 배송비.

shipping_fee_type이 R, N일 경우 배열 안에 shipping_fee를 정의하여 배송비를 설정할 수 있다.

shipping_fee_type이 M, D, W, C일 경우 배열 안에 다음과 같이 정의하여 배송비 구간을 설정할 수 있다.
shipping_rates_min : 배송비 구간 시작 기준
shipping_rates_max : 배송비 구간 종료 기준
shipping_fee : 배송비

shipping_calculation이 A(자동계산)일 경우 null로 반환. */
  shipping_rates: string | null;
  /** 원산지 코드

상품의 원산지 코드.
 */
  origin_place_code: number;
  /** 추가항목

[쇼핑몰 설정 > 상품 설정 > '상품 보기 설정 > 상품 정보 표시 설정']에서 추가한 추가항목.

기본적인 상품 정보 외에 추가로 표시항 항목이 있을 때 추가하여 사용함. */
  additional_information: string | null;
  /** 관련상품

해당 상품과 비슷한 상품 혹은 대체 가능한 상품. 관련 상품 등록시 해당 상품의 상세페이지 하단에 노출된다.
 */
  relational_product: string | null;
  /** 옵션별로 한 개씩 선택 (독립형 옵션)

독립형 옵션을 사용할 경우, 하나의 옵션을 여러개 중복하여 선택할 수 없고 한개씩만 선택 가능함.

T : 사용함
F : 사용안함 */
  select_one_by_option: string;
};

declare type CategoryProductsInfo = {
  /** 멀티쇼핑몰 번호 */
  shop_no: number;
  /** 상품번호 */
  product_no: number;
  /** 상품명 */
  product_name: string;
  /** 제조사 */
  manufacturer_name: string;
  /** 원산지 */
  origin_place_value: string;
  /** 상품 소비자가 */
  retail_price: string;
  /** 판매가 */
  price: string;
  /** 무이자할부 기간 */
  interest_free_period: string;
  /** 영문 상품명 */
  eng_product_name: string;
  /** 자체상품 코드 */
  custom_product_code: string;
  /** 적립금 */
  point_amount: PointAmount[];
  /** 브랜드 명 */
  brand_name: string;
  /** 모델명 */
  model_name: string;
  /** 상품 판매가 */
  price_excluding_tax: string;
  /** 세액 */
  tax: string;
  /** 상품코드 */
  product_code: string;
  /** 상품 간략 설명 */
  simple_description: string;
  /** 상품요약설명 */
  summary_description: string;
  /** 공급사명 */
  supplier_name: string;
  /** 제조일자 */
  made_date: string;
  /** 사용후기 갯수 */
  review_count: number;
  /** 유효기간 */
  expiration_date: ExpriationDate;
  /** 쿠폰적용가 */
  coupon_discounted_price: string;
  /** 트렌드 명 */
  trend_name: string;
  /** 배송정보 */
  shipping_scope: string;
  /** 배송비 타입
   * T : 배송비 무료
   * R : 고정배송비 사용
   * M : 구매 금액에 따른 부과
   * D : 구매 금액별 차등 배송료 사용
   * W : 상품 무게별 차등 배송료 사용
   * C : 상품 수량별 차등 배송료 사용
   * N : 상품 수량에 비례하여 배송료 부과
   */
  shipping_fee_type: string;
  /** 구간별 배송비 */
  shipping_rates: string;
  /** 배송비 */
  shipping_fee: string;
  /** 할인판매가 */
  discount_price: string;
  /** 최적할인가 */
  optimum_discount_price: string;
  /** 배송방법 */
  shipping_method: string;
  /** 할인 기간 */
  promotion_period: PromotionPeriod;
  /** 상품색상 */
  color: string[];
  /** 상품 추가설명 번역정보 */
  translated_additional_description: string;
  /** 재고수량 */
  stock_quantity: number;
  /** 상품문의(수) */
  question_count: number;
  /** 상품자유게시판(수) */
  product_article_count: number;
};
