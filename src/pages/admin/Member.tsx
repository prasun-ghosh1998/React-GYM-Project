import {
  Box,
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import {
  deleteMember,
  memberList,
  setLimit,
  setNext,
  setPrev,
  statusChange,
} from "../../store/slices/member.slice";
import AddMemberDialog from "../../components/AddMemberDialog";
import { planList } from "../../store/slices/plan.slice";
import type { PlanType } from "../../typeScript/type/plans.type";

const Member = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const dispatch = useAppDispatch();
  const { list, page, limit } = useAppSelector((state) => state.member);
  const { list: plans } = useAppSelector(
  (state) => state.plan
) as { list: PlanType[] };

  const handleClickOpen = () => {
    setOpen(true);
    setEditData(null);
  };

  useEffect(() => {
    dispatch(memberList({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    dispatch(planList({ params: { page: 1, limit: 100 } }));
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" color="#E6FF00">
          Gym Members
        </Typography>

        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ background: "linear-gradient(45deg, #1976d2, #42a5f5)" }}
        >
          Add Member
        </Button>
      </Box>
      <AddMemberDialog open={open} setOpen={setOpen} editData={editData} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Email</TableCell>
            <TableCell sx={{ color: "white" }}>Phone</TableCell>
            <TableCell sx={{ color: "white" }}>Plan</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row: any) => (
            <TableRow key={row.$id}>
              <TableCell sx={{ color: "white" }}>{row.name}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.email}</TableCell>
              <TableCell sx={{ color: "white" }}>{row.phone}</TableCell>

              {/* Plan Name */}
             <TableCell sx={{ color: "white" }}>
  {row.plan
    ? plans.find((p) => p.$id === row.plan)?.title
    : "N/A"}
</TableCell>

              {/* Status + Toggle */}
              <TableCell sx={{ color: "white" }}>
                <Switch
                  checked={row.status === "active"}
                  onChange={() =>
                    dispatch(
                      statusChange({
                        id: row.$id,
                        currentStatus: row.status,
                      }),
                    )
                  }
                />
                {row.status}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <Button
                  onClick={() => {
                    setEditData(row);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => dispatch(deleteMember(row.$id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                  onClick={() => dispatch(setPrev())}
                  disabled={page === 1}
                >
                  Prev
                </Button>

                <Typography>{page}</Typography>

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green" }}
                  onClick={() => dispatch(setNext())}
                >
                  Next
                </Button>

                {/* Limit */}
                <select
                  value={limit}
                  onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default Member;
