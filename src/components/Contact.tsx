import { Heading } from "./Heading";

export const Contact = () => {
  return (
    <>
      <Heading>Contact</Heading>
      <form>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Email
            <input type="email" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Message
            <textarea name="message" required rows={6} />
          </label>
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
};
