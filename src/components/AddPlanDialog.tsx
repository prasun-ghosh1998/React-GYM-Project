import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../services/helper/redux";
import { addPlan, updatePlan } from "../store/slices/plan.slice";

type AddPlanDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
};

// Schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  price: yup.string().required("Price is required"),
  planFeture: yup.string().required("Feature is required"),
});

type FormData = {
  title: string;
  desc: string;
  price: string;
  planFeture: string;
};


const AddPlanDialog: React.FC<AddPlanDialogProps> = ({ open, setOpen, editData }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.plan);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

useEffect(() => {
  if (editData) {
    reset({
      title: editData.title,
      desc: editData.desc,
      price: editData.price,
      planFeture: editData.planFeture,
    });
  }else {
    reset({
      title: "",
      desc: "",
      price: "",
      planFeture: "",
    });
  }
}, [editData, reset]);

  const onSubmit = async (data: FormData) => {
  try {
    if (editData) {
      await dispatch(updatePlan({ id: editData.$id, data })).unwrap();
      toast.success("Plan Updated!");
    } else {
      await dispatch(addPlan(data)).unwrap();
      toast.success("Plan Added!");
    }

    reset();
    handleClose();
  } catch (err) {
    toast.error("Something went wrong");
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
  <DialogTitle>
    {editData ? "Edit Plan" : "Add Plan"}
  </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 350,
          }}
        >
          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            {...register("desc")}
            error={!!errors.desc}
            helperText={errors.desc?.message}
          />

          <TextField
            label="Price"
            type="number"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            label="Plan Feature"
            {...register("planFeture")}
            error={!!errors.planFeture}
            helperText={errors.planFeture?.message}
          />

          <Button type="submit" variant="contained" disabled={loading}>
  {loading
    ? editData
      ? "Updating..."
      : "Adding..."
    : editData
    ? "Update Plan"
    : "Add Plan"}
</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddPlanDialog;