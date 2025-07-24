import React from "react";
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Dashboard = ({data}) => {
  // Widgets
  return (
    <>
     <Paper elevation={3} sx={{ p: 2, border: '2px solid', borderColor: 'primary.main', mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2}} >
            <Typography variant="h6" align="center">Java Projects</Typography>
            <Typography variant="h4" align="center">{data.javaProjects}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Impacted Java Projects</Typography>
            <Typography variant="h4" align="center">{data.impactedJavaProjects}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Python Projects</Typography>
            <Typography variant="h4" align="center">{data.pythonProjects}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" align="center">Impacted Python Projects</Typography>
            <Typography variant="h4" align="center">{data.impactedPythonProjects}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
    <Grid container spacing={3} sx={{ mt: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 ,border: '2px solid', borderColor: 'primary.main', mb: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>CIO KPI</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 400 }} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><b>Project</b></TableCell>
                  <TableCell align="center"><b>Java Impacted</b></TableCell>
                  <TableCell align="center"><b>Java %</b></TableCell>
                  <TableCell align="center"><b>Python Impacted</b></TableCell>
                  <TableCell align="center"><b>Python %</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.TableData.map((row) => {
                  const py = row.pythonProjects || row.PythonProjects;
                  const javaPercent = parseInt(row.JavaProjects.percentageImpact);
                  const pythonPercent = parseInt(py.percentageImpact);
                  const highlight = javaPercent > 50 || pythonPercent > 50;
                  return (
                    <TableRow key={row.id} sx={{ backgroundColor: highlight ? '#fce6e9ff' : '#dbf6ddff', transition: 'background 0.3s' }}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.JavaProjects.impacted}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', color: javaPercent > 50 ? 'error.main' : 'success.main' }}>{row.JavaProjects.percentageImpact}</TableCell>
                      <TableCell align="center">{py.impacted}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold', color: pythonPercent > 50 ? 'error.main' : 'success.main' }}>{py.percentageImpact}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} sx={{ p: 2 ,border: '2px solid', borderColor: 'primary.main', mb: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>Projects Trend</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.lineGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projectsAdded" stroke="#43a047" name="Projects per Quarter" />
              <Line type="monotone" dataKey="incompatibleProjects" stroke="#e53935" name="Incompatible Projects" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default Dashboard;