import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import {
  authenticateWithBiometrics,
  isBiometricsAvailable,
  isBiometricsEnabled,
  setBiometricsEnabled,
} from '@/hooks/useBiometrics';

type AuthStatus = 'loading' | 'unauthenticated' | 'locked' | 'authenticated';

interface AuthContextType {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  unlockWithBiometrics: () => Promise<boolean>;
  promptEnableBiometrics: () => Promise<boolean>;
  biometricsAvailable: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<Session | null>(null);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const available = await isBiometricsAvailable();
      if (mounted) setBiometricsAvailable(available);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      if (!newSession) {
        setSession(null);
        setStatus('unauthenticated');
        return;
      }

      // TOKEN_REFRESHED must not re-lock an already-unlocked session.
      // Resolve biometrics BEFORE setting state so both setSession + setStatus
      // fire in the same synchronous batch — prevents an intermediate render
      // where session exists but status is still 'unauthenticated'.
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        const enabled = await isBiometricsEnabled();
        if (!mounted) return;
        setSession(newSession);
        setStatus(enabled ? 'locked' : 'authenticated');
      } else {
        setSession(newSession);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Re-lock when the app comes back to the foreground
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (nextState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        const enabled = await isBiometricsEnabled();
        if (enabled && session) setStatus('locked');
      }
      appState.current = nextState;
    });
    return () => sub.remove();
  }, [session]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    await setBiometricsEnabled(false);
    setStatus('unauthenticated');
    setSession(null);
  }, []);

  const unlockWithBiometrics = useCallback(async (): Promise<boolean> => {
    const success = await authenticateWithBiometrics();
    if (success) setStatus('authenticated');
    return success;
  }, []);

  const promptEnableBiometrics = useCallback(async (): Promise<boolean> => {
    if (!biometricsAvailable) return false;
    const success = await authenticateWithBiometrics();
    if (success) await setBiometricsEnabled(true);
    return success;
  }, [biometricsAvailable]);

  const value = useMemo<AuthContextType>(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      signIn,
      signUp,
      signOut,
      unlockWithBiometrics,
      promptEnableBiometrics,
      biometricsAvailable,
    }),
    [status, session, biometricsAvailable, signIn, signUp, signOut, unlockWithBiometrics, promptEnableBiometrics]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
