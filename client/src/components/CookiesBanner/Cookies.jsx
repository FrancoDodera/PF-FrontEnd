import React, { useEffect, useState } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === "true") {
      setShowBanner(false);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-300 p-4 flex justify-between items-center z-50">
          <p className="text-sm text-gray-800">
            This website uses cookies to offer you a better experience. By
            continuing to browse the site, you agree to our use of cookies.
            <a
              href="/politica-cookies"
              className="text-blue-500 underline ml-1"
            >
              Cookies Policy
            </a>
          </p>
          <button
            onClick={handleAcceptCookies}
            className="bg-[#016565] hover:bg-[#e1aca2] text-white py-1 px-4 rounded"
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
