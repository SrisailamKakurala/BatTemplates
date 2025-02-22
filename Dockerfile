# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy project files
COPY . .

# Build the Vite app
RUN npm run build

# Production stage (Using a lightweight static server)
FROM node:20-alpine

# Install a lightweight static file server
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/dist /app

# Expose the port where the Vite app will run
EXPOSE 4173

# Start the Vite app using 'serve'
CMD ["serve", "-s", "-l", "4173", "/app"]
