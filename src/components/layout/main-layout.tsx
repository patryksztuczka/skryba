import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="bg-dark-100 flex h-screen w-screen">{children}</div>;
};
