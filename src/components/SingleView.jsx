const SingleView = (props) => {
  const {item, setSelectedItem} = props;
  return (
    <>
      <dialog open key={item.media_id}>
        <article>
          <header>
            <button
              class="close"
              onClick={() => setSelectedItem(null)}
            ></button>
            <h2>{item.title}</h2>
          </header>
          <p>{item.description}</p>
          {item.media_type.startsWith('video') ? (
            <video src={item.filename}></video>
          ) : item.media_type.startsWith('image') ? (
            <img src={item.filename} alt={item.title} />
          ) : null}
        </article>
      </dialog>
    </>
  );
};

export default SingleView;
