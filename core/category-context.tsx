"use client";
import React, { createContext, useContext, ReactNode } from 'react';


// For single-product (golf-ball) use, this context is simplified.
export interface CategoryContextValue {
  categoryId: 'golf-ball';
  brandName: 'FindMyIdealGolfBall';
}

const CategoryContext = createContext<CategoryContextValue | undefined>(undefined);

/**
 * Server-rendered layout passes only serializable scalars (categoryId, brandName).
 * Client components derive anything else via categoryRegistry[categoryId].
 */

// For single-product, always provides golf-ball context.
export function CategoryProvider({ children }: { children: ReactNode }) {
  return (
    <CategoryContext.Provider value={{ categoryId: 'golf-ball', brandName: 'FindMyIdealGolfBall' }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext(): CategoryContextValue {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategoryContext must be used within CategoryProvider');
  return ctx;
}
