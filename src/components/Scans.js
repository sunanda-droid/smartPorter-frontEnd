import React, { useState } from "react";
import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Scans = () => {
  // List of repositories for dropdown (mocked for now)
  const repoOptions = [
   {"repo": "java-Reboot_Demo", "value": "https://github.com/ELAKIYA2000/Reboot_Demo"},
   {"repo": "java-hello-world-with-maven", "value": "https://github.com/jabedhasan21/java-hello-world-with-maven"},
   {"repo": "springbootwebapp", "value": "https://github.com/springframeworkguru/springbootwebapp"},
   {"repo": "springboot-project", "value": "https://github.com/sqmax/springboot-project"},
   {"repo": "public-api-java", "value": "https://github.com/DependencyTrack/public-api-java"},
   {"repo": "javaparser-maven-sample", "value": "https://github.com/javaparser/javaparser-maven-sample"},
   {"repo": "spring-petclinic", "value": "https://github.com/spring-projects/spring-petclinic"}
  ];

  const [selectedRepo, setSelectedRepo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);


  // Use API base URL from .env
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  // Simulate API call on Run
  const handleRun = async () => {
    if (!selectedRepo) return;
    setLoading(true);
    try {
      // const res = await axios.get("/scans.json");
      const res = await axios.post(`http://35.244.60.32/check-compatibility?repoUrl=${selectedRepo}`);
      setTableData(res.data || []);
    } catch (err) {
      setTableData([]);
    }
    setLoading(false);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSummary, setDialogSummary] = useState("");
 const summaryBody={
        "repoUrl": selectedRepo,
        "dependencies": tableData
      }
  const handleSummaryClick = async () => {
    setDialogOpen(true);
    setUpgradeLoading(true);
    try {
      // const res = await axios.get("/scans.json");
     
      const res = await axios.post(`http://35.200.149.26/analyze-compatibility`,summaryBody);
      setDialogSummary(res.data);
    } catch (err) {
      setDialogSummary("No summary available");
    }
    setUpgradeLoading(false);
    setDialogOpen(true);
  };

  function areAllCompatible() {
  return tableData.every(scan => scan.compatibilityFlag === true);
}

  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");

  const handleAutoUpgrade = async () => {
    setUpgradeLoading(true);
    setUpgradeDialogOpen(true);
    try {
       const res = await axios.post("http://34.100.131.90/update-repo",summaryBody);
      // const res = await axios.post(`${API_BASE}/update-Repo`, { artifactId: scan.artifactId });
      setUpgradeMessage(res.data.message || "Upgrade completed.");
    } catch (err) {
      setUpgradeMessage("Upgrade failed.");
    }
    setUpgradeLoading(false);
  };

  const handleUpgradeDialogClose = () => {
    setUpgradeDialogOpen(false);
    setUpgradeMessage("");
    setUpgradeLoading(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogSummary("");
    setUpgradeLoading(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          mt: 3,
          width: '100%',
          maxWidth: '100vw',
          mx: 0,
          p: 2,
        }}
      >
      {/* Dropdown and Run button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 220 }} size="small">
          <InputLabel id="repo-label">Select Repository</InputLabel>
          <Select
            labelId="repo-label"
            value={selectedRepo}
            label="Select Repository"
            onChange={e => setSelectedRepo(e.target.value)}
          >
            {repoOptions.map(repo => (
              <MenuItem key={repo.repo} value={repo.value}>{repo.repo}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedRepo || loading}
          onClick={handleRun}
        >
          {loading ? "Loading..." : "Run"}
        </Button>
      </Box>

      {tableData.length > 0 && (
        <>
          <Table sx={{ width: '100%', minWidth: 1100, tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '14%' }}>Group Id</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '16%' }}>Artifact Id</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '13%' }}>Current Version</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '13%' }}>Latest Version</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '14%' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((scan, idx) => (
                <TableRow
                  key={scan.id}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? 'grey.100' : 'background.paper',
                    '&:hover': { backgroundColor: 'grey.200' },
                    transition: 'background 0.2s',
                  }}
                >
                  <TableCell sx={{ fontSize: 14, width: '14%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.groupId}</TableCell>
                  <TableCell sx={{ fontSize: 14, width: '16%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.artifactId}</TableCell>
                  <TableCell sx={{ fontSize: 14, width: '13%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.currentVersion}</TableCell>
                  <TableCell sx={{ fontSize: 14, width: '13%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.latestVersion}</TableCell>
                  <TableCell sx={{ fontSize: 14, width: '14%' }}>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        display: 'inline-block',
                        color:
                          scan.status === 'Up-to-date'
                            ? 'success.light'
                            : scan.status === 'Outdated'
                            ? 'info.light'
                            : 'error.light',
                        color:
                          scan.status === 'Up-to-date'
                            ? 'success.dark'
                            : scan.status === 'Outdated'
                            ? 'info.dark'
                            : 'error.dark',
                        fontWeight: 600,
                      }}
                    >
                      {scan.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
              onClick={() => tableData.length > 0 && handleSummaryClick(tableData[0])}
              disabled={tableData.length === 0}
            >
              View Report
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
              onClick={() => tableData.length > 0 && handleAutoUpgrade(tableData[0])}
              disabled={ tableData.length > 0 && !areAllCompatible()}
            >
              AutoUpgrade
            </Button>
          </Box>
        </>
      )}
      </TableContainer>
     
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        {upgradeLoading ? 
         <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              {/* <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                creating a featureBranch with updates
              </Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Genereating Report...</Typography>
                <Box sx={{ display: 'inline-block' }}>
                  <span className="MuiCircularProgress-root MuiCircularProgress-colorPrimary" style={{ width: 32, height: 32, display: 'inline-block', border: '4px solid #1976d2', borderRadius: '50%', borderTop: '4px solid #fff', animation: 'spin 1s linear infinite' }}></span>
                </Box>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </Box>
            </Box>:<>
               <DialogTitle>Compatibility Summary</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ py: 2 }}>
            {dialogSummary.replace(/\*/g, ' ')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained">Close</Button>
        </DialogActions></>
}
      </Dialog>
      <Dialog open={upgradeDialogOpen} onClose={handleUpgradeDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>AutoUpgrade Result</DialogTitle>
        <DialogContent>
          {upgradeLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                creating a featureBranch with updates
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 2 }}>Upgrading...</Typography>
                <Box sx={{ display: 'inline-block' }}>
                  <span className="MuiCircularProgress-root MuiCircularProgress-colorPrimary" style={{ width: 32, height: 32, display: 'inline-block', border: '4px solid #1976d2', borderRadius: '50%', borderTop: '4px solid #fff', animation: 'spin 1s linear infinite' }}></span>
                </Box>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ py: 2 }}>
              {upgradeMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpgradeDialogClose} color="primary" variant="contained" disabled={upgradeLoading}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}

export default Scans;