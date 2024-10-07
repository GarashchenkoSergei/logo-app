# Stage 1: Build the NestJS app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Run the NestJS app
FROM node:18-alpine AS runner

WORKDIR /app

# Install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production

# Copy the built app from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3001 (or your backend port)
EXPOSE 3001

# Start the NestJS app
CMD ["node", "dist/main"]
