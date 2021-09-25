import Commerce from '@chec/commerce.js';

// export const commerce = new Commerce('pk_test_19661763baf3194382812193e2e539617b1870f41d8b9', true);
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
