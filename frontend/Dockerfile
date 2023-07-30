FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

WORKDIR /meadarchive

COPY . .

# Install node
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get install -y nodejs

# Install dependencies
RUN npm install

# Build
RUN npm run build


# Run the app
CMD ["npx", "serve", "-s", "build", "-l", "4443"]


