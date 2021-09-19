
import ReactGA from 'react-ga'

const googleAnalyticsActions = {}

googleAnalyticsActions.initGoogleAnalytics = async (key) => {
    ReactGA.initialize(key)
    ReactGA.pageview(window.location.pathname + window.location.search)
}
export {googleAnalyticsActions}