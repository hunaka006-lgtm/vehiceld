export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const targetUrl = 'https://gtplay.in/API/vehicle_challan_info/testapi.php';

    try {
        let body = new URLSearchParams();

        // Handle GET requests
        if (req.method === 'GET') {
            const queryParams = Object.entries(req.query);

            if (req.query.vehicle_no) {
                body.append('vehicle_no', req.query.vehicle_no);
            } else if (req.query.vehicle) {
                body.append('vehicle_no', req.query.vehicle);
            } else if (req.query.number) {
                body.append('vehicle_no', req.query.number);
            } else if (queryParams.length === 1) {
                body.append('vehicle_no', queryParams[0][1]);
            } else {
                for (const [key, value] of queryParams) {
                    body.append(key, value);
                }
            }

            if ([...body.keys()].length === 0) {
                return res.status(400).json({
                    error: 'Missing parameters',
                    message: 'Please provide the vehicle_no parameter. Example: /api?vehicle_no=MH01AB1234'
                });
            }
        }
        // Handle POST requests
        else if (req.method === 'POST') {
            let incomingData = {};

            if (req.body && typeof req.body === 'object') {
                incomingData = req.body;
            } else if (typeof req.body === 'string') {
                try { incomingData = JSON.parse(req.body); }
                catch {
                    const parsed = new URLSearchParams(req.body);
                    for (const [k, v] of parsed) incomingData[k] = v;
                }
            }

            if (incomingData.vehicle_no) body.append('vehicle_no', incomingData.vehicle_no);
            else if (incomingData.vehicle) body.append('vehicle_no', incomingData.vehicle);
            else {
                for (const [key, value] of Object.entries(incomingData)) {
                    body.append(key, value);
                }
            }
        }

        // Forward the request to the target API
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'okhttp/5.1.0',
                'Accept-Encoding': 'gzip',
                'Connection': 'Keep-Alive'
            },
            body: body.toString()
        });

        // Get the response text
        const responseText = await response.text();

        // Try to parse as JSON
        try {
            const jsonData = JSON.parse(responseText);
            res.status(response.status).json(jsonData);
        } catch (e) {
            res.status(response.status).json({
                message: "Upstream response was not JSON",
                raw_response: responseText
            });
        }

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
