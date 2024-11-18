import axios from 'axios';


const PetitionDetails = ({ petitionId }) => {
  const [petition, setPetition] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchPetition = async () => {
      const response = await axios.get(`http://localhost:3000/petitions/${petitionId}`);
      setPetition(response.data);
    };
    fetchPetition();
  }, [petitionId]);

  const handleSignPetition = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/petitions/${petitionId}/sign`, { username });
      setPetition(response.data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  // Rest of the component remains the same
};