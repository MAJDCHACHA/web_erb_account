import rateLimit from 'express-rate-limit';
const ratelimiterLogin=rateLimit({
    windowMs: 1* 60 * 1000,
    max: 10,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});
const get_data=rateLimit({
    windowMs:5*60*100,
    max:100,
    message:{error:'Too many requests, Please try again later.'},
    standardHeaders: true,
    legacyHeaders: false,
})
export default {ratelimiterLogin,get_data};