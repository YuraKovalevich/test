import DataDate from './pages/СurrencyDataDate'
import RateDate from './pages/СurrencyRateTrends'
import { DATA_DATE_ROUTE, RATE_DATE_ROUTER } from './utils/consts'

export const appRoutes = [
    {
        path: DATA_DATE_ROUTE,
        Component: DataDate
    },
    {
        path: RATE_DATE_ROUTER,
        Component: RateDate
    },

]