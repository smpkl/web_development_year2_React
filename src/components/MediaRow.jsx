import PropTypes from 'prop-types';

const MediaRow = (props) => {
  const {item} = props;

  return (
    <>
      <tr key={item.media_id}>
        <td>
          <img src={item.thumbnail} alt={item.title}></img>
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
      </tr>
    </>
  );
};

// PropType validation for item props.
MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
  }),
};

export default MediaRow;
