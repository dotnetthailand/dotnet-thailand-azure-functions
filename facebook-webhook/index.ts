import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  // Parse the query params
  // https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup/
  const mode = req.query['hub_mode'] ?? '';
  const token = req.query['hub_verify_token'] ?? '';
  const challenge = req.query['hub.challenge'] ?? '';
  console.log(`mode: ${mode}, token: ${token}, challenge: ${challenge}`);
  context.log(`body: ${req.body}`);


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


  // https://github.com/Azure/azure-functions-nodejs-worker/blob/v2.x/src/http/Response.ts#L8
  context.res = {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    statusCode: 200,
    body: challenge // We need to send challenge back unless it won't pass Facebook verification when we add callback URL.
  };

};

export default httpTrigger;
