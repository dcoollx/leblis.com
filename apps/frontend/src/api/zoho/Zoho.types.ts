export interface ZohoContact {
			"Owner": {
				"id": string
			},
			"Account_Name": {
				"id": string
			},
			"First_Name": string,
			"Last_Name": string,
			"Title": string,
			"Email": string,
			"Mobile": string,
			"Email_Opt_Out": boolean,
			"Tag": [
				{
					"name": string
				}
			],
			"Description": string,
			"Mailing_Street": string,
			"Mailing_City": string,
			"Mailing_State": string,
			"Mailing_Country": string,
			"Mailing_Zip": string
}

export interface ZohoProduct {
	Image: string
    Product_Name: string,
    Product_Code?: string,
    Description: string,
    Unit_Price: number,
	id: string,
	Size: number,
	Full_Description?: string,
	Quantity_in_Stock: number
}