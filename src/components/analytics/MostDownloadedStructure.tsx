interface Props {
    mostDownloaded: { id: string; count: number };
  }
  
  const MostDownloadedStructure: React.FC<Props> = ({ mostDownloaded }) => {
    return (
      <div className="bg-primary p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-primaryBg mb-2">Most Downloaded Structure</h2>
        <p className="text-white">
          <span className="font-semibold">ID:</span> {mostDownloaded.id}
        </p>
        <p className="text-white">
          <span className="font-semibold">Downloads:</span> {mostDownloaded.count}
        </p>
      </div>
    );
  };
  
  export default MostDownloadedStructure;
  