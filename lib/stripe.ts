import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    // 替换为你的 Stripe 公钥（测试环境用 pk_test_，生产环境用 pk_live_）
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here';
    stripePromise = loadStripe(stripePublicKey);
  }
  return stripePromise;
};
