import { Activity } from "src/app/admin-dashboard/interfaces/Activity";

export interface TimeData {
  state?: boolean
  id?: string;
  date: Date;
  activity: Activity;
  detail: string;
  hours: number;
  current_hours: number;
  edit: Boolean;

  titleDialog?: string
  checked?: boolean;
}

export interface ReportActivity {
  _id: string,
  name: string
}