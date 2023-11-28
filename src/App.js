import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setMail] = useState('');

  const submit_data = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch(
        'http://localhost:9000/submit',
        {
          method: 'post',
          body: JSON.stringify({ name, email }),
          headers: {
            'Content-Type': 'application/json'
        }
        }
      );

      result = await result.json();
      console.log(result);

      if (result) {
        alert("Data saved successfully");
        setName("");
        setMail("");
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <h1>Submit Your Details</h1>
      <form onSubmit={submit_data} action=''>
        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='email' placeholder='Email' value={email} onChange={(e) => setMail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
