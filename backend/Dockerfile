FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

WORKDIR /meadarchive

RUN echo $HOME

COPY . .

# Install node
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get install -y nodejs

# Install dependencies
RUN npm install
RUN npm install -g ts-node

# Run the app
CMD ["bash", "-c", "source .env && ts-node app.ts"]


