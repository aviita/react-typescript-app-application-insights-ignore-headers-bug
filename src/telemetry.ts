import {
  ApplicationInsights,
  ITelemetryItem,
} from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.VITE_APP_AI_INSTRUMENTATION_CONNECTION_STRING,
    disableFetchTracking: false,
    //enableRequestHeaderTracking: true, // Enable to get request headers in dependency logs
    enableResponseHeaderTracking: true, // Enable to get response headers in dependency logs
    // BUG: FOLLOWING LINE GIVES ERROR ON BUILD
    // Object literal may only specify known properties, and 'ignoreHeaders' does not exist in type 'IConfiguration & IConfig'.ts(2353)
    ignoreHeaders: [
      "Authorization",
      "X-API-Key",
      "WWW-Authenticate",
      "date",
      "x-ms-blob-type",
      "x-ms-lease-status",
      "x-ms-request-id",
      "x-ms-version",
      "content-type",
      "X-Powered-By",
      "X-Firefox-Spdy",
      "Set-Cookie",
      "Request-Context",
      "Content-Encoding",
      "Access-Control-Allow-Origin",
      "Content-Encoding",
      "Vary",
    ], // Ignore these headers in dependency logs
    disableAjaxTracking: false,
    enableCorsCorrelation: true,
    extensions: [reactPlugin /* debugPluginInstance */],
    extensionConfig: {
      [reactPlugin.identifier]: {
        history,
      },
      /*
        [DebugPlugin.identifier]: {
          trackers: toTrack
        }
        */
    },
  },
});

appInsights.loadAppInsights();
export { reactPlugin, appInsights };
