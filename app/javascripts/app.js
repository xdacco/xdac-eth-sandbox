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

    const _roundGoals = [
      ether(document.getElementById("goal_0").value),
      ether(document.getElementById("goal_1").value),
      ether(document.getElementById("goal_2").value),
      ether(document.getElementById("goal_3").value),
      ether(document.getElementById("goal_4").value),
    ]

    const _roundRates = [
      new BigNumber(document.getElementById("rate_0").value),
      new BigNumber(document.getElementById("rate_1").value),
      new BigNumber(document.getElementById("rate_2").value),
      new BigNumber(document.getElementById("rate_3").value),
      new BigNumber(document.getElementById("rate_4").value)
    ]

    //const _minContribution = 0.001
    const _wallet = document.getElementById("walletMain").value;
    const _minContribution = ether(document.getElementById("minContribution").value)
    const _totalSupply = ether(document.getElementById("totalSupply").value)


    var xdactokencrowdsaleContract = web3.eth.contract(xdac_artifacts.abi);
    var xdactokencrowdsale = xdactokencrowdsaleContract.new(
      _wallet,
      _roundGoals,
      _roundRates,
      _minContribution,
      _totalSupply,
      {
        from: web3.eth.accounts[0],
        data:xdac_artifacts.bytecode,
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          document.getElementById("address").value = contract.address;
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
  sendToken: function () {
    var self = this;
    var send_address = document.getElementById("send_address").value;
    var amount = document.getElementById("amount").value;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.sendToken(send_address, ether(amount), { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  whitelistAddresses: function () {
    var self = this;
    var whitelist = _.filter(_.uniq(_.map(_.split(document.getElementById("whitelist_addresses").value, ","), _.trim)),  (val) => {
      return web3.isAddress(val)
    });
    if(contract_address && whitelist.length > 0) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.whitelistAddresses(whitelist, { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  refundTokens: function () {
    var self = this;
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
    var self = this;
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
      const contributorValues = await XdacTokenCrowdsaleInstance.contributors.call(address)
      eth_balance = contributorValues[0].valueOf() / ether(1);
      whitelisted = contributorValues[1].valueOf();
      const token = await XdacTokenCrowdsaleInstance.token.call()
      const XdacTokenInstance = await XdacToken.at(token)
      const balance = await XdacTokenInstance.balanceOf(address)
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
