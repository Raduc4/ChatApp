type Props = {
  text: string;
  senderName: string;
};

const MessagePanel = ({ text, senderName }: Props) => {
  return (
    <div>
      <span>{senderName}</span>
      <span>{text}</span>
    </div>
  );
};

export default MessagePanel;
