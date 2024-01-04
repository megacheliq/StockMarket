import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";

export const columns: ColumnDef<Stock>[] = [
    {
        accessorKey: "symbol",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Символ" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Имя" />
        ),
    },
    {
        accessorKey: "ipo_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Первое размещение" />
        ),
    },
]