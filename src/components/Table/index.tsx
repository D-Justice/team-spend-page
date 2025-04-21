import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CallData } from "../../interfaces/callData";

interface Props {
  data: CallData;
}

const CallDataTable: React.FC<Props> = ({ data }) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Call Summary
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography>
          <strong>Total Estimated Cost:</strong> ${data.totalEstimatedCost}
        </Typography>
        <Typography>
          <strong>Total Call Time:</strong>{" "}
          {data.totalCallTimeInHours} hours {data.totalCallTimeInMinutes} mins{" "}
          {data.totalCallTimeInSeconds} seconds
        </Typography>
        <Typography>
          <strong>Total Unique Participants:</strong> {data.totalUniqueParticipants}
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Call Details
      </Typography>

      {data.calls.map((call) => (
        <Accordion key={call.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Call ID: {call.id} — {call.numberOfParticipants} participant(s) — $
              {call.estimatedCost.toFixed(2)} — Duration:{" "}
              {call.callDurationHours} hours {call.callDurationMinutes} mins{" "}
              {call.callDurationSeconds} seconds
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {call.participants.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.jobTitle}</TableCell>
                    <TableCell>{user.mail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CallDataTable;
