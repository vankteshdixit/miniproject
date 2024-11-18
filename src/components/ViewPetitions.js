import axios from 'axios';

const ViewPetitions = () => {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const fetchPetitions = async () => {
      const response = await axios.get('http://localhost:3000/petitions');
      setPetitions(response.data);
    };
    fetchPetitions();
  }, []);

  // Rest of the component remains the same
};