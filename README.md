## How to deploy with docker compose
This project consists of two seperate componets, the backend and the frontend. This section will cover how to deploy both componets using docker compose. However more details about manual deployment can be found in the README.md files in the backend and frontend directories.

### Install docker and docker compose
Install instructions can be found here: https://docs.docker.com/engine/install/

### Clone the repository
```bash
git clone git@github.com:Meadarchive/meadarchive.git
```

### Generate `.env` file
Both backend and frontend require a `.env` file for some configurations. The file is not commited to git. For backend a script to generate the file exists. For frontend the file please refer to the README.md in the frontend directory.

```bash
cd backend
```

```bash
npm run gen-env
```

Or

```bash
npm run gen-env-prod
```

### Download credential file from firebase
Authentication with firebase is done useing a credentials.json file. Download the file from the firebase console and place it in `/etc/meadarchive/firebase-creds.json`. This is default path and its set in the `.env` file. If you wish to change the path, you will need to change the `FIREBASE_CREDS_PATH` variable in the `.env` file.

<br>

### Deploying using docker compose
Due to the structure of the project and the way env vars are used to configure the behaviour of different components, a wrapper for docker compose was created. 

Instead of `docker compose <command>` use `./dc <command>` from the root of the project.

### Start all services
```bash
./dc up -d
```

### Stop all services
```bash
./dc down
```

### Start a specific service
```bash
./dc up -d <service>
```

### Restart a specific service
```bash
./dc restart <service>
```

### Rebuild a specific service
```bash
./dc up -d --build <service>
```

For more information refer to the offcial docker & docker compose documentation.




