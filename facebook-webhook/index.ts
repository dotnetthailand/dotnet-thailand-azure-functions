import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  // Parse the query params
  const mode = req.query['hub_mode'] ?? '';
  const token = req.query['hub_verify_token'] ?? '';
  const challenge = req.query['hub_challenge'] ?? '';
  console.log(`mode: ${mode}, token: ${token}, challenge: ${challenge}`);

  context.log(`body: ${req.body}`);

  context.res = {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode : 204 // No Content
  };

};

export default httpTrigger;
