export type ZohoContact = {

   "middle_name":string,
   "designation":string,
   "emails":[
       {"is_primary":boolean,"email_id":string},
        {"email_id":string}
   ],
   "birth_year":string,
   "phones":[
       {"number":string,"type":string},
        {"number":string,"type":string}
   ],
   "nick_name":string,
   "first_name":string,
   "birth_month":string,
   "address":[
       {
            "street_addr":string,
            "postal_code":string,
            "street_addr1":string,
            "state":string,
            "type":string,
            "country":string,
            "city":string
       }],
    "job_title":string,
   "company":string,
   "birth_day":string,
   "last_name":string,
   "gender":string,
   "notes":string 
  }

export type ZohoProduct = {
    
}