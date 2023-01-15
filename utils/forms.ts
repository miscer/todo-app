import dayjs from "dayjs";

export function formatDateForInput(date: Date): string {
  return dayjs(date).format(inputFormat);
}

export function parseDateFromInput(value: string): Date {
  return dayjs(value, inputFormat).toDate();
}

const inputFormat = "YYYY-MM-DDTHH:mm";
