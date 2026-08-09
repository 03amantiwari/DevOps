# =========================================================================
#  STAGE 1 — BUILD
FROM node:20-alpine AS build

WORKDIR /app


ARG VITE_API_URL=http://localhost:8080/api/v1
ENV VITE_API_URL=$VITE_API_URL


COPY package.json package-lock.json ./
RUN npm ci


COPY . .
RUN npm run build

# =========================================================================
#  STAGE 2 — SERVE
# =========================================================================
FROM nginx:1.27-alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Nginx serves on port 80 inside the container.
EXPOSE 80


# Simple healthcheck so Swarm knows the container is alive.
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
 
CMD ["nginx", "-g", "daemon off;"]