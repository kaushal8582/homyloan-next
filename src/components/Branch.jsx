import React from "react";
import { MapPin } from "lucide-react";

const defaultBranches = [
  {
    name: "UNION MORTGAGE BRANCH",
    address: "1496 Morris Ave Suite 1 Union NJ, 282.1 mi",
    image: "/branch.svg",
  },
  {
    name: "UNION MORTGAGE BRANCH",
    address: "1496 Morris Ave Suite 1 Union NJ, 282.1 mi",
    image: "/branch2.svg",
  },
  {
    name: "UNION MORTGAGE BRANCH",
    address: "1496 Morris Ave Suite 1 Union NJ, 282.1 mi",
    image: "/branch3.svg",
  },
  {
    name: "UNION MORTGAGE BRANCH",
    address: "1496 Morris Ave Suite 1 Union NJ, 282.1 mi",
    image: "/branch4.svg",
  },
];

const Branch = ({ content }) => {
  const branches = content?.branches || defaultBranches;
  
  return (
    <section className="w-full py-20 px-8 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl shadow-md border w-full"
            >
              {/* Left Content */}
              <div className="space-y-2  p-4 w-[65%]">
                <h3 className="font-semibold text-sm block">{branch.name}</h3>

                <p className="text-sm text-gray-500 block">{branch.address}</p>

                <div className="flex items-center gap-3 pt-2">
                  <button className="bg-black text-white px-4 py-2 text-sm rounded-full">
                    Direction
                  </button>

                  <div className="w-9 h-9 rounded-full border flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <img
                src={branch.image}
                alt="Branch"
                className="w-[35%] h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branch;
