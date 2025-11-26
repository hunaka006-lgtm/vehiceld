from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import requests
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            # Parse query parameters
            parsed_path = urlparse(self.path)
            query_params = parse_qs(parsed_path.query)
            
            # Get vehicle number from query
            vehicle_no = query_params.get('vehicle_no', ['DL01AB1234'])[0]
            if not vehicle_no:
                vehicle_no = query_params.get('vehicle', ['DL01AB1234'])[0]
            
            # Make POST request to target API
            response = requests.post(
                'https://gtplay.in/API/vehicle_challan_info/testapi.php',
                data={'vehicle_no': vehicle_no},
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
            
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_POST(self):
        # Same as GET
        self.do_GET()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
