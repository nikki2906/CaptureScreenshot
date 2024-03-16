import { useState } from 'react';
import './App.css';
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';


function App() {
  // import the access key from .env file
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY
  // state variable to hold and display the current screenshot.
  const [currentImage, setCurrentImage] = useState(null);
  // state variable to keep track of all of the images we have taken
  const [prevImages, setPrevImages] = useState([]);
  // user inputs
  const [inputs, setInputs] = useState(
    {
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banner: "",
      width: "",
      height: "",
    }
  )
  // STEP 2: take user inputs, do input/error handling with them, and then make our API call to display our created image!
  const submitForm = () => {
    // error handling when user do not input any value in the form
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    }
    // TODO:  make sure that there is a url provided by the user. If there is no url, the API query should not be made -> let the user know using using alert().
    if (inputs.url == "" || inputs.url == " ") {
      alert("Please submit an URL!")
    }
    // check the rest of our inputs to see if we need to include any default values. Then, we are ready to make our API query string
    else {
      // do a loop over the inputs object to check if any of the values are empty strings. Empty: fill in with the default value from the defaultValues object
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key]
        }
      }
      // make sure to call our makeQuery() function after we have properly checked our inputs variable in our submitForm() function.
    makeQuery();
    }
  }

  // TODO: create a helper function called makeQuery(): take our input values & assemble them into the right query string format that our API call needs.
  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }

  // TODO:  async function to make our API call with our newly created query
  // make a fetch call with await, and save the response as a simple json since we added that nice response_type=json parameter to our query string
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    // if we didn't receive a URL back from our API call
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    }
    // if we do get a URL back, make it our currentImage and then reset
    else {
      setCurrentImage(json.url);
      // update state variable whenever we get a new image
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  }

  // TODO: create another helper function called reset()
  // set the current inputs values to "" so that our form is cleared after our API call
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banner: "",
      width: "",
      height: "",
    });
  }

  
  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>

      {/* include this conditional rendering to show the currentImage if it exists, and nothing otherwise */}
      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div> </div>
      )}

      {/*  add a container with the mock query string that users are assembling with their inputs in the form */}
      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>

      <br></br>
      <div className="container">
      <Gallery images={prevImages} />
    </div>
    </div>
    
  )
}

export default App
