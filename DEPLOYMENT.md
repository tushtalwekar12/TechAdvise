# Deployment Guide for TechAdvise

## Issue: "Failed to fetch dashboard stats" Error

The error occurs because the frontend is trying to call the backend API using `localhost:5000` when deployed, but the backend is not available at that URL in production.

## Solutions

### Option 1: Set Environment Variables (Recommended)

1. **For Render.com deployment:**

   - Go to your frontend service dashboard
   - Navigate to "Environment" tab
   - Add environment variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-domain.com` (replace with your actual backend URL)

2. **For other platforms:**
   - Set the `VITE_API_URL` environment variable to your backend API URL
   - Example: `https://api.techadvise.in` or `https://your-backend-service.onrender.com`

### Option 2: Update render.yaml (Already done)

The `render.yaml` file has been updated to include the environment variable. You need to:

1. Replace `https://your-backend-domain.com` with your actual backend URL
2. Redeploy the frontend

### Option 3: Backend Deployment

If your backend is not deployed yet, you need to deploy it first:

1. **Deploy backend to a platform like Render, Railway, or Heroku**
2. **Update the frontend's `VITE_API_URL` to point to your deployed backend**

### Option 4: Same Domain Deployment

If you want to serve both frontend and backend from the same domain:

1. **Deploy backend first**
2. **Update frontend's `VITE_API_URL` to use relative URLs or the same domain**
3. **Configure your server to serve the frontend static files**

## Current Configuration

The frontend is now configured to:

- Use `VITE_API_URL` if set
- Fall back to `localhost:5000` in development
- Use the same domain in production (if backend is on same domain)

## Testing

After making changes:

1. Clear browser cache
2. Check browser console for any errors
3. Verify that API calls are going to the correct URL

## Common Issues

1. **CORS errors**: Make sure your backend allows requests from your frontend domain
2. **SSL/HTTPS**: Ensure both frontend and backend use HTTPS in production
3. **Environment variables**: Make sure they are set correctly in your deployment platform
