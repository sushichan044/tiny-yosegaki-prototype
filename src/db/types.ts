import type { Table } from "drizzle-orm"

type SelectColumnsConfig<T extends Table> =
  T extends Table<infer Config>
    ? { [K in keyof Config["columns"]]?: boolean | undefined }
    : never

export type { SelectColumnsConfig }
