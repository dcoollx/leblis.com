import express, { Request, Response } from 'express';
import { handler } from '../index.js';
import { 
  APIGatewayProxyEventV2WithRequestContext, 
  APIGatewayEventRequestContextV2 
} from 'aws-lambda';
import dotenv from 'dotenv';


dotenv.config({path: '../../.env'})

const app = express();
app.use(express.json());

app.get('/products', (req, res)=>{
  return res.header( 'Access-Control-Allow-Origin', '*', ).header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT',).status(200).send([
    {
        "Product_Name": "Pink Sugar",
        "Image": "https://plus.unsplash.com/premium_photo-1675855748166-a66d26c3b6da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGluayUyMHN1Z2FyfGVufDB8fDB8fHww",
        "Unit_Price": 5,
        "Description": "2 Oz",
        Inventory: 1,
        "id": "7374418000000609049"
    }
])
})

app.all(/.*/, async (req: Request, res: Response) => {
  // Construct the V2 Event structure
  const event: Partial<APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>> = {
    version: "2.0",
    routeKey: "$default",
    rawPath: req.path,
    rawQueryString: new URLSearchParams(req.query as any).toString(),
    headers: req.headers as Record<string, string>,
    queryStringParameters: req.query as Record<string, string>,
    body: JSON.stringify(req.body),
    isBase64Encoded: false,
    requestContext: {
      http: {
        method: req.method,
        path: req.path,
        protocol: "HTTP/1.1",
        sourceIp: req.ip ?? "127.0.0.1",
        userAgent: req.get('user-agent') ?? "postman",
      },
      // Mocked context fields
      accountId: "123456789012",
      apiId: "local-api",
      domainName: "localhost",
      domainPrefix: "localhost",
      requestId: `req-${Date.now()}`,
      routeKey: "$default",
      stage: "$default",
      time: new Date().toISOString(),
      timeEpoch: Date.now(),
    } as APIGatewayEventRequestContextV2,
  };

  try {
    // Cast to the full type for the handler
    const result = await handler(
      event as APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>, 
      {} as any,
      console.log
    );

    // V2 handlers can return a string or an object with statusCode
    if (typeof result === 'string') {
      res.status(200).send(result);
    } else {
      res.status(result?.statusCode || 200)
         .set(result?.headers || {})
         .send(result?.body);
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 API Gateway V2 Bridge running at http://localhost:3000'));
