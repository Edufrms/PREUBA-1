
export interface Fair {
  id: string;
  name: string;
  location: string;
  date: string;
}

export interface Exhibitor {
  id: string;
  fairId: string;
  name: string;
  hall: string;
  stand: string;
  category: string;
  contactName?: string;
  email?: string;
}

export interface Meeting {
  id: string;
  fairId: string;
  exhibitorId: string;
  dateTime: string;
  location: string;
  notes: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Task {
  id: string;
  fairId: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export interface FairData {
  exhibitors: Exhibitor[];
  meetings: Meeting[];
  tasks: Task[];
}

export interface AppState {
  [fairId: string]: FairData;
}
