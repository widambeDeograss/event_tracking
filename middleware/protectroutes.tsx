"use client"

import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const ComponentWithAuth = (props: any) => {
      const { user } = useAuth();
      const router = useRouter();
      const token =localStorage.getItem('authToken');
  
      useEffect(() => {
        if (!token) {
          router.replace('/login');  // Redirect to login page if not authenticated
        }
      }, [user, router]);
  
      // If the user is authenticated, render the wrapped component
      return user ? <WrappedComponent {...props} /> : null;
    };
  
    return ComponentWithAuth;
  };
  
  export default withAuth;