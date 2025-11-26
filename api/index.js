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

        // Handle GET requests: use query parameters as the body
        if (req.method === 'GET') {
            // Example: /api?vehicle=MH01AB1234 -> body: vehicle=MH01AB1234
            for (const [key, value] of Object.entries(req.query)) {
                body.append(key, value);
            }

            // If no parameters provided in GET, return an error or instructions
            if ([...body.keys()].length === 0) {
                return res.status(400).json({
                    error: 'Missing parameters',
                    message: 'Please provide the vehicle number parameter. Example: /api?vehicle=MH01AB1234'
                });
            }
        }
        // Handle POST requests
        else if (req.method === 'POST') {
            if (req.body && typeof req.body === 'object') {
                for (const [key, value] of Object.entries(req.body)) {
                    body.append(key, value);
                }
            } else if (typeof req.body === 'string') {
                // If body is already a string (e.g. raw body), try to parse it or use as is
                try {
                    const jsonBody = JSON.parse(req.body);
                    for (const [key, value] of Object.entries(jsonBody)) {
                        body.append(key, value);
                    }
                } catch {
                    // Treat as pre-encoded string
                    body = new URLSearchParams(req.body);
                }
            }
        }

        // Forward the request to the target API
        const response = await fetch(targetUrl, {
            method: 'POST', // The target always expects POST
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'okhttp/5.1.0',
                'Accept-Encoding': 'gzip'
            },
            body: body
        });

        // Get the response text
        const responseText = await response.text();

        // Try to parse as JSON
        try {
            const jsonData = JSON.parse(responseText);
            res.status(response.status).json(jsonData);
        } catch (e) {
            // If response is not JSON, return it wrapped in a JSON object
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
