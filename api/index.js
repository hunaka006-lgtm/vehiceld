export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const vehicleNo = req.query.vehicle_no || req.query.vehicle || 'DL01AB1234';

        // Create the exact body format
        const formData = new URLSearchParams();
        formData.append('vehicle_no', vehicleNo);
        const bodyString = formData.toString();

        const response = await fetch('https://gtplay.in/API/vehicle_challan_info/testapi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': String(bodyString.length),
                'User-Agent': 'okhttp/5.1.0',
            },
            body: bodyString
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { raw: text };
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
