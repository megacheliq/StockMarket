import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";

export const operationColumns: ColumnDef<Stock>[] = [
    {
        accessorKey: "operation_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Тип операции" />
        ),
    },
    {
        accessorKey: "stock_symbol",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Акция" />
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Количество" />
        ),
    },
    {
        accessorKey: "total_price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Сумма" />
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Дата операции" />
        ),
    },
]