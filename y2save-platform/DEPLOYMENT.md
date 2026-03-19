# Y2Save Deployment Guide

Complete guide for deploying Y2Save to production environments.

## Table of Contents
1. [Pre-requisites](#pre-requisites)
2. [Local Testing](#local-testing)
3. [Docker Deployment](#docker-deployment)
4. [Kubernetes Deployment](#kubernetes-deployment)
5. [Cloud Providers](#cloud-providers)
6. [Environment Configuration](#environment-configuration)
7. [Database Setup](#database-setup)
8. [Security Checklist](#security-checklist)
9. [Monitoring & Logging](#monitoring--logging)
10. [Scaling](#scaling)

## Pre-requisites

- Docker & Docker Compose installed
- kubectl installed (for Kubernetes)
- AWS CLI (if using AWS)
- Domain name for production
- SSL/TLS certificate
- PostgreSQL database access
- Redis instance access

## Local Testing

### Using Docker Compose

```bash
# Navigate to project root
cd y2save-platform

# Create environment file
cp .env.example .env

# Start all services
docker-compose -f docker/docker-compose.yml up -d

# Check services are running
docker-compose -f docker/docker-compose.yml ps

# View logs
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml logs -f frontend

# Stop services
docker-compose -f docker/docker-compose.yml down
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: localhost:5432
- Redis: localhost:6379

## Docker Deployment

### Build Docker Images

```bash
# Build backend image
docker build -f docker/Dockerfile.backend -t y2save-backend:1.0.0 .

# Build frontend image
docker build -f docker/Dockerfile.frontend -t y2save-frontend:1.0.0 .

# Tag for registry (e.g., Docker Hub)
docker tag y2save-backend:1.0.0 yourname/y2save-backend:1.0.0
docker tag y2save-frontend:1.0.0 yourname/y2save-frontend:1.0.0

# Push to registry
docker push yourname/y2save-backend:1.0.0
docker push yourname/y2save-frontend:1.0.0
```

### Run Containers

```bash
# Run backend
docker run -d \
  --name y2save-backend \
  -p 3001:3001 \
  --env-file .env \
  y2save-backend:1.0.0

# Run frontend
docker run -d \
  --name y2save-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://api.example.com/api/v1 \
  y2save-frontend:1.0.0
```

### Docker Compose for Production

```yaml
# Production docker-compose.yml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  backend:
    image: y2save-backend:1.0.0
    depends_on:
      - database
      - redis
    environment:
      NODE_ENV: production
      PORT: 3001
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: y2save-frontend:1.0.0
    environment:
      NEXT_PUBLIC_API_URL: https://api.example.com/api/v1
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  redis_data:
```

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster running (EKS, GKE, AKS, etc.)
- kubectl configured
- Container images pushed to registry

### Create Namespace

```bash
kubectl create namespace y2save
kubectl config set-context --current --namespace=y2save
```

### Create Secrets

```bash
# Database credentials
kubectl create secret generic y2save-secrets \
  --from-literal=database-url=postgresql://user:pass@db:5432/y2save \
  --from-literal=jwt-secret=your-secret-key \
  --from-literal=redis-url=redis://redis:6379

# Docker registry (if using private registry)
kubectl create secret docker-registry regcred \
  --docker-server=docker.io \
  --docker-username=myusername \
  --docker-password=mypassword
```

### Deploy Services

```bash
# Apply all manifests
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml

# Check deployment status
kubectl get deployment
kubectl get pods
kubectl get service
kubectl get ingress
```

### Verify Deployment

```bash
# Check if pods are running
kubectl get pods -w

# View pod logs
kubectl logs -f deployment/y2save-backend

# Describe deployment
kubectl describe deployment y2save-backend

# Check service IP
kubectl get service backend-service
```

### Scaling

```bash
# Scale backend pods
kubectl scale deployment y2save-backend --replicas=3

# Auto-scaling (HPA)
kubectl autoscale deployment y2save-backend --min=2 --max=10 --cpu-percent=80
```

## Cloud Providers

### AWS Deployment

#### Using ECS & RDS

1. **Create RDS PostgreSQL Instance**
```bash
aws rds create-db-instance \
  --db-instance-identifier y2save-db \
  --db-instance-class db.t3.small \
  --engine postgres \
  --master-username admin \
  --master-user-password SecurePass123!
```

2. **Create ElastiCache Redis Cluster**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id y2save-redis \
  --engine redis \
  --cache-node-type cache.t3.micro
```

3. **Push Images to ECR**
```bash
aws ecr create-repository --repository-name y2save-backend
aws ecr create-repository --repository-name y2save-frontend

docker push {account}.dkr.ecr.{region}.amazonaws.com/y2save-backend:1.0.0
docker push {account}.dkr.ecr.{region}.amazonaws.com/y2save-frontend:1.0.0
```

4. **Create ECS Task Definition & Service**
```bash
# Update ecs-task-definition.json with your values
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json
aws ecs create-service --cluster y2save --service-name backend --task-definition y2save-backend
```

#### Using Elastic Beanstalk

```bash
eb init -p docker y2save
eb create y2save-env
eb deploy
```

### Heroku Deployment

```bash
heroku create y2save
heroku stack:set container
heroku addons:create heroku-postgresql:standard-0
heroku addons:create heroku-redis:premium-0
git push heroku main
heroku logs -t
```

### Google Cloud Run & Cloud SQL

```bash
# Build and deploy to Cloud Run
gcloud run deploy y2save-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Connect to Cloud SQL
gcloud sql connect y2save-db
```

## Environment Configuration

### Production .env

```env
# Server
NODE_ENV=production
PORT=3001
API_URL=https://api.y2save.com

# Database (use managed service)
DATABASE_URL=postgresql://admin:SecurePass123@rds.amazonaws.com:5432/y2save

# Redis (use managed service)
REDIS_URL=redis://:password@elasticache.amazonaws.com:6379

# Authentication (generate strong secret)
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRY=7d

# Video Processing
YTDLP_PATH=/usr/local/bin/yt-dlp
TEMP_STORAGE_PATH=/var/downloads
MAX_FILE_SIZE=1073741824
DOWNLOAD_EXPIRY=3600

# AWS S3 for file storage
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=y2save-downloads
AWS_REGION=us-east-1

# Rate Limiting
RATE_LIMIT_WINDOW=3600000
RATE_LIMIT_FREE=10
RATE_LIMIT_PREMIUM=100

# Payment Processing
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CORS
CORS_ORIGIN=https://y2save.com

# Frontend
NEXT_PUBLIC_API_URL=https://api.y2save.com/api/v1
NEXT_PUBLIC_AD_NETWORK_ID=ca-pub-...
```

## Database Setup

### Initial Schema

```bash
# Connect to database
psql postgresql://user:password@host:5432/y2save

# Run migration
\i migrations/001_initial_schema.sql

# Verify tables
\dt
```

### Backups

```bash
# Create backup
pg_dump postgresql://user:pass@host:5432/y2save > backup.sql

# Restore backup
psql postgresql://user:pass@host:5432/y2save < backup.sql

# Automated daily backup
0 2 * * * pg_dump postgresql://user:pass@host:5432/y2save | gzip > /backups/y2save-$(date +\%Y\%m\%d).sql.gz
```

## Security Checklist

### Before Going Live

- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET
- [ ] Enable HTTPS/TLS with valid certificate
- [ ] Configure CORS to specific domain only
- [ ] Set up firewall rules
- [ ] Enable database encryption at rest
- [ ] Enable Redis authentication
- [ ] Set up rate limiting thresholds
- [ ] Configure WAF (Web Application Firewall)
- [ ] Set up DDoS protection
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerting
- [ ] Enable audit logging
- [ ] Configure email for notifications
- [ ] Set up SSL certificate auto-renewal
- [ ] Review and harden security groups
- [ ] Implement API key authentication for admin endpoints
- [ ] Set up content security headers
- [ ] Enable CORS properly
- [ ] Disable debug mode in production

### Security Headers

```nginx
# nginx.conf
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## Monitoring & Logging

### Cloud Monitoring

```bash
# AWS CloudWatch
aws logs create-log-group --log-group-name /y2save/backend
aws logs create-log-group --log-group-name /y2save/frontend

# View logs
aws logs tail /y2save/backend --follow
```

### Application Monitoring

```bash
# Using Prometheus and Grafana
docker run -d --name prometheus prom/prometheus -config.file=/etc/prometheus/prometheus.yml
docker run -d --name grafana grafana/grafana
```

### Error Tracking

```bash
# Configure Sentry
npm install @sentry/node
```

### Metrics to Monitor

- API response times
- Error rates
- Database connection pool usage
- Redis memory usage
- CPU and memory usage
- Request rate and latency
- Queue depth
- File storage usage
- Download success rate
- User registration rate

## Scaling

### Horizontal Scaling

```bash
# Load balance multiple backend instances
nginx upstream backend {
  server backend1:3001;
  server backend2:3001;
  server backend3:3001;
}
```

### Database Scaling

```bash
# Enable read replicas
aws rds create-db-instance-read-replica \
  --db-instance-identifier y2save-db-replica \
  --source-db-instance-identifier y2save-db
```

### Caching Strategy

- Cache video info for 1 hour
- Cache user profiles for 30 minutes
- Implement cache invalidation on updates
- Use Redis for session storage

## Rollback Procedure

```bash
# If deployment fails, rollback
kubectl rollout undo deployment/y2save-backend
kubectl rollout history deployment/y2save-backend
kubectl rollout undo deployment/y2save-backend --to-revision=2

# Docker compose
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d
```

## Cost Optimization

- Use auto-scaling to match demand
- Use spot instances for non-critical workloads
- Optimize storage with lifecycle policies
- Use CDN for static assets
- Implement efficient caching strategies
- Monitor and optimize database queries

## Support & Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check database status
aws rds describe-db-instances --db-instance-identifier y2save-db

# Check connection string
echo $DATABASE_URL
```

**Redis Connection Error**
```bash
# Check Redis cluster status
aws elasticache describe-cache-clusters
redis-cli ping
```

**High CPU Usage**
```bash
# Check running processes
top
# Check pod resources
kubectl top pods
```

---

**Last Updated**: March 2024  
**Questions?** See main [README.md](../README.md) or contact support
