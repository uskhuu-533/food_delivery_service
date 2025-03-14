"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, MapPin, X } from "lucide-react";

import { useEffect, useState } from "react";
import { getUserAddress, putUser } from "@/utils/request";

const SelectLocation = () => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState(null);
  const onSubmit = async () => {
    try {
      const response = await putUser(location)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocation(value);
  };
  useEffect(() => {
    const getAddress = async () => {
      const token = localStorage.getItem("user");
      try {
        const response = await getUserAddress()
        setAddress(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex py-2 px-3 gap-1 bg-[#FFFFFF] rounded-full text-sm items-center">
          <MapPin stroke="#EF4444" size={20} />
          {!address ? (
            <>
              <div className="text-[#EF4444]">Delivery address</div>
              <div className="text-[#18181B80] ">Add location</div>
              <ChevronRight stroke="#18181B80" />
            </>
          ) : (
            <div className="flex items-center gap-10 max-w-[200px]">
              <p className="text-black truncate text-[#18181B80] text-sm">{address}</p>
              <X stroke="black" size={20}/>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Delivery address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            placeholder="Please provide specific address details such as building number, entrance, and apartment number"
            className="bg-[#FFFFFF] border w-full rounded-md h-full h-[100px] resize-none"
            rows={5}
            onChange={(e) => handleChangeValue(e)}
          ></textarea>
        </div>
        <DialogFooter>
          <Button className="bg-[none] border text-black">cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            Deliver here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SelectLocation;
