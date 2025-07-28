# TechAdvise Deployment Guide

## Render Deployment Instructions (Recommended)

### Prerequisites

1. MongoDB Atlas database
2. Render account
3. GitHub repository with your code

### Environment Variables Required (Set in Render Dashboard)

- `NODE_ENV`: production
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT tokens
- `PORT`: 10000 (Render will override this)
- `VITE_API_URL`: Your backend service URL (e.g., https://techadvise-backend.onrender.com)

### Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new **Web Service**
3. Set the following:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (root of repo)
4. Add environment variables in Render dashboard
5. Deploy

> **Note:** The backend will serve the frontend build in production. You only need to deploy the backend service. The frontend will be accessible from the same URL as your backend.

### Important Notes

1. **Footer Links**: The footer links should work correctly after deployment. If they don't:

   - Check that your backend is serving the frontend files correctly
   - Ensure the `NODE_ENV` is set to 'production'
   - Verify that the frontend build is in the correct location

2. **CORS Issues**: If you encounter CORS issues:

   - The backend is configured to allow all origins in production
   - Make sure your frontend is making requests to the correct backend URL

3. **Database Connection**: Ensure your MongoDB Atlas cluster:
   - Has network access configured to allow connections from anywhere (0.0.0.0/0)
   - Has the correct connection string format

### Troubleshooting

#### Footer Links Not Working

- Check browser console for errors
- Verify that React Router is handling client-side routing correctly
- Ensure the backend is serving the `index.html` file for all routes

#### Build Failures

- Check that all dependencies are properly listed in package.json files
- Ensure Node.js version compatibility (use Node 18+)
- Check build logs in Render dashboard

#### API Connection Issues

- Verify the `VITE_API_URL` environment variable is set correctly
- Check that the backend service is running and accessible
- Test API endpoints directly using the backend URL

### Local Development

```bash
# Install all dependencies
npm run install-all

# Run both frontend and backend in development
npm run dev

# Or run separately
cd frontend && npm run dev
cd backend && npm run dev
```
