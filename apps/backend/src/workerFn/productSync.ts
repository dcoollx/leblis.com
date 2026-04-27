import zoho from './../zoho'
import { DynamoDBClient, } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME!;


export const SyncProducts = async () => {
  console.log("Starting Zoho → DynamoDB sync ");

  try {
    const accessToken = await zoho.getAccessToken();
    const bearerToken = `Zoho-oauthtoken ${accessToken}`;
    const fields = keys

    const url =
      "https://www.zohoapis.com/bigin/v2/Products?per_page=200&fields=id,Product_Name,Unit_Price,Description,Image,Size,Product_Category";

    console.log("Fetching Zoho products ...");

    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: bearerToken },
    });

    // If Zoho returns an error, log the body
    if (!res.ok) {
      const body = await res.text();
      console.error(`Zoho error (HTTP ${res.status}):`, body);
      throw new Error(`Zoho returned ${res.status}`);
    }

    let json: any;
    try {
      json = await res.json();
    } catch (err) {
      console.error("Failed to parse Zoho JSON:");
      throw err;
    }

    if (!json.data || json.data.length === 0) {
      console.log("Zoho returned no products");
      return; 
    }

    console.log(`Fetched ${json.data.length} products from Zoho`);

    // Insert into DynamoDB
    for (const product of json.data) {
      if (!product.id) {
        console.error("Skipping product with missing id:", product);
        continue;
      }

      try {
        await dynamodb.send(
          new PutCommand({
            TableName: tableName,
            Item: product,
          })
        );
      } catch (err) {
        console.error("DynamoDB write failed for product:", product.id, err);
        throw err;
      }
    }

    console.log("Sync completed successfully");
    return;
  } catch (error: any) {
    console.error("Sync failed:", error);

    if (error instanceof Response) {
      const body = await error.text();
      console.error("Zoho error body:", body);
    }

    return;
  }
};
