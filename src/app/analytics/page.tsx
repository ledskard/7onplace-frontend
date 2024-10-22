"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../layout'; 


const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/models/`,
    { next: { revalidate: 1, tags: ["modelById"] } },
  );
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        //@ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Vercel Analytics Data</h1>
        {loading ? (
          <p>Loading analytics data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(analyticsData, null, 2)}</pre>
        )}
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
