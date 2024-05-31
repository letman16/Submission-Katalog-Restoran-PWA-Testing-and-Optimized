import CONFIG from './config';

const API_ENDPOINT = {
  SHOW_RESTO: `${CONFIG.BASE_URL}/list`,
  DETAIL_RESTO: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  ADD_REVIEW: async (reviewData) => {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error adding review:', error);
      return { error: true, message: 'Failed to add review' };
    }
  },
};

export default API_ENDPOINT;
