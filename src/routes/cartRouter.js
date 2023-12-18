import { Router } from 'express';
import { createCart, deleteCart,addProductToCart,getAllCarts,addProductToCartLoggedIn, getCart, updateCart,deleteProductFromCart } from "../controllers/carts.controller.js";
import isUserOrPremium from "../middlewares/isUserOrPremium.js";
import isUser from "../middlewares/isUser.js";
const router = Router();

cartRouter.get('/', CartController.GetAllCarts)

cartRouter.get('/:cid',userOrPremium, CartController.returnOwnerCart)

cartRouter.post('/',userOrPremium, CartController.CreateCart)


cartRouter.delete("/:cid/product/:pid",userOrPremium, CartController.DeleteProductById);

cartRouter.delete("/:cid", CartController.DeleteCartById);

cartRouter.put("/:cid",userOrPremium, CartController.ModifyProductInCart);

cartRouter.put("/:cid/product/:pid", CartController.UpdateQuantity);
//restriccion solo usuario puede agregar productos
cartRouter.post('/:cid/product/:pid',userOrPremium, CartController.AddProductToCart)

cartRouter.get('/:cid/purchase', CartController.purchaseCart);



export default router