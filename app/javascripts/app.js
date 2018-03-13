// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ether from '../../node_modules/zeppelin-solidity/test/helpers/ether'
const BigNumber = web3.BigNumber;
// Import our contract artifacts and turn them into usable abstractions.
import xdac_artifacts from '../../build/contracts/XdacTokenCrowdsale.json'
import coin_artifacts from '../../build/contracts/XdacToken.json'
import _ from "lodash";
// MetaCoin is our usable abstraction, which we'll use through the code below.
var XdacTokenCrowdsale = contract(xdac_artifacts);
var XdacToken = contract(coin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var contract_address = '';
window.App = {
  start: function() {
    var self = this;
    contract_address = document.getElementById("address").value;
    // Bootstrap the MetaCoin abstraction for Use.
    XdacTokenCrowdsale.setProvider(web3.currentProvider);
    XdacToken.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      document.getElementById("account").value = account;
    });
  },
  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  deploy: function() {
    var _wallet = "0x315F5Ea9f407e386b45796856012c0e07068C18a";
    const _roundGoals = [
      ether(0.05),
      ether(0.10),
      ether(0.15),
      ether(0.20),
      ether(0.25)
    ]

    const _roundRates = [
      new BigNumber(12500),
      new BigNumber(12000),
      new BigNumber(11500),
      new BigNumber(11000),
      new BigNumber(10500)
    ]

    const _minContribution = 0.001

    var xdactokencrowdsaleContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contributors","outputs":[{"name":"eth","type":"uint256"},{"name":"whitelisted","type":"bool"},{"name":"created","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributors","type":"address[]"}],"name":"whitelistAddresses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"refundTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"refundTokensForAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_contributor","type":"address"}],"name":"getContributorValues","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiDelivered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_wallet","type":"address"},{"name":"_roundGoals","type":"uint256[]"},{"name":"_roundRates","type":"uint256[]"},{"name":"_minContribution","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"curRound","type":"uint256"},{"indexed":false,"name":"weiDelivered","type":"uint256"},{"indexed":false,"name":"weiAmount","type":"uint256"},{"indexed":false,"name":"calculatedTokenAmount","type":"uint256"}],"name":"TokenCalculate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"x","type":"bool"}],"name":"Test","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"}]);
    var xdactokencrowdsale = xdactokencrowdsaleContract.new(
      _wallet,
      _roundGoals,
      _roundRates,
      _minContribution,
      {
        from: web3.eth.accounts[0],
        data: '0x606060405234156200001057600080fd5b60405162002e4738038062002e47833981016040528080519060200190919080518201919060200180518201919060200180519060200190919050508160008151811015156200005c57fe5b90602001906020020151846200007162000243565b604051809103906000f08015156200008857600080fd5b6000831115156200009857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515620000d557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200011257600080fd5b8260028190555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060058251141515620001ef57600080fd5b600583511415156200020057600080fd5b82600590805190602001906200021892919062000254565b5081600690805190602001906200023192919062000254565b508060078190555050505050620002ce565b60405161157080620018d783390190565b82805482825590600052602060002090810192821562000293579160200282015b828111156200029257825182559160200191906001019062000275565b5b509050620002a29190620002a6565b5090565b620002cb91905b80821115620002c7576000816000905550600101620002ad565b5090565b90565b6115f980620002de6000396000f300606060405260043610610112576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631f6d49421461011d57806321df0da7146101805780632bf04304146101d55780632c4e722e1461022f5780634042b66f146102585780634156658514610281578063521eb273146102ba578063710075091461030f5780638aabe700146103245780638d8f2adb1461035d5780638da5cb5b14610372578063a32bf597146103c7578063a39fac12146103f0578063be4aa19c1461045a578063ec8ac4d8146104b2578063edf26d9b146104e0578063f2fde38b14610543578063f7fb07b01461057c578063fc0c546a146105a5578063fc12dfc7146105fa575b61011b33610623565b005b341561012857600080fd5b610154600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106f1565b604051808481526020018315151515815260200182151515158152602001935050505060405180910390f35b341561018b57600080fd5b610193610735565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101e057600080fd5b61022d60048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505061075e565b005b341561023a57600080fd5b6102426107fb565b6040518082815260200191505060405180910390f35b341561026357600080fd5b61026b610801565b6040518082815260200191505060405180910390f35b341561028c57600080fd5b6102b8600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610807565b005b34156102c557600080fd5b6102cd61086f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561031a57600080fd5b610322610895565b005b341561032f57600080fd5b61035b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a0565b005b341561036857600080fd5b610370610908565b005b341561037d57600080fd5b610385610913565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103d257600080fd5b6103da610939565b6040518082815260200191505060405180910390f35b34156103fb57600080fd5b610403610988565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561044657808201518184015260208101905061042b565b505050509050019250505060405180910390f35b341561046557600080fd5b610491600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a1c565b60405180838152602001821515151581526020019250505060405180910390f35b6104de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610623565b005b34156104eb57600080fd5b6105016004808035906020019091905050610ace565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561054e57600080fd5b61057a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b0d565b005b341561058757600080fd5b61058f610c65565b6040518082815260200191505060405180910390f35b34156105b057600080fd5b6105b8610c8e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561060557600080fd5b61060d610cb3565b6040518082815260200191505060405180910390f35b6000803491506106338383610cb9565b61063c82610d15565b905061065382600354610ec490919063ffffffff16565b6003819055506106638382610ee2565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad188484604051808381526020018281526020019250505060405180910390a36106da8383610fe8565b6106e2610fec565b6106ec8383611098565b505050565b60086020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900460ff16905083565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107bc57600080fd5b600090505b81518110156107f7576107ea82828151811015156107db57fe5b9060200190602002015161109c565b80806001019150506107c1565b5050565b60025481565b60035481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561086357600080fd5b61086c8161109c565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61089e336111b6565b565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108fc57600080fd5b610905816111b6565b50565b61091133611295565b565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600090505b60058110156109835760058181548110151561095957fe5b906000526020600020900154600a54101561097657809150610984565b8080600101915050610941565b5b5090565b610990611542565b6009805480602002602001604051908101604052809291908181526020018280548015610a1257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116109c8575b5050505050905090565b600080610a27611556565b6000600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060606040519081016040529081600082015481526020016001820160009054906101000a900460ff161515151581526020016001820160019054906101000a900460ff161515151581525050915081602001519050816000015181935093505050915091565b600981815481101515610add57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b6957600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610ba557600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006006610c71610939565b815481101515610c7d57fe5b906000526020600020900154905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a5481565b60075481111515610cc957600080fd5b60056004815481101515610cd957fe5b906000526020600020900154610cfa82600a54610ec490919063ffffffff16565b11151515610d0757600080fd5b610d1182826113bf565b5050565b600080600080600080610d26610939565b94506000935060009250600a5491508690505b6005851015610eb757600585815481101515610d5157fe5b906000526020600020900154610d708284610ec490919063ffffffff16565b1115610e1557610da382600587815481101515610d8957fe5b90600052602060002090015461140f90919063ffffffff16565b9250610db88383610ec490919063ffffffff16565b9150610dcd838261140f90919063ffffffff16565b9050610e0e610dff600687815481101515610de457fe5b9060005260206000209001548561142890919063ffffffff16565b85610ec490919063ffffffff16565b9350610e5b565b610e54610e45600687815481101515610e2a57fe5b9060005260206000209001548361142890919063ffffffff16565b85610ec490919063ffffffff16565b9350610eb7565b7fb2688fbd8a09d5da0128329177088b492a5f18e777099b260caf53c2889d8aa5858383876040518085815260200184815260200183815260200182815260200194505050505060405180910390a18480600101955050610d39565b8395505050505050919050565b6000808284019050838110151515610ed857fe5b8091505092915050565b6000600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050610f3c348260000154610ec490919063ffffffff16565b8160000181905550600015158160010160019054906101000a900460ff1615151415610fe35760018160010160016101000a81548160ff02191690831515021790555060098054806001018281610f93919061157c565b9160005260206000209001600085909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b505050565b5050565b610ff4611556565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060606040519081016040529081600082015481526020016001820160009054906101000a900460ff161515151581526020016001820160019054906101000a900460ff16151515158152505090508060200151156110955761109433611295565b5b50565b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160010160006101000a81548160ff021916908315150217905550600015158160010160019054906101000a900460ff161515141561119b5760018160010160016101000a81548160ff0219169083151502179055506009805480600101828161114b919061157c565b9160005260206000209001600084909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b6000816000015411156111b2576111b182611295565b5b5050565b600080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160000154905060008111151561121057600080fd5b600082600001819055508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561125a57600080fd5b61126f8160035461140f90919063ffffffff16565b60038190555061128a81600a5461140f90919063ffffffff16565b600a81905550505050565b6000806000600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209250826000015491506112eb82610d15565b90506000811115156112fc57600080fd5b60008211151561130b57600080fd5b8260010160009054906101000a900460ff16151561132857600080fd5b6000836000018190555061134782600a54610ec490919063ffffffff16565b600a81905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015156113af57600080fd5b6113b98482611463565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156113fb57600080fd5b6000811415151561140b57600080fd5b5050565b600082821115151561141d57fe5b818303905092915050565b600080600084141561143d576000915061145c565b828402905082848281151561144e57fe5b0414151561145857fe5b8091505b5092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561152657600080fd5b5af1151561153357600080fd5b50505060405180519050505050565b602060405190810160405280600081525090565b606060405190810160405280600081526020016000151581526020016000151581525090565b8154818355818115116115a3578183600052602060002091820191016115a291906115a8565b5b505050565b6115ca91905b808211156115c65760008160009055506001016115ae565b5090565b905600a165627a7a723058202a4c38ac6c5131c064d2d60c1a9b261b9008fa03adc1f9451bd6a2fc6c3043f7002960606040526040805190810160405280600981526020017f5844414320434f494e00000000000000000000000000000000000000000000008152506003908051906020019062000051929190620001b9565b506040805190810160405280600481526020017f5844414300000000000000000000000000000000000000000000000000000000815250600490805190602001906200009f929190620001b9565b506012600560006101000a81548160ff021916908360ff1602179055503415620000c857600080fd5b600560009054906101000a900460ff1660ff16600a0a633b9aca0002600181905550600560009054906101000a900460ff1660ff16600a0a633b9aca00026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600560009054906101000a900460ff1660ff16600a0a633b9aca00026040518082815260200191505060405180910390a362000268565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001fc57805160ff19168380011785556200022d565b828001600101855582156200022d579182015b828111156200022c5782518255916020019190600101906200020f565b5b5090506200023c919062000240565b5090565b6200026591905b808211156200026157600081600090555060010162000247565b5090565b90565b6112f880620002786000396000f3006060604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100bf578063095ea7b31461014d57806318160ddd146101a757806323b872dd146101d05780632ff2e9dc14610249578063313ce5671461027257806366188463146102a157806370a08231146102fb57806395d89b4114610348578063a9059cbb146103d6578063d73dd62314610430578063dd62ed3e1461048a575b600080fd5b34156100ca57600080fd5b6100d26104f6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101125780820151818401526020810190506100f7565b50505050905090810190601f16801561013f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015857600080fd5b61018d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610594565b604051808215151515815260200191505060405180910390f35b34156101b257600080fd5b6101ba610686565b6040518082815260200191505060405180910390f35b34156101db57600080fd5b61022f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610690565b604051808215151515815260200191505060405180910390f35b341561025457600080fd5b61025c610a4a565b6040518082815260200191505060405180910390f35b341561027d57600080fd5b610285610a69565b604051808260ff1660ff16815260200191505060405180910390f35b34156102ac57600080fd5b6102e1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610a7c565b604051808215151515815260200191505060405180910390f35b341561030657600080fd5b610332600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610d0d565b6040518082815260200191505060405180910390f35b341561035357600080fd5b61035b610d55565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561039b578082015181840152602081019050610380565b50505050905090810190601f1680156103c85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103e157600080fd5b610416600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610df3565b604051808215151515815260200191505060405180910390f35b341561043b57600080fd5b610470600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611012565b604051808215151515815260200191505060405180910390f35b341561049557600080fd5b6104e0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061120e565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561058c5780601f106105615761010080835404028352916020019161058c565b820191906000526020600020905b81548152906001019060200180831161056f57829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156106cd57600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561071a57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107a557600080fd5b6107f6826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461129590919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610889826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112ae90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061095a82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461129590919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600560009054906101000a900460ff1660ff16600a0a633b9aca000281565b600560009054906101000a900460ff1681565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610b8d576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c21565b610ba0838261129590919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610deb5780601f10610dc057610100808354040283529160200191610deb565b820191906000526020600020905b815481529060010190602001808311610dce57829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610e3057600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610e7d57600080fd5b610ece826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461129590919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f61826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112ae90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60006110a382600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546112ae90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60008282111515156112a357fe5b818303905092915050565b60008082840190508381101515156112c257fe5b80915050929150505600a165627a7a72305820ac41e714dc458e8a2a0fe4c364fe22cee857f8ebcc34a20bab3e7909225178ae0029',
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
      })
  },

  refreshBalance: function() {
    var self = this;
    if(contract_address) {
      self.getBalance(account).then(function (data) {
        var balance_confirmed_element = document.getElementById("balance_confirmed");
        balance_confirmed_element.innerHTML = data.xdac;
        var whitelisted_element = document.getElementById("whitelisted");
        whitelisted_element.innerHTML = data.whitelisted;
        var balance_element = document.getElementById("balance");
        balance_element.innerHTML = data.eth;
      })
    }
    document.getElementById("beneficiary").value = account;
  },

  buyTokens: function() {
    var self = this;

    var amount = ether(parseFloat(document.getElementById("amount").value));
    var beneficiary = document.getElementById("beneficiary").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        meta = instance;
        console.log(amount)
        return meta.buyTokens(beneficiary, { from: account, value: amount });
      }).then(function () {
        self.setStatus("Transaction complete!");
        self.refreshBalance();
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  whitelistAddress: function () {
    var self = this;
    var whitelist = document.getElementById("whitelist").value;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.whitelistAddress(whitelist, { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  refundTokens: function () {
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.refundTokens({ from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  refundTokensForAddress: function () {
    var refund_address = document.getElementById("refund").value;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.refundTokensForAddress(refund_address, { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  getAddresses: function () {
    var self = this;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.getAddresses({ from: account });
      }).then(function (addresses) {
        console.log(addresses)
        var addresses_element = document.getElementById("addresses");
        var res = [];
        var whitelisted_element = document.getElementById("addresses");
        whitelisted_element.value = "";
        _(addresses).forEach(function (address) {
          self.getBalance(address).then(function (data) {

            res.push(data)
            whitelisted_element.value = whitelisted_element.value + "\n" + "address: " + data.address + ", eth:"+data.eth + ", xdac:"+data.xdac + ", whitelisted:" + data.whitelisted + "\n"
          })
          self.setStatus("Transaction complete!");
        })


      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  getBalance: async function(address) {
    var eth_balance = 0;
    var xdac_balance = 0;
    var whitelisted = false;
    if (contract_address) {
      const XdacTokenCrowdsaleInstance = await XdacTokenCrowdsale.at(contract_address)
      const contributorValues = await XdacTokenCrowdsaleInstance.getContributorValues(address, { from: account })
      eth_balance = contributorValues[0].valueOf() / ether(1);
      whitelisted = contributorValues[1].valueOf();
      const token = await XdacTokenCrowdsaleInstance.getToken({ from: account })
      const XdacTokenInstance = await XdacToken.at(token)
      const balance = await XdacTokenInstance.balanceOf(address, { from: account })
      xdac_balance = balance / ether(1);
   }
    return {'address': address, 'eth': eth_balance, 'xdac': xdac_balance, 'whitelisted': whitelisted }
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
