export type Order = "asc" | "desc";

export interface Column<T extends Record<string, any>> {
  id: keyof T & string;
  label: string;
  numeric: boolean;
}
