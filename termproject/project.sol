pragma solidity ^0.4.13;
contract project {
    uint public total_auctioneer;   // 경매 참가자의 수
    uint public starting_price; // 경매 시작가, 최소 10이더 이상
    uint public min_price;  // 최저 입찰가 단위
    uint public deadline;   // 경매 마감 시간 (마지막 경매 내역 발생 시간 +5분)
    uint public flag;   // 최저 입찰가 단위 계산을 위한 변수
    uint public count;  // 경매 입찰 횟수
    uint public cur_price;  // 마지막 입찰가
    uint public status; // 경매 상태 확인 변수 0:진행중, 1:완료
    uint public result;
    address public owner;	// 경매 개시 계좌
    address public cur_account;    // 마지막 입찰 계좌
    string public art_link; // 미술품 링크
    
    // 경매 개시자 권한 체크
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // 참여 경매자의 정보를 담는 구조체
    struct auctioneer{
        address addr;   // 경매자 주소
        uint price;    // 입찰가
    }

    // 입찰 내역의 정보를 담는 구조체
    struct auction_history{
        address his_addr;   // 경매 내역의 주소
        uint his_price;    // 경매 내역의 입찰가
        uint his_time;  // 경매 내역 발생 시간
    }

    mapping (uint => auctioneer) public auctioneers;
    mapping (uint => auction_history) public auction_historys;

    // 생성자
    // 작품에 대한 정보가 담긴 링크와 시작가를 인자로 받음
    function project (string _url, uint _price) {
        owner = msg.sender;
        starting_price = _price * 1000000000000000000;  // 입력받은 값에 10^18을 곱하여 이더로 변환
        art_link = _url;
        deadline = now + 300;   // 최초 등록 데드라인은 경매등록 시작 시간 +5분
        total_auctioneer = 0;
        count = 0;
        flag = 10000000000000000000; // 최저가를 10이더부터 시작하기 때문에 몇자리인지 계산을 하기 위해 10^19부터 나누기 시작
        minPrice(starting_price);   // 경매 시작가에 따른 최저 입찰가 단위 설정
        status = 0;
    }

    // 최저 입찰가를 지정하기 위한 함수
    // flag는 10^19, 10^20, 10^21 ...순으로 증가하며
    // 몇자리 숫자인지 계산하여 _price/flag 값을 tmp에 저장하여 tmp<10보다 작은 경우
    // flag/10의 값을 최저 입찰가 단위로 정의
    function minPrice(uint _price){
        uint tmp;
        while(true){
            tmp = _price/flag;
            if(tmp<10){
                min_price = flag / 10;
                flag /= 10;
                break;
            }
            flag *= 10;
        }
    }

    // 경매 참가를 위한 주소 등록 함수
    function participate (address _addr){
        auctioneers[total_auctioneer].addr = _addr;
        auctioneers[total_auctioneer].price = 0;
        total_auctioneer += 1;
    }

    // 경매 입찰
    // 리턴 값 >> 0: 입찰 등록 성공, 1: 계촤 등록 필요, 2: 계좌 잔액 부족, 3: 입찰 최저가 오류 4: 경매 종료
    function bid (address _addr, uint _price){
        uint i;
        uint j;
        uint price;
        price = _price * 1000000000000000000;
        // 경매 시작 확인
        if(status == 1){
            result = 4;
            return;
        }
        // 등록된 계좌가 0개 시 계좌 등록 요청 메시지 리턴
        if(total_auctioneer==0){
            result = 1;
            return;
        }

        // 입찰 최저가 오류 확인
        if(price < cur_price + min_price){
            result = 3;
            return;
        }
        else if(price < starting_price + min_price){
            result = 3;
            return;
        }

        for(i=0;i<total_auctioneer;i++){
            if(_addr == auctioneers[i].addr){
                // 계좌의 잔고가 제시가보다 많은지 확인
                if(_price < auctioneers[i].addr.balance){
                    auctioneers[i].price = price;
                    cur_price = price;
                    cur_account = _addr;

                    // 최근 입찰 내역 등록을 위한 부분
                    auction_historys[count].his_addr = _addr;
                    auction_historys[count].his_price = price;
                    auction_historys[count].his_time = now;

                    count += 1;
                    deadline += 300;    // 경매 마감 시간 갱신
                    minPrice(price);   // 경매가 갱신에 따른 최저 입찰가 단위 갱신

                    result = 0;
                    return;
                }
                // 부족할 경우 알림 리턴
                else{
                    result = 2;
                    return;
                }
            }
        }
        result = 1;
        return;
    }

    // 경매가 종료되었는지 확인하는 함수
    function chk_end() payable{
        require(deadline < now);
        status = 1;
    }

    function chk_end2(bool fin) payable{
        require(fin);
        status = 1;
    }

    // 지불된 이더를 인출하는 함수
    function withdrawprice() public onlyOwner {
        if(status==1){
		    if (!owner.send(this.balance)){
			    revert();
            }
        }
    }
}