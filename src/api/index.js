import goodApi from './good';
import cartApi from './cartinf';
import seleCartApi from './selectCart';
import myApi from './myweb';

export const good = goodApi;
export const sele = seleCartApi;
export const cart = cartApi;
export const my = myApi;

export default {
    good: goodApi,
    cart: cartApi,
    sele: seleCartApi,
    my: myApi

}