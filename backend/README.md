# Meadarchive backend set up

## Pre-Setup

### Clone the repository
```bash
git clone git@github.com:Meadarchive/meadarchive.git
```

```bash
cd meadarchive/backend
```
<br>

### Generate `.env` file
The code requires a `.env` for some configurations. The file is not commited to git. To document the values required and to simplify the genration process, a generation script exists. The script defualts to dev mode


### Download credential file from firebase
Authentication with firebase is done useing a credentials.json file. Download the file from the firebase console and place it in `/etc/meadarchive/firebase-creds.json`. This is default path and its set in the `.env` file. If you wish to change the path, you will need to change the `FIREBASE_CREDS_PATH` variable in the `.env` file.

<br>

## Deploying manually

### Install node 18
```bash
sudo apt update
```

```bash
sudo apt install -y curl
```

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```
The code was developed with node 18. Higher node version will most likely work as well. 

**Note:** By default there is an apt package called `node` however it is node 12 and will not work.


```bash
npm run gen-env
```

Or
  
```bash
npm run gen-env-prod
```

<br>

### Install dependencies
```bash
npm install
```

```bash
sudo npm install ts-node -g
```

<br>

### Check that the configured ports are open in the firewall (defaults in example)
```bash
sudo ufw allow 5080
sudo ufw allow 5443
```

