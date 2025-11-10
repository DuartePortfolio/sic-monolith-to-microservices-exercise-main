// For Node < 18, uncomment this:
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.fetchAllReviews = async () => {
  const response = await fetch("http://localhost:3003/reviews");
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }
  return response.json();
};
