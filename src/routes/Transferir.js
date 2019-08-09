const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const cuentas = require('../Cuentas');
const trans = require('../transactions');
const fs = require('fs');

router.get('/', (req, res) => {
    res.json(cuentas);
});

router.post('/', (req, res) => {
    const { fromAccount, toAccount, amount } = req.body;
    if (fromAccount && toAccount && amount) {
        var band = 0;
        _.each(cuentas, (cuenta, i) => {

            if (cuenta.NumeroCuenta == toAccount) {
                band = 2;
                return true;
            } else {
                if (band == 2) {
                    band = 2;
                } else {
                    band = 3;
                }

            }

        });
        if (band == 3) {
            res.json('No existe cuenta destino');
        } else {
            _.each(cuentas, (cuenta, i) => {

                if (cuenta.NumeroCuenta == fromAccount) {
                    if (cuenta.cantidad >= amount) {
                        cuenta.cantidad = cuenta.cantidad - amount;
                        band = 1;
                    } else {
                        res.json('No Cuenta Con Dinero Suficiente');
                        band = 4;

                    }

                } else {
                    if (band == 1) {
                        band = 1;
                    } else {
                        if (band == 4) {
                            band = 4;
                        } else {
                            band = 2;
                        }

                    }

                }

            });

            if (band == 2) {
                res.json('No existe cuenta Origen');
            } else {
                band = 1;
            }

        }

        if (band == 1) {
            let sentAt = GetFecha();
            const newCuenta = {...req.body, sentAt };

            trans.transactions.push(newCuenta);
            _.each(cuentas, (cuenta, i) => {

                if (cuenta.NumeroCuenta == toAccount) {
                    cuenta.cantidad = cuenta.cantidad + amount;
                    res.json('Dinero Agregado con exito');
                }

            });

        }


    }


});

function GetFecha() {
    let fecha = "";
    n = new Date();
    //Año
    y = n.getFullYear();
    //Mes
    m = n.getMonth() + 1;
    //Día
    d = n.getDate();
    fecha = d + "/" + m + "/" + y;
    return fecha
}

module.exports = router;