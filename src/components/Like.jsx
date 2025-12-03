import {useState} from 'react';
import {useEffect} from 'react';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

function Like(props) {
  const {user, reloadUserLikes} = useUserContext();
  let {item, like} = props;
  const [liked, setLiked] = useState(like !== null);
  const [likeCount, setLikeCount] = useState(0);
  const {postLike, deleteLike, getLikeCountByMediaId} = useLike();

  useEffect(() => {
    if (item.media_id === 67) console.log('LOADED', liked);
    getLikeCountByMediaId(item.media_id).then((response) => {
      setLikeCount(response.count);
    });
  }, []);

  return (
    <>
      <button
        className="rounded-full! flex justify-center items-center py-1! px-2!"
        onClick={async () => {
          if (user === null) {
            return;
          }
          console.log('Like post', item.media_id);
          if (liked) {
            await deleteLike(localStorage.getItem('token'), like.like_id).then(
              (response) => {
                if (response) {
                  setLiked(false);
                  setLikeCount(likeCount - 1);
                  reloadUserLikes();
                }
              },
            );
          } else {
            await postLike(localStorage.getItem('token'), item.media_id).then(
              (response) => {
                if (response) {
                  setLiked(true);
                  setLikeCount(likeCount + 1);
                  reloadUserLikes();
                }
              },
            );
          }
        }}
      >
        {likeCount}
        <svg
          className="block! w-4! ml-0.5 pt-0.5 h-4!"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          {liked ? (
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          ) : (
            <path
              fillRule="nonzero"
              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
            />
          )}
        </svg>
      </button>
    </>
  );
}

export default Like;
