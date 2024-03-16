
// pass in props (working in a form) -> can edit our inputs
const APIform = ({inputs, handleChange, onSubmit}) => {

    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Input true or false if you would like your website screenshot to not contain any ads",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
    ];

    // this is what we are returning on the page - what the user sees
    return (
        <div>
            <h2>Select Your Image Attributes:</h2>
            <form className="form-container">
                {/*turn dictionary inot an array of keys and values to loop thorugh using Object.entries */} 
                {/* checks if the inputs object exists using the inputs && */}
                {inputs &&
                    // If inputs object exists, the code uses the Object.entries() method to iterate over the properties of the inputs object & returns an array of key-value pairs from the inputs object
                    // map() function is then used to iterate over each key-value pair in the array returned by Object.entries()
                    Object.entries(inputs).map(([category, value], index) => (
                    // renders a list item (<li>) for each key-value pair. 
                    // The key attribute is set to the index value, which should be unique for each item in the list.
                    <li className="form" key={index}>
                        <h2>{category} </h2>
                        {/* <input> element that represents the form input */} 
                        <input
                        type="text"
                        // name attribute is set to the category name, which will be used to identify the input field
                        name={category}
                        value={value}
                        placeholder="Input this attribute..."
                        onChange={handleChange}
                        className="textbox"
                        />
                        <br></br>
                        <br></br>
                        <p> {inputsInfo[index]}</p>
                    </li>
                ))}
            </form>
            <button type="submit" className="button" onClick={onSubmit}> Take that Pic! 🎞</button>
        </div>
    );
};

export default APIform;