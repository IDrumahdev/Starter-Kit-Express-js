
import { rateLimit } from 'express-rate-limit';

const limitRate = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 60
})

export default limitRate;