FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy only package.json files first to leverage Docker cache
COPY package.json ./
COPY client/package.json client/
COPY server/package.json server/

# Install dependencies in a single RUN step
RUN cd client && npm install --omit=dev && cd ../server && npm install --omit=dev

# Copy the rest of the project files and build in one step
COPY client/ client/
COPY server/ server/

RUN cd client && npm run build && cd ../server && npm run build

# Change to non-root user for security
USER node

# Expose the port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "server"]
