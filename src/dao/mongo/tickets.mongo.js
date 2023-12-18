import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";
import Ticket from "./models/ticket.schema.js";

export default class TicketsMongo {
    create = async (cid,user,req,res,next) => {
        try {
        const cart = await CartModel
        .findById(cid)                
        .populate("products.product")
        .lean()
        let totalAmount = 0; // total de la compra
        const purchasedProducts = []; // Productos comprados
          //  productos que se pueden comprar y actualizar el total
        const unprocessedProducts = cart.products.filter(item => {
        const product = item.product;
        if (product.stock >= item.quantity) {
            ;
              product.stock -= item.quantity; // Actualizar stock
              totalAmount += product.price * item.quantity; // Actualizar  total
              purchasedProducts.push(item);// Agregar productos comprados
              return false; // Producto comprado 
            }  
            return true; // Producto no procesado
        });  

          // Actualizar los stocks 
        await Promise.all(purchasedProducts.map(async item => {

            const produc = await ProductModel.findById(item.product._id)
            produc.stock -= item.quantity;
          }));    
          //  ticket con los datos de la compra
        const ticketData = {
                amount: totalAmount,
                purchaser: user.email,
        };
        const newTicket = await Ticket.create(ticketData);
          // Actualizar el carrito del usuario con los productos no procesados
        if (newTicket) {
            const cartNuevo = await CartModel.findById(cid)
            cartNuevo.products = unprocessedProducts;
            cartNuevo.totalPrice = cart.totalPrice-totalAmount
            await cartNuevo.save()
        }   
        let resultDefinitivo={
          purchasedProducts,
          unprocessedProducts,
          ticket: newTicket
          }
        return resultDefinitivo
        } catch (error) {
        error.where = "persistence";
        return next(error);
        }
    };

    totalToPay = async (tid, next) => {
      try {
        const result=await Ticket.findById(tid)
        const result2=result.amount
        return result2;
      } catch (error) {
        error.where = "persistence";
        return next(error);
      }
    };
}