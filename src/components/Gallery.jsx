const Gallery = ({ images}) => {
    return (
        <div>
            <h2> Your Screenshot Gallery!</h2>
            {/*TODO: conditional rendering for our images array inside of our return statement so that we only show our photo gallery when we actually have some images there and display a message if there are not any photos to show */}
            <div className="image-container">
            {images && images.length > 0 ? (
                // When we do have images, we can loop through them and display them in a list.
                images.map((pic, index) => (
                    <li className="gallery" key={index}>
                      <img
                        className="gallery-screenshot"
                        src={pic}
                        alt="Undefined screenshot from query"
                        width="500"
                      />
                    </li>
                  )
                )
            ) : (
                <div>
                <h3>You haven't made a screenshot yet!</h3>
                </div>
            )}
            </div>
        </div>
    );
};

export default Gallery;

