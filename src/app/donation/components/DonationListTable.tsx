import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { readDonation, deleteDonation } from "../DonationSlice";
import { DonationModel } from "../models/DonationModel";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../components/DataTable";

const DonationListTable: React.FC = () => {

  const donations: DonationModel[] = useSelector((state: { donation: { donations: DonationModel[] } }) => state.donation.donations);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: ColumnDef<DonationModel>[] = [
    {
      accessorKey: "donor",
      header: "Noms",
      size: 150,
    },
    {
      accessorKey: "donationType",
      header: "Types de Don",
      size: 75,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Montants</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "XAF",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
      size: 75,
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center">Description</div>,
      cell: ({ row }) => (
        <div className="description-cell">{row.getValue("description")}</div>
      ),
      size: 200, // Définir la largeur de la colonne en pixels
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const donation = row.original;

        return (
          <div className="text-center font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => dispatch(readDonation(donation.id))}>Voir</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(readDonation(donation.id));
                    navigate("/donation-form");
                  }}
                >
                  Editer
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={() => dispatch(deleteDonation(donation.id))}>Supprimer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      size: 50,
    },
  ];

  return (
    <div className="container mx-auto py-10">
        <DataTable columns={columns} data={donations} />
    </div>
  );
};

export default DonationListTable;
