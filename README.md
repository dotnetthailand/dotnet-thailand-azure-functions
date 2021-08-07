# dotnet-thailand-azure-functions

## Learn this project
- Please read [Azure Functions content on .NET Thailand website](https://www.dotnetthailand.com/cloud-hosting/azure/azure-functions).

## Learn how to deploy to GitHub Actions
- Please read [Deploy Node.js app to Azure Functions content on .NET Thailand website](https://www.dotnetthailand.com/programming-cookbook/github-actions/deploy-node-js-app-to-azure-functions).

## Test project locally
- Run:
```sh
$ yarn start
```

# Example of FB request body
```json
 {
   "field": "plugin_comment",
   "value": {
     "created_time": "2021-08-03T09:44:47+0000",
     "message": "Test Comment",
     "from": {
       "name": "Test User",
       "id": "4444444444"
     },
     "id": "4444444444_4444444444"
   }
 }

 reply comment
 {
   "field": "plugin_comment_reply",
   "value": {
     "created_time": "2021-08-03T09:46:10+0000",
     "message": "Test Comment",
     "from": {
       "name": "Test User",
       "id": "4444444444"
     },
     "id": "4444444444_4444444444",
     "parent": {
       "created_time": "2021-07-22T19:59:30+0000",
       "message": "Test Parent Comment",
       "from": {
         "name": "Test User 1",
         "id": "4444444444"
       },
       "id": "4444444444_44444444"
     }
   }
 }
```
