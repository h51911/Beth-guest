import goodApi from './good';
import cartApi from './cartinf';
import seleCartApi from './selectCart';

export const good = goodApi;
export const sele = seleCartApi;
export const cart = cartApi;

export default {
    good: goodApi,
    cart: cartApi,
    sele: seleCartApi

}