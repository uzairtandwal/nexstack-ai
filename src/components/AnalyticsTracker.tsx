"use client";

import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export const AnalyticsTracker = () => {
  useEffect(() => {
    const trackView = async () => {
      try {
        const { error } = await supabase.from('views').insert([{ 
          page: window.location.pathname,
          user_agent: navigator.userAgent
        }]);
        if (error) console.error('Error tracking view:', error);
      } catch (err) {
        console.error('Analytics error:', err);
      }
    };

    trackView();
  }, []);

  return null;
};
