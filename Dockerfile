# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:prod"]
