const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const trans = require('../transactions');
const cuentas = require('../Cuentas');
router.get('/all', (req, res) => {
    res.json(trans);
});

router.get('/recibidas/:id', (req, res) => {
    const { id } = req.params;
    let enviadas = []
    for (var i = 0; i < trans.transactions.length; i++) {
        if (trans.transactions[i].toAccount == id) {
            enviadas.push(trans.transactions[i]);

        }
    }
    res.json(enviadas);
});

router.get('/enviadas/:id', (req, res) => {
    const { id } = req.params;
    let enviadas = []
    for (var i = 0; i < trans.transactions.length; i++) {
        if (trans.transactions[i].fromAccount == id) {
            enviadas.push(trans.transactions[i]);

        }
    }
    res.json(enviadas);

});

router.get('/balance/:id', (req, res) => {
    const { id } = req.params;
    let enviadas = [];
    let aux = [];
    let sentAt = "9/08/19";
    for (var i = 0; i < cuentas.length; i++) {
        if (cuentas[i].NumeroCuenta == id) {
            enviadas.push(cuentas[i]);
        }
    }
    enviadas = enviadas[enviadas.length - 1]
    console.log(enviadas)
    aux.push({ "account": enviadas["NumeroCuenta"], "balance": enviadas["cantidad"], "owner": 76123343, "createAt": sentAt });
    res.json(aux);

});



module.exports = router;