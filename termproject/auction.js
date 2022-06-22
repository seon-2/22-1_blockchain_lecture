web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

let abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
      {
        name: "_price",
        type: "uint256",
      },
    ],
    name: "bid",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable",
  },
  {
    constant: false,
    inputs: [],
    name: "chk_end",
    outputs: [],
    payable: true,
    type: "function",
    stateMutability: "payable",
  },
  {
    constant: false,
    inputs: [
      {
        name: "fin",
        type: "bool",
      },
    ],
    name: "chk_end2",
    outputs: [],
    payable: true,
    type: "function",
    stateMutability: "payable",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_price",
        type: "uint256",
      },
    ],
    name: "minPrice",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_addr",
        type: "address",
      },
    ],
    name: "participate",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable",
  },
  {
    constant: false,
    inputs: [],
    name: "withdrawprice",
    outputs: [],
    payable: false,
    type: "function",
    stateMutability: "nonpayable",
  },
  {
    inputs: [
      {
        name: "_url",
        type: "string",
      },
      {
        name: "_price",
        type: "uint256",
      },
    ],
    payable: false,
    type: "constructor",
    stateMutability: "nonpayable",
  },
  {
    constant: true,
    inputs: [],
    name: "art_link",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "auction_historys",
    outputs: [
      {
        name: "his_addr",
        type: "address",
      },
      {
        name: "his_price",
        type: "uint256",
      },
      {
        name: "his_time",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "auctioneers",
    outputs: [
      {
        name: "addr",
        type: "address",
      },
      {
        name: "price",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "count",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "cur_account",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "cur_price",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "deadline",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "flag",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "min_price",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "result",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "starting_price",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "status",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
  {
    constant: true,
    inputs: [],
    name: "total_auctioneer",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    type: "function",
    stateMutability: "view",
  },
];
let CA = "0xc67Ab7D53f4DB7F82C8b1D9fd9Fd4E89613a5339";

web3.eth.defaultAccount = web3.eth.accounts[1];
web3.personal.unlockAccount(web3.eth.defaultAccount, "pw1");
var acAbi = web3.eth.contract(abi);
let ac_obj = acAbi.at(CA);
var accounts = web3.eth.accounts;

//존재하는 계정 화면에 그리는 함수
function drawAccountsTable() {
  while (document.getElementById("accoutsTable").hasChildNodes()) {
    document
      .getElementById("accoutsTable")
      .removeChild(document.getElementById("accoutsTable").firstChild);
  }

  var innerHtml = "<tr><td>Account</td><td>Balance</td></tr>";

  for (var i = 0; i < accounts.length; i++) {
    var account = accounts[i];
    var balance = web3.fromWei(web3.eth.getBalance(account), "ether");

    innerHtml =
      innerHtml +
      "<tr><td>" +
      account +
      "</td><td>&nbsp;" +
      balance +
      "</td></tr>";
  }

  $("#accoutsTable").html(innerHtml);
} //함수의 끝

//경매 참여 함수
function joinAuction() {
  let joinAddr = $("#joinAddr").val();
  ac_obj.participate(joinAddr);
  $("#joinAddr").val("");
  drawAuctioneers();
} //함수의 끝

//경매 참여중인 계정 화면에 그리는 함수
function drawAuctioneers() {
  while (document.getElementById("auctioneersTable").hasChildNodes()) {
    document
      .getElementById("auctioneersTable")
      .removeChild(document.getElementById("auctioneersTable").firstChild);
  }

  var innerHtml = "<tr><td>Account</td><td>Price</td></tr>";

  let numAuctioneer = ac_obj.total_auctioneer().c[0];
  for (var i = 0; i < numAuctioneer; i++) {
    let addr = ac_obj.auctioneers(i)[0];
    let price = ac_obj.auctioneers(i)[1].c[0].toString().charAt(0);
    for (let i = 0; i < ac_obj.auctioneers(0)[1].e - 18; i++) {
      price += "0";
    }
    innerHtml =
      innerHtml +
      "<tr><td>" +
      addr +
      "</td><td>&nbsp;" +
      price +
      "&nbsp;ether</td></tr>";
  }

  $("#auctioneersTable").html(innerHtml);
  setInterval(() => {
    while (document.getElementById("auctioneersTable").hasChildNodes()) {
      document
        .getElementById("auctioneersTable")
        .removeChild(document.getElementById("auctioneersTable").firstChild);
    }

    let innerHtml = "<tr><td>Account</td><td>Price</td></tr>";

    let numAuctioneer = ac_obj.total_auctioneer().c[0];
    for (var i = 0; i < numAuctioneer; i++) {
      let addr = ac_obj.auctioneers(i)[0];
      let price = ac_obj.auctioneers(i)[1].c[0].toString().charAt(0);
      for (let i = 0; i < ac_obj.auctioneers(0)[1].e - 18; i++) {
        price += "0";
      }
      innerHtml =
        innerHtml +
        "<tr><td>" +
        addr +
        "</td><td>&nbsp;" +
        price +
        "&nbsp;ether</td></tr>";
    }

    $("#auctioneersTable").html(innerHtml);
  }, 5000);
} //함수의 끝

//입찰하기 함수
function startBid() {
  addr = $("#bidAddr").val();
  price = $("#bidPrice").val();

  let varTemp = 0;
  varTemp = ac_obj.bid(addr, price);
  while (varTemp === 0) {
    setTimeout(() => console.log("입찰 여부를 확인 중 입니다."), 3000);
  }
  let bidResult = ac_obj.result().c[0];

  // 리턴 값 >> 0: 입찰 등록 성공, 1: 계촤 등록 필요,
  //2: 계좌 잔액 부족, 3: 입찰 최저가 오류 4: 경매 종료
  switch (bidResult) {
    case 0:
      alert("입찰 성공");
      // autionHistory.unshift(addr);
      break;
    case 1:
      alert("계좌 등록 필요");
      break;
    case 2:
      alert("계좌 잔액 부족");
      break;
    case 3:
      alert("입찰 최저가 오류");
      break;
    case 4:
      alert("경매 종료");
      break;
  }
} //함수의 끝

//입찰리스트 그리는 함수
function drawAuctionList() {
  let innerHtml = "";
  let hisAddr;
  let hisPrice;
  let hisTime;

  innerHtml += "<tr><td>No.</td><td>주소</td><td>제시가</td><td>시간</td></tr>";
  $("#list").html(innerHtml);

  let counter = 0;
  let numAuctioneer = ac_obj.count().c[0];
  for (let i = numAuctioneer; i !== 0 && i > 0; i--) {
    hisAddr = ac_obj.auction_historys(i - 1)[0];
    hisPrice = ac_obj
      .auction_historys(i - 1)[1]
      .c[0].toString()
      .charAt();
    for (let i = 0; i < ac_obj.auctioneers(0)[1].e - 18; i++) {
      hisPrice += "0";
    }
    hisTime = ac_obj.auction_historys(i - 1)[2].c[0];
    hisTime = Unix_timestamp(hisTime);

    innerHtml +=
      "<tr class='listChild'><td class='listChild'>" +
      i +
      "</td><td class='listChild'>" +
      hisAddr +
      "</td><td class='listChild'>" +
      hisPrice +
      "&nbsp;ether</td><td class='listChild'>" +
      hisTime +
      "</td></tr>";
    if (++counter === 10) break;
  }
  $("#list").html(innerHtml);

  setInterval(() => {
    let innerHtml =
      "<tr><td>No.</td><td>주소</td><td>제시가</td><td>시간</td></tr>";
    let hisAddr;
    let hisPrice;
    let hisTime;

    let counter = 0;
    let numAuctioneer = ac_obj.count().c[0];
    for (let i = numAuctioneer; i !== 0 && i > 0; i--) {
      hisAddr = ac_obj.auction_historys(i - 1)[0];
      hisPrice = ac_obj
        .auction_historys(i - 1)[1]
        .c[0].toString()
        .charAt();
      for (let i = 0; i < ac_obj.auctioneers(0)[1].e - 18; i++) {
        hisPrice += "0";
      }
      hisTime = ac_obj.auction_historys(i - 1)[2].c[0];
      hisTime = Unix_timestamp(hisTime);

      innerHtml +=
        "<tr class='listChild'><td class='listChild'>" +
        i +
        "</td><td class='listChild'>" +
        hisAddr +
        "</td><td class='listChild'>" +
        hisPrice +
        "&nbsp;ether</td><td class='listChild'>" +
        hisTime +
        "</td></tr>";
      if (++counter === 10) break;
    }
    while (document.getElementById("list").hasChildNodes()) {
      document
        .getElementById("list")
        .removeChild(document.getElementById("list").firstChild);
    }
    $("#list").html(innerHtml);
  }, 20000);
} //함수 끝

//경매 이미지 그리는 함수
function setImage() {
  let link = ac_obj.art_link();
  let innerHtml = '<img src="' + link + '" alt="">';
  $("#imageLink").html(innerHtml);
} //함수 끝

//최저 제시가 그리는 함수
function setMinPrice() {
  let vMinPrice = "1";
  let forNum = ac_obj.min_price().e;
  for (i = 0; i < forNum - 18; i++) {
    vMinPrice += "0";
  }
  $("#minPrice").html(vMinPrice + "&nbsp;ether");

  setInterval(() => {
    while (document.getElementById("list").hasChildNodes()) {
      document
        .getElementById("list")
        .removeChild(document.getElementById("list").firstChild);
    }
    let vMinPrice = "1";
    let forNum = ac_obj.min_price().e;
    for (i = 0; i < forNum - 18; i++) {
      vMinPrice += "0";
    }
    $("#minPrice").html(vMinPrice + "&nbsp;ether");
  }, 8000);
} //함수 끝

//경매 종료 여부 확인 함수
function isAuctionEnd() {
  let status = 0;

  status = ac_obj.status().c[0];
  if (status == 1) {
    drawEnd();
  } else {
    const endChecker = setInterval(() => {
      let status = 0;

      status = ac_obj.status().c[0];
      if (status == 1) {
        drawEnd();
        finalBid();
        clearInterval(endChecker);
      }
    }, 7000);
  }
} //함수 끝

//경매 종료시 마지막 입찰자의 계좌에서 컨트랙트로 송금하는 함수
function finalBid() {
  let finalAdrr = ac_obj.cur_account();
  let finalPrice = ac_obj.cur_price().c[0].toString().charAt(0);
  let forNum = ac_obj.cur_price().e;

  for (let i = 0; i < forNum - 18; i++) finalPrice += "0";

  if (finalPrice == 0) {
    console.log("입찰한 사람이 없습니다...");
  } else {
    var txHash = ac_obj.chk_end({
      from: finalAdrr,
      to: CA,
      value: web3.toWei(parseInt(finalPrice) + 10, "ether"),
    });
    console.log(txHash);
  }
} //함수 끝

//경매 종료시 화면 바꾸기 함수
function drawEnd() {
  while (document.getElementById("genesisTag").hasChildNodes()) {
    document
      .getElementById("genesisTag")
      .removeChild(document.getElementById("genesisTag").firstChild);
  }
  let link = ac_obj.art_link();
  let innerHtml = "";
  innerHtml +=
    '<img src="' +
    link +
    '" alt=""><br><br><h1>경매가 종료되었습니다!</h1><br><button onClick="getPrice();" id="ownerGet" type="button" class="btn btn-primary btn-lg">Owner: 입찰가 받아가기</button>';
  $("#genesisTag").html(innerHtml);
} //함수 끝

//Owner 입찰가 받아가는 함수
function getPrice() {
  console.log("Owner가 낙찰가를 받아갑니다.");
  let ownerAddr = ac_obj.owner();
  let finalPrice = ac_obj.cur_price().c[0].toString().charAt(0);
  let forNum = ac_obj.cur_price().e;

  for (let i = 0; i < forNum - 18; i++) finalPrice += "0";

  if (finalPrice == 0) {
    console.log("아무도 입찰하지 않았네요...");
    alert("아무도 입찰하지 않았네요...");
  } else {
    var txHash = ac_obj.chk_end({
      from: CA,
      to: ownerAddr,
      value: web3.toWei(parseInt(finalPrice), "ether"),
    });
    console.log(txHash);
  }
}

$(document).ready(function () {
  if (!isAuctionEnd()) {
    setImage();
    drawAccountsTable();
    setMinPrice();
    drawAuctioneers();
    drawAuctionList();
  }
});

//시간 정렬 함수
function Unix_timestamp(t) {
  var date = new Date(t * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  return (
    year +
    "-" +
    month.substr(-2) +
    "-" +
    day.substr(-2) +
    " " +
    hour.substr(-2) +
    ":" +
    minute.substr(-2) +
    ":" +
    second.substr(-2)
  );
}

//현재 마지막 제시가보다 더 많은 돈을 가진 계정이 없을 경우
// function isOver() {
//   setInterval(() => {
//     let numAuctioneer = ac_obj.count().c[0];

//     let curAddr = ac_obj.cur_account();
//     let curPrice = ac_obj.cur_price().c[0];
//     let counter = 0;

//     if (numAuctioneer > 0) {
//       for (var i = 0; i < numAuctioneer; i++) {
//         let addr = ac_obj.auctioneers(i)[0];
//         let price = web3.eth.getBalance(addr);
//         if (curPrice <= price && addr != curAddr) counter++;
//       }
//     }
//     if (counter === 0) ac_obj.chk_end2(true);
//   }, 30000);
// } //함수 끝 에러발생으로인해 주석처리함
