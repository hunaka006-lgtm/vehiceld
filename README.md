# Vehicle Challan Info Proxy

This is a Vercel Serverless Function that acts as a proxy for the Vehicle Challan Info API.

## How to Deploy

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   Run the following command in this directory:
   ```bash
   vercel
   ```
   Follow the prompts to set up the project.

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

## Usage

Once deployed, you can send POST requests to your Vercel URL:

```
POST https://your-project-name.vercel.app/api
Content-Type: application/json

{
  "param1": "value1",
  "param2": "value2"
}
```

The script will forward the parameters as `application/x-www-form-urlencoded` to `https://gtplay.in/API/vehicle_challan_info/testapi.php` and return the JSON response.
