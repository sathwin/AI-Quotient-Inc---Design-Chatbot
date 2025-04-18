# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Add nginx configuration for SPA routing
RUN echo 'server {                                               \
    listen 80;                                                  \
    location / {                                                \
        root /usr/share/nginx/html;                             \
        index index.html;                                       \
        try_files $uri $uri/ /index.html;                       \
    }                                                           \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]