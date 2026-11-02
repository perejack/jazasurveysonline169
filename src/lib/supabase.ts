import { createClient } from '@supabase/supabase-js';

// Configuration for deployment
const supabaseUrl = 'https://kkmxfemeeuhtfuhjcith.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbXhmZW1lZXVodGZ1aGpjaXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NjgzNzksImV4cCI6MjEwMjM0NDM3OX0.j5Akrb-1jtBT_oqHUYb3i-7NlXePVDFBBMlWi-UANBc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          balance: number;
          total_earned: number;
          total_withdrawn: number;
          surveys_completed: number;
          surveys_pending: number;
          membership_tier: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          balance?: number;
          total_earned?: number;
          total_withdrawn?: number;
          surveys_completed?: number;
          surveys_pending?: number;
          membership_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          balance?: number;
          total_earned?: number;
          total_withdrawn?: number;
          surveys_completed?: number;
          surveys_pending?: number;
          membership_tier?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      surveys: {
        Row: {
          id: number;
          title: string;
          category: string;
          reward: number;
          duration: string;
          questions_count: number;
          premium: boolean;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          category: string;
          reward?: number;
          duration: string;
          questions_count: number;
          premium?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          category?: string;
          reward?: number;
          duration?: string;
          questions_count?: number;
          premium?: boolean;
          is_active?: boolean;
          created_at?: string;
        };
      };
      survey_questions: {
        Row: {
          id: number;
          survey_id: number;
          question_text: string;
          options: string[];
          question_order: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          survey_id: number;
          question_text: string;
          options: string[];
          question_order: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          survey_id?: number;
          question_text?: string;
          options?: string[];
          question_order?: number;
          created_at?: string;
        };
      };
      survey_completions: {
        Row: {
          id: string;
          user_id: string;
          survey_id: number;
          reward_earned: number;
          answers: Record<string, string>;
          completed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          survey_id: number;
          reward_earned: number;
          answers?: Record<string, string>;
          completed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          survey_id?: number;
          reward_earned?: number;
          answers?: Record<string, string>;
          completed_at?: string;
          created_at?: string;
        };
      };
      withdrawals: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          phone_number: string;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          transaction_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          phone_number: string;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          phone_number?: string;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          transaction_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_packages: {
        Row: {
          id: string;
          user_id: string;
          package_type: 'bronze' | 'silver' | 'gold' | 'platinum';
          price_paid: number;
          surveys_unlocked: number;
          is_active: boolean;
          purchased_at: string;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          package_type: 'bronze' | 'silver' | 'gold' | 'platinum';
          price_paid: number;
          surveys_unlocked?: number;
          is_active?: boolean;
          purchased_at?: string;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          package_type?: 'bronze' | 'silver' | 'gold' | 'platinum';
          price_paid?: number;
          surveys_unlocked?: number;
          is_active?: boolean;
          purchased_at?: string;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      survey_categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          unlock_price: number;
          earning_cap: number;
          surveys_available: number;
          reward_per_survey: number;
          icon: string;
          gradient: string;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          unlock_price: number;
          earning_cap: number;
          surveys_available: number;
          reward_per_survey: number;
          icon?: string;
          gradient?: string;
          is_active?: boolean;
          display_order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          unlock_price?: number;
          earning_cap?: number;
          surveys_available?: number;
          reward_per_survey?: number;
          icon?: string;
          gradient?: string;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      user_category_unlocks: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          unlocked_at: string;
          total_earned_in_category: number;
          surveys_completed_in_category: number;
          payment_status: 'pending' | 'completed' | 'failed';
          mpesa_checkout_request_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          unlocked_at?: string;
          total_earned_in_category?: number;
          surveys_completed_in_category?: number;
          payment_status?: 'pending' | 'completed' | 'failed';
          mpesa_checkout_request_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          unlocked_at?: string;
          total_earned_in_category?: number;
          surveys_completed_in_category?: number;
          payment_status?: 'pending' | 'completed' | 'failed';
          mpesa_checkout_request_id?: string | null;
          created_at?: string;
        };
      };
      mpesa_payments: {
        Row: {
          id: string;
          user_id: string;
          category_id: string | null;
          amount: number;
          phone_number: string;
          checkout_request_id: string;
          merchant_request_id: string;
          mpesa_receipt_number: string | null;
          status: 'pending' | 'processing' | 'completed' | 'failed';
          result_code: number | null;
          result_desc: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id?: string | null;
          amount: number;
          phone_number: string;
          checkout_request_id: string;
          merchant_request_id: string;
          mpesa_receipt_number?: string | null;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          result_code?: number | null;
          result_desc?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string | null;
          amount?: number;
          phone_number?: string;
          checkout_request_id?: string;
          merchant_request_id?: string;
          mpesa_receipt_number?: string | null;
          status?: 'pending' | 'processing' | 'completed' | 'failed';
          result_code?: number | null;
          result_desc?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
