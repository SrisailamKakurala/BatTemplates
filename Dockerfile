# Step 1: Use an official Node.js image as the base
FROM node:18-alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy source code
COPY . .

# Step 5: Build the application
RUN npm run build

# Step 6: Use Nginx for serving
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Step 7: Expose port
EXPOSE 80

# Step 8: Start the server
CMD ["nginx", "-g", "daemon off;"]
