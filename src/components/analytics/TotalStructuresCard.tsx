interface Props {
    totalStructures: number;
  }
  
  const TotalStructuresCard: React.FC<Props> = ({ totalStructures }) => {
    return (
      <div className="bg-primary p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold text-primaryBg mb-2">Total Structures</h2>
        <p className="text-3xl font-semibold text-white">{totalStructures}</p>
      </div>
    );
  };
  
  export default TotalStructuresCard;
  