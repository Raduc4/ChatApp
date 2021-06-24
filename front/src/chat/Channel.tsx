type Props = {
  participants: number;
  idName: string;
  onClick: () => any;
};

const Channel = ({ idName, participants, onClick }: Props) => {
  const handleClick: JSX.IntrinsicElements["div"]["onClick"] = (e) => {
    console.log(e);
  };

  return (
    <div onClick={onClick}>
      <h1>{idName}</h1>
      <span>{participants}</span>
    </div>
  );
};

export default Channel;
