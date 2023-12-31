import { Router } from "express";
import nodemailer from 'nodemailer'
import config from "../config/env.js";
import isUser from "../middlewares/isUser.js";

const router = Router();

router.post('/', isUser,async (req, res) => {
    let configMail = {
        service: 'gmail',
        auth: {
            user: config.mailDelEcommerce,
            pass: config.mailPasswordDelEcommerce
        }
    }
    let transporter = nodemailer.createTransport(configMail)
    const mailUser = req.user.email;

    const purchasedProducts = req.body.pd
    const total=req.body.total
;  
    let purchaseDetails = '<h2>Detalle de la Compra</h2><table border="1"><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th></tr>';

    purchasedProducts.forEach(product => {
        purchaseDetails += `<tr>
            <td>${product.product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.product.price}</td>
        </tr>`;
    });
    purchaseDetails += '</table>';

    
    let message = {
        from: config.mailDelEcommerce,
        to: mailUser,
        subject: 'Gracias por su compra',
        html: `
            <p>El detalle de tu compra es:</p>
            ${purchaseDetails}
            <p>El total de tu compra es:</p>
            $ ${total} pesos Argentinos
        `
    };
    transporter.sendMail(message)
        .then(() => res.status(201).json({ status: 'success' }))
        .catch(error => res.status(500).json({ error }));
})

export default router;