# Vehicle Challan Info Proxy (Python)

This is a Vercel Serverless Function (Python/Flask) that acts as a proxy for the Vehicle Challan Info API.

## How to Deploy

### Option 1: Deploy via Vercel Dashboard (EASIEST - No CLI needed!)

1. **Create a GitHub Account** (if you don't have one):
   - Go to [github.com](https://github.com) and sign up

2. **Create a new repository**:
   - Upload all files from this folder to GitHub

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up (use GitHub to login)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## Usage

Once deployed, access your API:

### Example 1: Using query parameter
```
GET https://your-project-name.vercel.app/api?vehicle_no=DL01AB1234
```

### Example 2: Using POST
```
POST https://your-project-name.vercel.app/api?vehicle_no=DL01AB1234
```

## Local Testing (Optional)

If you have Python installed:

```bash
pip install -r requirements.txt
python api/index.py
```

Then visit: `http://localhost:5000/api?vehicle_no=DL01AB1234`
