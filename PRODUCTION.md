# Production Deployment

This document describes how to deploy the Vue.js application in production using Docker.

## Files Created

- `Dockerfile.prod` - Multi-stage production Dockerfile
- `docker-compose.prod.yml` - Production Docker Compose configuration
- `nginx.prod.conf` - Nginx configuration for production serving

## Quick Start

1. **Build and run the production container:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost:9008`

## Production Features

### Dockerfile.prod
- **Multi-stage build**: Optimized for production with separate build and runtime stages
- **Nginx serving**: Uses nginx:alpine for efficient static file serving
- **Port 9008**: Configured to run on port 9008 as requested

### docker-compose.prod.yml
- **Health checks**: Built-in health monitoring
- **Restart policy**: Automatically restarts on failure
- **Production environment**: NODE_ENV=production

### nginx.prod.conf
- **SPA routing**: Properly handles Vue.js client-side routing
- **Static asset caching**: 1-year cache for static files
- **Gzip compression**: Reduces bandwidth usage
- **Security headers**: Basic security headers included
- **Health endpoint**: `/health` endpoint for monitoring

## Commands

### Build and run
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Run in background
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### Stop services
```bash
docker-compose -f docker-compose.prod.yml down
```

### View logs
```bash
docker-compose -f docker-compose.prod.yml logs -f
```

### Health check
```bash
curl http://localhost:9008/health
```

## Environment Variables

You can customize the deployment by adding environment variables to the docker-compose.prod.yml file:

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://your-api.com
  # Add other environment variables as needed
```

## Notes

- The application will be available at `http://localhost:9008`
- Static assets are cached for 1 year for optimal performance
- The container includes health checks for monitoring
- All Vue.js routes are properly handled for SPA functionality
