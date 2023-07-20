import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [loadingData, setLoadingData] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            await fetch("https://pf-back.fly.dev/home");
            setLoadingData(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoadingData(false); 
          }
        };
        fetchData();
      }, []);
      return (
        <>
          {loadingData ? (
            <div className="loading-screen">
               <div className="spinner"></div>
            </div>
          ) : null}
        </>
      );
    };
    
    export default Loading;