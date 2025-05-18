import { type ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="from-dark-50 to-dark-100 flex h-screen w-screen overflow-hidden bg-gradient-to-br">
      <div className="divide-dark-200/80 flex w-full divide-x">{children}</div>
    </div>
  );
};
