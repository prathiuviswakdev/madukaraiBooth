import { useContext } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function FetchID() {
  const { INPUT, setINPUT } = useContext(AppContext);

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["ID"],
    queryFn: async () => {
      try {
        const response = await axios.post(
          `/api/booths/ID?id=${INPUT}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: false, // Don't fetch on mount
    retry: 1,
  });

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg max-w-5xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-booth-dark">Search by Voter ID</h1>
     
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter Voter ID"
          className="border border-gray-300 rounded-xl px-3 py-2 w-full sm:flex-grow text-base focus:ring-2 focus:ring-booth-DEFAULT focus:border-transparent outline-none"
          onChange={(event) => {
            setINPUT(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') refetch();
          }}
        />
        <button
          className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-2 px-4 sm:px-6 rounded-xl transition-colors mt-2 sm:mt-0"
          onClick={refetch}
        >
          SEARCH
        </button>
      </div>

      {isError && (
        <div className="mt-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-sm md:text-base">
          Error: {error.message || "Failed to retrieve voter information"}
        </div>
      )}

      <div className="mt-6 md:mt-8">
        {isLoading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 md:h-12 md:w-12"></div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            {data && <DisplayCARD name={data} />}
            {data === null && (
              <div className="text-center py-8 md:py-10 text-gray-500 text-sm md:text-base">
                No voter found with this ID
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Set the page title
FetchID.pageTitle = "Search by Voter ID"; 