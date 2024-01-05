import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./column-header";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";


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
    {
        id: "actions",
        cell: ({ row }) => {
          const stock = row.original    
          return (
            <Link to={stock.symbol}>
                <Button>Подробнее</Button>
            </Link>
          )
        },
      },
]