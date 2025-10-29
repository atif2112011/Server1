# Running the Application with Docker

This guide explains how to build and run the application using Docker.

## Steps

1. **Build the Docker Image**

   From the root directory of the project, run:
   ```bash
   npm run build-image
This command will build the Docker image and export it as a .tar file (e.g., myapp.tar).

Prepare Deployment Files

2. **Copy myapp.tar and docker-compose.yml into a new folder (for example, deploy/):**
   

Inside the new folder, load the image into Docker:

  ```bash
docker load -i myapp.tar
```

Use Docker Compose to start the application:


```bash
docker-compose up -d
```
This will start all required containers in detached mode.Your Application will be available on localhost:5000

3. **Stopping the application:**
To stop and remove containers:
```bash
docker-compose down
```

