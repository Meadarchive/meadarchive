# prerequisites
.env file with
```
VITE_FIREBASE_API_KEY="<api_key>"
VITE_FIREBASE_AUTH_DOMAIN="<auth_domain>"
VITE_FIREBASE_PROJECT_ID="<project_id>"
VITE_FIREBASE_STORAGE_BUCKET="<storage_bucket>"
VITE_FIREBASE_MESSAGING_SENDER_ID="<messaging_sender_id>"
VITE_FIREBASE_APP_ID="<app_id>"
VITE_SERVER_URL="<server_url>"
FRONTEND_PORT="<frontend_port>"
```

# quickstart for dev server
```
npm i
npm run dev
```

# quickstart for hosting on port 4000 (change to whatever)
```
npm i
npm run build
npx serve -s dist -l 4000
```

# run tests
```
npm i
npm test
```
