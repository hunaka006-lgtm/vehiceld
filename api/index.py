from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api', methods=['GET', 'POST', 'OPTIONS'])
@app.route('/api/index', methods=['GET', 'POST', 'OPTIONS'])
def handler():
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        return ('', 200, headers)
    
    try:
        # Get vehicle number from query parameters
        vehicle_no = request.args.get('vehicle_no') or request.args.get('vehicle') or 'DL01AB1234'
        
        # Prepare the data for POST request
        data = {'vehicle_no': vehicle_no}
        
        # Make POST request to the target API
        response = requests.post(
            'https://gtplay.in/API/vehicle_challan_info/testapi.php',
            data=data,
            headers={
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'okhttp/5.1.0',
            }
        )
        
        # Try to parse JSON response
        try:
            result = response.json()
        except:
            result = {'raw': response.text}
        
        return (jsonify(result), 200, headers)
        
    except Exception as e:
        return (jsonify({'error': str(e)}), 500, headers)

# For local testing
if __name__ == '__main__':
    app.run(debug=True, port=5000)
