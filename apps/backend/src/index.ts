import {  APIGatewayProxyEventV2, APIGatewayProxyHandlerV2, APIGatewayProxyResult, Context,  } from 'aws-lambda';
import { getAccessToken, HTTPMethods, respond } from './utils';
import { handler as stripeHander } from './stripeHandler';
import { productsHandler } from './productsHandler';
import { contactHandler } from './contactsHandler';


export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  
  const {method, path } = event.requestContext.http;
  if(method === 'OPTIONS'){
    return respond(200, { message: 'OK' });
  }
  await stripeHander(event, context);
  
  
  if(path === '/products'){
    await productsHandler(event, context, method as HTTPMethods)
  }
  
  if(path === '/contacts'){
    await contactHandler(event, context, method as HTTPMethods)
  }

  return respond(404, { message: 'Not Found' });
  
}

