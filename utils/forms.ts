import dayjs from "dayjs";

/*
<input type="datetime-local"> uses a weird format for the value, so we need these two functions to convert between
the input value and a Date object
*/

export function formatDateForInput(date: Date): string {
  return dayjs(date).format(inputFormat);
}

export function parseDateFromInput(value: string): Date {
  return dayjs(value, inputFormat).toDate();
}

const inputFormat = "YYYY-MM-DDTHH:mm";
