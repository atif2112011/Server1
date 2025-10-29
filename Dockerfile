# # Stage 1: Build frontend
# FROM node:18 AS build
# WORKDIR /app
# COPY frontend ./frontend
# WORKDIR /app/frontend
# RUN npm install && npm run build

# # Stage 2: Setup backend
# FROM node:18
# WORKDIR /app
# COPY backend ./backend
# COPY --from=build /app/frontend/dist ./frontend/dist
# WORKDIR /app/backend
# RUN npm install

# ENV NODE_ENV=production
# EXPOSE 5000

# CMD ["npm", "start"]


#----------------------------------------------------------------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------------------------------------------------------------


# new Code for obfuscated server
# Stage 1: Use a minimal, secure base image
# We still use 'debian' because your binary from 'pkg' has Node.js built-in.
FROM debian:bullseye-slim

# Set the root working directory for our app inside the container
WORKDIR /app

# 1. Copy your *protected* frontend build
# This copies your local './frontend/dist' to '/app/frontend/dist'
# This creates the exact path structure your server expects.
COPY ./frontend/dist ./frontend/dist

# 2. Copy your *protected* backend binaries
# This copies your local './backend/dist' to '/app/backend/dist'
# This also matches the expected path structure.
COPY ./backend/dist ./backend/dist

# 3. Make the backend binary executable
# We use the path *inside the container*
RUN chmod +x ./backend/dist/my-app-linux

# Set your production environment vars
ENV NODE_ENV=production
ENV PORT=5000

# 4. (Security Best Practice) Create and use a non-root user
RUN useradd -m appuser
USER appuser

# Expose the port your app listens on
EXPOSE 5000

# 5. Run the binary from its new location
# This command is relative to the WORKDIR '/app'
CMD ["./backend/dist/my-app-linux"]
