import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
// import SingleView from '../components/SingleView';
import Single from './Single';
import {fetchData} from '../utils/fetchData';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData('test.json');
      setMediaArray(json);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      {selectedItem && (
        <Single
          key={selectedItem.media_id}
          item={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={`${item.media_id}-modal`} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
