export const DisplayCARD = ({ name }) => {
  if (!name) return null;
  
  return (
    <div className="result flex flex-col h-auto w-full max-w-md mx-auto overflow-hidden shadow-lg rounded-xl p-4 sm:p-6 bg-green-200/90 backdrop-blur-sm transition-all hover:shadow-xl">
      <div className="grid grid-cols-1 gap-2 md:gap-3">
        <h2 className="text-base md:text-lg font-extrabold border-b pb-1 mb-1">
          <span className="text-booth-dark">BOOTH:</span> {name?.Booth}
        </h2>
        
        <div className="grid grid-cols-2 gap-2">
          <h2 className="text-sm md:text-base font-bold">
            <span className="text-booth-dark">PAGE NO:</span> {name?.PN}
          </h2>
          <h2 className="text-sm md:text-base font-bold">
            <span className="text-booth-dark">SN:</span> {name?.SN}
          </h2>
          <h2 className="text-sm md:text-base font-bold">
            <span className="text-booth-dark">Door:</span> {name?.House_Number}
          </h2>
        </div>
        
        <h2 className="text-base md:text-lg font-extrabold border-b pb-1 mb-1 mt-1">
          <span className="text-booth-dark">Voter ID:</span> {name?.VoterID}
        </h2>
        
        <h2 className="text-base md:text-lg font-extrabold">
          <span className="text-booth-dark">NAME:</span> {name?.Name}
        </h2>
        
        <h2 className="text-sm md:text-base font-bold">
          <span className="text-booth-dark">Father/Husband:</span> {name?.Father_Husband}
        </h2>
        
        <h2 className="text-sm md:text-base font-bold">
          <span className="text-booth-dark">Vote Place:</span> {name?.Place}
        </h2>
      </div>
    </div>
  );
}; 