import { supabase } from './supabase';

export const api = {
  // 강좌 관련
  getCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*');
    if (error) throw error;
    return data;
  },

  createCourse: async (courseData) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select();
    if (error) throw error;
    return data[0];
  },

  updateCourse: async (id, updates) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }
};