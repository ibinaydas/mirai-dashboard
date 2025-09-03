import axios from 'axios';
import { DummyData } from '../data/DummyData';

export const fetchData = async () => {
    try {
        const response = await axios.get(process.env.API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
        return DummyData;
        // return null;
    }
};