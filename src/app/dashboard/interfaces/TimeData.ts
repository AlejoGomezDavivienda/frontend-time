export interface TimeData {
  id?: string;
  date: Date;
  activity: ReportActivity;
  detail: string;
  hours: number;
  current_hours: number;
  edit: Boolean;

  titleDialog?: string
}

export interface ReportActivity {
  _id: string,
  name: string
}