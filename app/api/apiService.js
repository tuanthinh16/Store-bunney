// apiService.js
const axios = require('axios');

const fetchData = async (url, method, data) => {
    try {
        const config = {
        method,
        url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': '8RI0pQktF3Z1ceZhKmIVQM0IfMqQxaK372TU1GC1JB6MXI59AdCsu5ogijKhHIcD', // Thay thế <API_KEY> bằng API key thực tế của bạn
        },
        data: data ? JSON.stringify(data) : null,
        };

        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    };

module.exports = {
    fetchData,
};
