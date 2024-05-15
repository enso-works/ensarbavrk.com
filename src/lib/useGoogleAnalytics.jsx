'use client';

import { useEffect } from 'react';
import initializeGA from "@/lib/ga4";

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);
};
