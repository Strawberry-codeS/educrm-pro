
import { supabase } from '../lib/supabase';
import { Metric } from '../types';

export const metricService = {
    async getMetrics() {
        const { data, error } = await supabase
            .from('metrics')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data as Metric[];
    }
};
