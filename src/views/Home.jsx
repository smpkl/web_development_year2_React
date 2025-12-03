import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import Single from './Single';
import {useMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {likes} = useUserContext();
  const {mediaArray, getMedia} = useMedia();

  useEffect(() => {
    getMedia();
  }, []);

  const removeItem = (id) => {
    const row = document.getElementById(id);
    console.log(id);
    row.remove();
  };

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
      <table className="table-fixed w-96">
        <thead>
          <tr className="*:px-2!">
            <th className="w-25">Thumbnail</th>
            <th className="w-20">Title</th>
            <th className="w-22">Username</th>
            <th className="w-40">Description</th>
            <th className="w-30">Created</th>
            <th className="w-20">Size</th>
            <th className="w-20">Type</th>
            <th className="w-22"></th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => {
            if (likes === null) {
              return;
            }
            const like = likes?.find((l) => l.media_id === item.media_id);

            return (
              <MediaRow
                key={`${item.media_id}-modal`}
                item={item}
                like={like ?? null}
                removeItem={removeItem}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
