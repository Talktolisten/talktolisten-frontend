import React, { useEffect, useState } from "react";
import { MessageText } from "react-native-gifted-chat";
import { COLORS } from "../../styles";

const TypingMessageText = (props) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    setText(""); // Reset text
    if (props.currentMessage.text) {
      setIsTyping(true);
      const timer = setInterval(() => {
        if (i < props.currentMessage.text.length) {
          setText((prevText) => prevText + props.currentMessage.text[i]);
          i++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 25);

      return () => clearInterval(timer);
    }
  }, [props.currentMessage.text]);

  return (
    <MessageText
      {...props}
      currentMessage={{
        ...props.currentMessage,
        text: isTyping ? text : props.currentMessage.text,
      }}
      containerStyle={{
        left: { padding: 4, borderRadius: 10 },
        right: { backgroundColor: COLORS.black, padding: 4, borderRadius: 10 },
      }}
      textStyle={{
        left: { color: COLORS.black },
        right: { color: COLORS.white },
      }}
      customTextStyle={{ fontSize: 14, lineHeight: 18 }}
    />
  );
};

export default TypingMessageText;
