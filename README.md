# Vehicle Challan Info Proxy (Python)

This is a Vercel Serverless Function (Python) with API Key authentication that acts as a proxy for the Vehicle Challan Info API.

## 🔐 API Key Setup

### Step 1: Set API Key in Vercel

1. Go to your Vercel project: [vehiceld.vercel.app](https://vercel.com/dashboard)
2. Click on **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `API_KEY`
   - **Value:** `your-secret-key-here` (अपनी secret key डालो)
4. Click **Save**
5. Go to **Deployments** tab and **Redeploy** the latest deployment

### Step 2: Generate a Strong API Key

You can use any random string, for example:
```
sk_live_abc123xyz789
```

Or generate one using Python:
```python
import secrets
print(secrets.token_urlsafe(32))
```

---

## 🚀 Deployment

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
   - **Before deploying, add Environment Variable:**
     - Name: `API_KEY`
     - Value: your secret key
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

3. **Set Environment Variable**:
   ```bash
   vercel env add API_KEY
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

---

## 📖 Usage

### Method 1: Using Query Parameter (Recommended)
```
GET https://vehiceld.vercel.app/api?key=your-secret-key-here&vehicle_no=DL01AB1234
```

### Method 2: Using Header
```bash
curl -H "X-API-Key: your-secret-key-here" \
  "https://vehiceld.vercel.app/api?vehicle_no=DL01AB1234"
```

### Example Response (Success):
```json
{
  "status": true,
  "data": {
    "vehicle_no": "DL01AB1234",
    "challan_info": [...]
  }
}
```

### Example Response (Invalid Key):
```json
{
  "status": false,
  "error": "Invalid or missing API key"
}
```

---

## 🔒 Security Notes

- **Never share your API key publicly**
- Store the key in Vercel Environment Variables (not in code)
- Use HTTPS only
- Rotate your key periodically

---

## 🧪 Local Testing (Optional)

If you have Python installed:

1. **Set environment variable:**
   ```bash
   # Windows (PowerShell)
   $env:API_KEY = "your-secret-key-here"
   
   # Linux/Mac
   export API_KEY="your-secret-key-here"
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run locally:**
   ```bash
   python api/index.py
   ```

4. **Test:**
   ```
   http://localhost:5000/api?key=your-secret-key-here&vehicle_no=DL01AB1234
   ```
