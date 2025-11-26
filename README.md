# Vehicle Challan Info Proxy (Python)

This is a Vercel Serverless Function (Python) that acts as a proxy for the Vehicle Challan Info API.

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

---

## 📖 API Usage

### Method 1: GET Request
```
https://vehiceld.vercel.app/api?vehicle_no=DL01AB1234
```

### Method 2: Using cURL
```bash
curl "https://vehiceld.vercel.app/api?vehicle_no=DL01AB1234"
```

### Method 3: In Telegram Bot
```python
import requests

vehicle_no = "DL01AB1234"
url = f"https://vehiceld.vercel.app/api?vehicle_no={vehicle_no}"
response = requests.get(url)
data = response.json()
print(data)
```

---

## 📝 Example Responses

### Success Response:
```json
{
  "status": true,
  "data": {
    "registration_no": "DL01AB1234",
    "owner_name": "John Doe",
    "vehicle_class": "Motor Car",
    ...
  }
}
```

### Error Response:
```json
{
  "status": false,
  "error": "RC Data not found, please check vehicle number."
}
```

### Missing Parameter:
```json
{
  "status": false,
  "error": "Missing vehicle_no parameter"
}
```

---

## 🧪 Local Testing (Optional)

If you have Python installed:

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run locally:**
   ```bash
   python api/index.py
   ```

3. **Test:**
   ```
   http://localhost:5000/api?vehicle_no=DL01AB1234
   ```

---

## 🔗 Live API URL

Once deployed, your API will be available at:
```
https://vehiceld.vercel.app/api?vehicle_no=YOUR_VEHICLE_NUMBER
```

---

## 📱 Telegram Bot Integration

Use this URL in your Telegram bot:
```
https://vehiceld.vercel.app/api?vehicle_no={user_input}
```

Example:
```python
vehicle_number = update.message.text
api_url = f"https://vehiceld.vercel.app/api?vehicle_no={vehicle_number}"
response = requests.get(api_url)
data = response.json()

if data.get('status'):
    # Send vehicle data to user
    bot.send_message(chat_id, f"Vehicle Info: {data['data']}")
else:
    # Send error message
    bot.send_message(chat_id, f"Error: {data.get('error')}")
```
