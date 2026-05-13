import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  deletePlan,
  planList,
  setLimit,
  setNext,
  setPrev,
  statusChange,
} from "../../store/slices/plan.slice";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import AddPlanDialog from "../../components/AddPlanDialog";

const Plans = () => {
  const { list, page, limit } = useAppSelector(
    (state) => state.plan,
  );
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
    setEditData(null);
  };

  useEffect(() => {
    dispatch(planList({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  return (
    <Container>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" color="#E6FF00">Gym Price Management</Typography>

        <Button variant="contained" onClick={handleClickOpen} sx={{background: "linear-gradient(45deg, #1976d2, #42a5f5)"}} >
          Add Plan
        </Button>
      </Box>

      <AddPlanDialog open={open} setOpen={setOpen} editData={editData} />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow sx={{ backgroundColor: "#d6e3f0" }}>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Desc</TableCell>
              <TableCell>PlanFeture</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list?.map((row: any) => (
              <TableRow key={row.$id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>{row.planFeture}</TableCell>
                <TableCell sx={{display:"flex"}}>
                  {/* Status Toggle */}
                  <Switch
                    checked={row.status === "publish"}
                    onChange={() =>
                      dispatch(
                        statusChange({
                          id: row.$id,
                          currentStatus: row.status,
                        }),
                      )
                    }
                  />

                  {/* Edit */}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#d5d50e", ml: 1 }}
                    onClick={() => {
                      setEditData(row);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  {/* Delete */}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#dd3a2b", ml: 1 }}
                    onClick={() => dispatch(deletePlan(row.$id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Footer */}
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
      </TableContainer>
    </Container>
  );
};

export default Plans;
