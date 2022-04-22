import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";

// Importing Pages
import {
  HomePage,
  CreateNFT,
  CreatorDashboard,
  MarketPlace,
} from "./Pages/export";

const App = () => {
  return (
    <div>
      <Router>
        {/* Navigation */}
        <Navigation />

        {/* Setting the routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/create-nft" element={<CreateNFT />} />
          <Route path="/market-place" element={<MarketPlace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
