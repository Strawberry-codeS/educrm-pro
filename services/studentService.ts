
import { supabase } from '../lib/supabase';
import { Student } from '../types';

export const studentService = {
    async getStudents() {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Student[];
    },

    async getStudentsByCategory(category: string) {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Student[];
    },

    async getStudent(id: string) {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Student;
    },

    async updateStudent(id: string, updates: Partial<Student>) {
        const { data, error } = await supabase
            .from('students')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Student;
    }
};
