import { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
//import { ActiveUser } from "../../state-management/state-slices/user-slice";
import Message from "./Message";

interface MessageDisplayProps {
  messageStream: [];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messageStream }) => {
  const [messagesToDisplay, setMessagesToDisplay] = useState<boolean>(false);
  //const { publicMessages }: any = useSelector((state) => state);
  //const { activeUser }: any = useSelector<any>((state) => state.user);

  useEffect(() => {
    //console.log("redux pub messages ", publicMessages);
    if (messageStream.length > 0) {
      setMessagesToDisplay(true);
    } else {
      setMessagesToDisplay(false);
    }
    // how can I get this to run the first time it changes, but not anymore?
  }, [messageStream]);

  return messagesToDisplay ? (
    <ShowMessages messageStream={messageStream} />
  ) : (
    <p>Nothing to display</p>
  );
};

const ShowMessages: React.FC<MessageDisplayProps> = ({ messageStream }) => {
  console.log(messageStream);
  return (
    <div className="flex align-bottom overflow-auto">
      <ul className="flex flex-col w-full max-w-full">
        {messageStream.map(
          (incomingMsg: { from_id: string; message: string }) => (
            <Message incomingMsg={incomingMsg} key={Math.random()} />
          )
        )}
      </ul>
    </div>
  );
};

export default MessageDisplay;
