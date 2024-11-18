const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// In-memory store for petition data
let petitions = [
  {
    id: 1,
    title: 'Save Local Park',
    description: 'Protect our community park from commercial development',
    signatureGoal: 1000,
    signatures: 750,
    creator: 'Community Group'
  },
  {
    id: 2,
    title: 'Better Public Transport',
    description: 'Improve bus frequency and routes in our city',
    signatureGoal: 2000,
    signatures: 1200,
    creator: 'Transit Advocates'
  }
];

// Endpoint to get all petitions
app.get('/petitions', (req, res) => {
  res.json(petitions);
});

// Endpoint to sign a petition
app.post('/petitions/:id/sign', (req, res) => {
  const petitionId = parseInt(req.params.id);
  const petition = petitions.find(p => p.id === petitionId);

  if (!petition) {
    return res.status(404).json({ error: 'Petition not found' });
  }

  // Check if the user has already signed the petition
  const { username } = req.body;
  if (petition.signatures.includes(username)) {
    return res.status(400).json({ error: 'You have already signed this petition' });
  }

  // Add the new signature
  petition.signatures.push(username);
  petition.signatures = [...new Set(petition.signatures)]; // Remove duplicates
  res.json(petition);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});