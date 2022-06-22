web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var abi = [ { "constant": true, "inputs": [], "name": "ended", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numInvestors", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "status", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "goalAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "fundigHistory", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "mappingforRefund", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "fund", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "mappingTableNum", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_goalAmount", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
var cfAbi = web3.eth.contract(abi);
var cfObj = cfAbi.at("0xa151D73f88E29AcaA0d53784baBcEBD9048A2776");

var accounts = web3.eth.accounts;

function refreshAccountsTable() {
    var innerHtml = "<tr><td>Account</td><td>Balance</td>";

    for (var i = 0; i < accounts.length; i++) {
        var account = accounts[i];
        var balance = web3.fromWei(web3.eth.getBalance(account), "ether");
        innerHtml = innerHtml + "<tr><td>" + account + "</td><td>" + balance + "</td></tr>";   
    }
    $("#accountsBalanceTable").html(innerHtml);
    
}


function transferCoins() {
    var  sender  =  $("#from").val();         
    var  recipient  =  $("#to").val();         
    var  tokensToTransfer  =  $("#amount").val();         
    
    cfObj.transfer(recipient, tokensToTransfer, {from:sender, gas: 200000}, function(e,result) {
        if(!e) {
            refreshAccountsTable(); 
            refreshFundingStatusTable();
        }                
                        
        else                 
            console.error(error);         
    }); 
}

function refreshFundingStatusTable() {
    var innerHtml = "<tr><td>Total Amount</td><td>Goal Amount</td>";

    var total = cfObj.totalAmount();
    var goal = cfObj.goalAmount();
    innerHtml = innerHtml + "<tr><td>" + total + "</td><td>" + goal + "</td></tr>";   

    $("#fundingStatus").html(innerHtml);
}

function refreshHistoryTable() {
    var innerHtml = "<tr><td>Account</td><td>Fund Amount</td>";

    for (var i = 0; i < cfObj.mappingTableNum; i++) {
        var account = cfObj.fundinghistory[i]
        var fundAmount = web3.cfObj.fundinghistory[i]
        innerHtml = innerHtml + "<tr><td>" + account + "</td><td>" + fundAmount + "</td></tr>";   
    }
    $("#fundingHistory").html(innerHtml);
    
}


$(document).ready(function()  {     
    refreshAccountsTable(); 
    refreshFundingStatusTable();
});
