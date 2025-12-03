import {Link, useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useMedia} from '../hooks/apiHooks';
import {useState} from 'react';
import Like from './Like';

const MediaRow = (props) => {
  const {item, removeItem, like} = props;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const {user} = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const {deleteMedia, updateMedia} = useMedia();

  return (
    <>
      <tr className="max-h-34 *:px-2!" id={item.media_id}>
        <td>
          <div>
            <img className="thumbnail" src={item.thumbnail} alt={title}></img>
          </div>
        </td>
        <td>
          <div className="max-h-34">
            {isEditing ? (
              <input
                type="text"
                className="w-full! mb-0!"
                id={item.media_id + 'title-input'}
                value={title}
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            ) : (
              title
            )}
          </div>
        </td>
        <td>
          <div className="max-h-34">{item.username}</div>
        </td>
        <td>
          <div className="overflow-clip max-h-34">
            {isEditing ? (
              <input
                className="w-full! mb-0!"
                id={item.media_id + 'description-input'}
                type="text"
                value={description}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            ) : (
              description
            )}
          </div>
        </td>
        <td>
          <div className="max-h-34">
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </div>
        </td>
        <td>
          <div className="max-h-34">{item.filesize}</div>
        </td>
        <td>
          <div className="max-h-34">{item.media_type}</div>
        </td>
        <td>
          <div className="max-h-34 flex items-center justify-between">
            <div>
              <Like item={item} like={like}></Like>
            </div>
            <div className="max-h-34 flex flex-col gap-1 items-center justify-between">
              <Link to="/single" state={{item: item}}>
                <button className="w-20! no-underline! px-3! py-1! border-2 rounded-xl! border-transparent hover:rounded-xl! hover:no-underline!">
                  Select
                </button>
              </Link>
              {item?.username === user?.username ||
              user?.level_name === 'Admin' ? (
                <button
                  onClick={() => {
                    console.log('Delete', item);
                    deleteMedia(localStorage.getItem('token'), item.media_id);
                    removeItem(item.media_id);
                  }}
                  className="w-20! text-black! bg-red-600! rounded-xl! border-red-600! no-underline! px-3! py-1! border-4 hover:border-red-500! hover:text-red-500! hover:bg-transparent! hover:rounded-xl! hover:no-underline!"
                >
                  Delete
                </button>
              ) : null}
              {item?.username === user?.username ||
              user?.level_name === 'Admin' ? (
                <button
                  onClick={async () => {
                    if (isEditing) {
                      console.log('Save');
                      setIsEditing(false);
                      await updateMedia(
                        localStorage.getItem('token'),
                        item.media_id,
                        {
                          title,
                          description,
                        },
                      );
                      navigate(0);
                    } else {
                      console.log('Modify');
                      setIsEditing(true);
                    }
                  }}
                  className="w-20! no-underline! px-3! py-1! border-2 rounded-xl! border-transparent hover:rounded-xl! hover:no-underline!"
                >
                  {isEditing ? 'Save' : 'Modify'}
                </button>
              ) : null}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MediaRow;
