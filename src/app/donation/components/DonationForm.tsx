import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDonation, updateDonation } from "../DonationSlice";
import { useNavigate } from "react-router-dom";
import { DonationModel } from "../models/DonationModel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

function DonationForm() {
  const donation: DonationModel = useSelector(
    (state: { donation: { currentDonation: DonationModel } }) =>
      state.donation.currentDonation
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm();

  const [donor, setDonor] = useState("");
  const [donationType, setDonationType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (donation !== null) {
      console.log("The value of donation is not null:", donation);
      setDonor(donation.donor);
      setDonationType(donation.donationType?.toLowerCase());
      setAmount(donation.amount);
      setDescription(donation.description??"");
    }
  }, [donation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    donation
      ? dispatch(
        updateDonation({
          id: donation.id,
          updateDonation: { donor, donationType, amount, description },
        })
      )
      : dispatch(createDonation({ donor, donationType, amount, description }));
    cleanForm();
    navigate(-1);
    console.log({ donor, donationType, amount });
  };

  const cleanForm = () => {
    setDonor("");
    setDonationType("");
    setAmount(0);
    setDescription("");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">
        {donation ? "Modifier un Don" : "Enregistrer un Don"}
      </h2>
      <Form {...form}>
        <form id="donation-form" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="donor"
            render={() => (
              <FormItem>
                <FormLabel>Nom du Donateur</FormLabel>
                <FormControl>
                  <Input value={donor} onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => setDonor(e.target.value)} type="text" placeholder="Nom du Donateur" />
                </FormControl>
                {/* <FormDescription>Le nom de la personne qui effectue le don.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="donationType"
            render={() => (
              <FormItem>
                <FormLabel>Type de Don</FormLabel>
                <FormControl>
                  <Select
                    // id="donationType"
                    value={donationType}
                    onValueChange={(e) => setDonationType(e)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le Type de Don" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>Type de Don</SelectLabel> */}
                        <SelectItem value="financier">Financier</SelectItem>
                        <SelectItem value="materiel">Matériel</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription>Le nom de la personne qui effectue le don.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={() => (
              <FormItem>
                <FormLabel>Montant</FormLabel>
                <FormControl>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Montant"
                    value={amount}
                    onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                  />
                  {/* <Input onchan type="number" placeholder="Valeur du Don"  /> */}
                </FormControl>
                {/* <FormDescription>Le nom de la personne qui effectue le don.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={() => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea id="description" value={description} onChangeCapture={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder="Description" />
                </FormControl>
                {/* <FormDescription>Le nom de la personne qui effectue le don.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4">
            Enregistrer
          </Button>
        </form>
      </Form>

    </div>
  );
}

export default DonationForm;

