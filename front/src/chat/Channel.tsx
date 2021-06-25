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
    <div className="w-60 border-2 mb-12 " onClick={onClick}>
      <h1 className="text-center mb-4">{idName}</h1>
      <h2 className="text-center mx-auto my-0">{participants}</h2>
    </div>
  );
};

export default Channel;
