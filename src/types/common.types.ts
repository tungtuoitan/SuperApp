/**
 * Common Utility Types
 */

import { SxProps, Theme } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

// Component Props
export interface BaseComponentProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  style?: CSSProperties;
  className?: string;
}

export interface DialogProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string | ReactNode;
}

export interface ToolbarProps {
  children: ReactNode;
  sxBoxToolbar?: SxProps<Theme>;
}

export interface GridContainerProps extends BaseComponentProps {
  ref?: React.Ref<HTMLDivElement>;
}

// Icon types
export type IconType =
  | 'accounts'
  | 'conversation'
  | 'finance'
  | 'folder'
  | 'gratefulList'
  | 'home'
  | 'link'
  | 'library'
  | 'notes'
  | 'sidebar';

export interface IconProps {
  code: string;
  type?: IconType;
  props?: any;
}
