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

import { useState } from "react";
import { putUser } from "@/utils/request";
import { useUser } from "@/provider/User-Provider";

const SelectLocation = () => {
  const { openAddressDialog, setOpenAddressDialog, user, refetchUser } =
    useUser();
  const [location, setLocation] = useState("");

  const onSubmit = async () => {
    setOpenAddressDialog(false);
    try {
      const response = await putUser(location);
      console.log(response);
      refetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocation(value);
  };

  return (
    <Dialog open={openAddressDialog}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpenAddressDialog(true)}
          className="flex py-2 px-3 gap-1 bg-[#FFFFFF] rounded-full text-sm items-center"
        >
          <MapPin stroke="#EF4444" size={20} />
          {!user?.address ? (
            <>
              <div className="text-[#EF4444]">Delivery address</div>
              <div className="text-[#18181B80] ">Add location</div>
              <ChevronRight stroke="#18181B80" />
            </>
          ) : (
            <div className="flex items-center gap-10 max-w-[200px]">
              <p className="text-black truncate text-[#18181B80] text-sm">
                {user.address}
              </p>
              <X stroke="black" size={20} />
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            onClick={() => setOpenAddressDialog(false)}
            className="flex justify-between"
          >
            {" "}
            Delivery address
            <Button>
              <X />
            </Button>
          </DialogTitle>
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
          <Button
            onClick={() => setOpenAddressDialog(false)}
            className="bg-[none] border text-black"
          >
            cancel
          </Button>
          <Button type="submit" onClick={onSubmit}>
            Deliver here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default SelectLocation;
