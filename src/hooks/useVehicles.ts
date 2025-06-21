
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Vehicle = Tables<'vehicles'>;

export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      console.log('Fetching vehicles from Supabase...');
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_featured', true)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
      }

      console.log('Vehicles fetched successfully:', data);
      return data as Vehicle[];
    },
  });
};
