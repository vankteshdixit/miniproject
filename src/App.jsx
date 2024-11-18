import React, { useState } from 'react';
import { Bell, CheckCircle, PenLine, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const App = () => {
  const [page, setPage] = useState('home');
  const [petitions, setPetitions] = useState([
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
  ]);
  const [selectedPetition, setSelectedPetition] = useState(null);
  
  const HomePage = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Make Your Voice Heard</h1>
        <p className="text-lg text-gray-600 mb-8">
          Create and sign petitions that matter to your community
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => setPage('view')}
            className="flex items-center gap-2"
          >
            <Users size={20} />
            View Petitions
          </Button>
          <Button 
            onClick={() => setPage('create')}
            className="flex items-center gap-2"
          >
            <PenLine size={20} />
            Create Petition
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Card className="text-center p-6">
          <CardHeader>
            <Bell className="w-12 h-12 mx-auto text-blue-500" />
            <CardTitle>Start a Movement</CardTitle>
          </CardHeader>
          <CardContent>
            Create meaningful petitions that inspire change in your community
          </CardContent>
        </Card>
        
        <Card className="text-center p-6">
          <CardHeader>
            <Users className="w-12 h-12 mx-auto text-green-500" />
            <CardTitle>Gather Support</CardTitle>
          </CardHeader>
          <CardContent>
            Share your petition and collect signatures from supporters
          </CardContent>
        </Card>
        
        <Card className="text-center p-6">
          <CardHeader>
            <CheckCircle className="w-12 h-12 mx-auto text-purple-500" />
            <CardTitle>Make Impact</CardTitle>
          </CardHeader>
          <CardContent>
            Track progress and achieve your petition goals together
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ViewPetitions = () => (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Active Petitions</h2>
        <Button onClick={() => setPage('home')}>Back to Home</Button>
      </div>
      
      <div className="grid gap-6">
        {petitions.map(petition => (
          <Card key={petition.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{petition.title}</CardTitle>
              <CardDescription>Created by {petition.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{petition.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {petition.signatures} of {petition.signatureGoal} signatures
              </div>
              <Button 
                onClick={() => {
                  setSelectedPetition(petition);
                  setPage('details');
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const PetitionDetails = () => {
    const handleSign = () => {
      setPetitions(petitions.map(p => 
        p.id === selectedPetition.id 
          ? {...p, signatures: p.signatures + 1}
          : p
      ));
      setSelectedPetition({...selectedPetition, signatures: selectedPetition.signatures + 1});
    };

    return (
      <div className="max-w-2xl mx-auto p-8">
        <Button onClick={() => setPage('view')} className="mb-8">
          Back to Petitions
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedPetition.title}</CardTitle>
            <CardDescription>Created by {selectedPetition.creator}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-6">{selectedPetition.description}</p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>{selectedPetition.signatures} of {selectedPetition.signatureGoal}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(selectedPetition.signatures / selectedPetition.signatureGoal) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button onClick={handleSign} className="w-full">
              Sign This Petition
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const CreatePetition = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [signatureGoal, setSignatureGoal] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const newPetition = {
        id: petitions.length + 1,
        title,
        description,
        signatureGoal: parseInt(signatureGoal),
        signatures: 0,
        creator: 'Anonymous User'
      };
      setPetitions([...petitions, newPetition]);
      setPage('view');
    };

    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Create New Petition</h2>
          <Button onClick={() => setPage('home')}>Back to Home</Button>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Petition Details</CardTitle>
              <CardDescription>
                Fill out the information below to create your petition
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Petition Title</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, compelling title"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain your petition's purpose and goals"
                  className="min-h-32"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Signature Goal</label>
                <Input
                  required
                  type="number"
                  min="1"
                  value={signatureGoal}
                  onChange={(e) => setSignatureGoal(e.target.value)}
                  placeholder="Enter your target number of signatures"
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full">
                Create Petition
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {page === 'home' && <HomePage />}
      {page === 'view' && <ViewPetitions />}
      {page === 'details' && selectedPetition && <PetitionDetails />}
      {page === 'create' && <CreatePetition />}
    </div>
  );
};

export default App;