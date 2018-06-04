//require('./test');

const express = require('express');
const app = express();

const EosApi = require('./src');
const eos = EosApi.Localnet({keyProvider: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'});


const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post('/create-account', function (req, res) {

    let name = req.body.company;



    res.set({
        'Content-Type': 'application/json'
    });

    // res.send({name: name});

    eos.transaction(tr => {
        tr.newaccount({
            creator: 'eosio',
            name: name,
            owner: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
            active: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
        })
        tr.buyrambytes({
            payer: 'inita',
            receiver: name,
            bytes: 8192
        })
    }).then(() => {
        eos.getAccount({'account_name':name}).then(result => {
            res.send(result);
        })
    }).catch( (e) => {
        res.send(e)
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
