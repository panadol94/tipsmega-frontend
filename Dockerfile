# Stage 1: Builder
# Use a specific version for stability, matching your local environment roughly if possible
# Tailwind/Lightning CSS ships platform-specific native binaries. Debian's
# glibc build is consistently resolved by npm; Alpine/musl can miss the
# optional native package during a clean Coolify build.
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install dependencies first for caching
COPY package.json package-lock.json ./
RUN npm ci && npm install --no-save @next/swc-linux-x64-gnu@16.1.3

# Copy source code
COPY . .

# Build the project (result goes to /app/out)
RUN npm run build

# Stage 2: Runner (Nginx)
FROM nginx:alpine AS runner

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Clean default Nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy static build output from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
