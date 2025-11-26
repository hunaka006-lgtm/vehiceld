export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const targetUrl = 'https://gtplay.in/API/vehicle_challan_info/testapi.php';

    try {
        // Get vehicle_no from query
        const vehicleNo = req.query.vehicle_no || req.query.vehicle || Object.values(req.query)[0] || 'MH01AB1234';

        const body = `vehicle_no=${encodeURIComponent(vehicleNo)}`;

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': body.length.toString(),
            'User-Agent': 'okhttp/5.1.0',
            'Accept-Encoding': 'gzip'
        };

        // Debug info
        const debugInfo = {
            sending_to: targetUrl,
            method: 'POST',
            headers: headers,
            body: body,
            body_length: body.length
        };

        // Forward the request
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const responseText = await response.text();

        // Try to parse as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(responseText);
        } catch (e) {
            jsonData = { raw_response: responseText };
        }

        // Return both debug info and response
        res.status(200).json({
            debug: debugInfo,
            response: jsonData,
            status: response.status
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
}
