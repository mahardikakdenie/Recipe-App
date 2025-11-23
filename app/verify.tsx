// app/verify.tsx
import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { EmailOtpType } from '@supabase/supabase-js';

export default function Verify() {
  const { token, type, email } = useLocalSearchParams<{
    token?: string;
    type?: string;
    email?: string;
  }>();
  const router = useRouter();

  useEffect(() => {
    if (token && type && email) {
      const verify = async () => {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: type as EmailOtpType, // pastikan ini email OTP
        });

        if (error) {
          console.error('Verification failed:', error);
          alert('Verification failed. Please try again.');
        } else {
          alert('Email verified! You can now log in.');
        }

        router.replace('/(tabs)/auth');
      };

      verify();
    } else {
      console.warn('Missing token, type, or email');
      router.replace('/(tabs)/auth');
    }
  }, [router, token, type, email]);

  return null;
}
