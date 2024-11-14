# Use the official Node.js image as the base image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app (this will create the /app/dist folder)
RUN npm run build

# Use the official Nginx image to serve the build
FROM nginx:alpine

# Remove default Nginx configuration (optional)
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration file (optional)
COPY nginx.conf /etc/nginx/conf.d

# Copy the dist output from the previous stage to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
