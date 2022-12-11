import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

function EmailForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
 
        emailjs.sendForm('service_au46z5s', 'template_ehnw6dw', form.current, 'M8KFb0Ew-2p9FTfkj')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
      };

    return (
        <div><form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form></div>
    )
}
export default EmailForm;
