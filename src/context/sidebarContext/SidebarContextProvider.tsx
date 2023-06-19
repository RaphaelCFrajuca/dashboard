/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

export interface SideBarContextType {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  maskPosition?: number;
  setMaskPosition?: (position: number) => void;
}

const SidebarContext = createContext<SideBarContextType>({
  isSidebarExpanded: false,
  toggleSidebar: () => {},
  maskPosition: 0,
  setMaskPosition: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [maskPosition, setMaskPosition] = useState<number>(0);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Define the context value
  const contextValues = useMemo(
    () => ({
      isSidebarExpanded,
      toggleSidebar,
      maskPosition,
      setMaskPosition,
    }),
    [isSidebarExpanded, maskPosition, setMaskPosition, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValues}>
      {children}
    </SidebarContext.Provider>
  );
};
export function useSidebar() {
  return useContext(SidebarContext);
}
