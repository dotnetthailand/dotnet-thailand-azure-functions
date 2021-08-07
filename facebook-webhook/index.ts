import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  // Parse the query params
  // https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup/
  const mode = req.query['hub_mode'] ?? '';
  const token = req.query['hub_verify_token'] ?? '';
  const challenge = req.query['hub.challenge'] ?? '';
  context.log(`mode: ${mode}, token: ${token}, challenge: ${challenge}`);
  context.log(`body: ${req.body}`);
  context.log(`body: ${JSON.stringify(req.body, null, 2)}`);

  // comment
  // {
  //   "field": "plugin_comment",
  //   "value": {
  //     "created_time": "2021-08-03T09:44:47+0000",
  //     "message": "Test Comment",
  //     "from": {
  //       "name": "Test User",
  //       "id": "4444444444"
  //     },
  //     "id": "4444444444_4444444444"
  //   }
  // }

  // reply comment
  // {
  //   "field": "plugin_comment_reply",
  //   "value": {
  //     "created_time": "2021-08-03T09:46:10+0000",
  //     "message": "Test Comment",
  //     "from": {
  //       "name": "Test User",
  //       "id": "4444444444"
  //     },
  //     "id": "4444444444_4444444444",
  //     "parent": {
  //       "created_time": "2021-07-22T19:59:30+0000",
  //       "message": "Test Parent Comment",
  //       "from": {
  //         "name": "Test User 1",
  //         "id": "4444444444"
  //       },
  //       "id": "4444444444_44444444"
  //     }
  //   }
  // }


  // Event value must be numeric.
  try {
    const response = await trackEvent(
      'Comment',
      'Create',
      '',
      100
    );
    context.log(JSON.stringify(response.data, null, 2));
    // https://github.com/Azure/azure-functions-nodejs-worker/blob/v2.x/src/http/Response.ts#L8
    context.res = {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
      statusCode: 200,
      body: challenge // We need to send challenge back unless it won't pass Facebook verification when we add callback URL.
    };

  } catch (error) {
    // This sample treats an event tracking error as a fatal error. Depending
    // on your application's needs, failing to track an event may not be
    // considered an error.
    context.log(error);
    context.res = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      statusCode: 500,
      body: error
    };
  }

};

function trackEvent(category: string, action: string, label: string, value: number) {

  // The following environment variable is set by app.yaml when running on App
  // Engine, but will need to be set manually when running locally. See README.md.
  const { UA_TRACKING_ID } = process.env;
  console.log(`UA_TRACKING_ID ${UA_TRACKING_ID}`);

  const data: Record<string, string> = {
    // API Version.
    // https://www.youtube.com/watch?v=jRmb0jMNUKU We need UA
    v: '1', // https://www.simoahava.com/analytics/implementation-guide-events-google-analytics-4/
    // Tracking ID / Property ID.
    tid: UA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: uuidv4(),
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value.toString(),
    ua: 'azure-functions'
  };

  const config = {
    headers: {
      // We need to use form-url encode https://github.com/openiddict/openiddict-core/issues/437
      // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };


  // For debugging your requests you can use this URL:
  // /debug/collect
  // instead of
  // /collect
  // In response body you will see details.
  return axios.post('https://www.google-analytics.com/collect', new URLSearchParams(data), config);
};

export default httpTrigger;
