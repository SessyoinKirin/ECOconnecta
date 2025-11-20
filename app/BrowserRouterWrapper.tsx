'use client';

import { BrowserRouter } from 'react-router-dom';

export default function BrowserRouterWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <BrowserRouter>{children}</BrowserRouter>;
}