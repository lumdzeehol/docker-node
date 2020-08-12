FROM cusspvz/node 

# Create app directory
WORKDIR /data/code/docker-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10087

CMD ["node", "app.js"]
