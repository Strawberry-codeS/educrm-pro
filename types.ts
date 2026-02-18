
export enum ViewType {
  WORKTABLE = 'worktable',
  CUSTOMERS = 'customers',
  MESSAGES = 'messages',
  PROFILE = 'profile',
  CUSTOMER_DETAIL = 'customer_detail',
  EDIT_INFO = 'edit_info',
  TODO = 'todo'
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  age: number;
  tags: string[];
  status: string;
  timeout: string;
  currentTask: string;
  stage: 'Lead' | 'Opportunity';
  avatar?: string;
  category?: 'new' | 'followup' | 'visit';
}

export interface Metric {
  label: string;
  current: number;
  total: number;
  color: string;
  unit?: string;
  warning?: string;
}
