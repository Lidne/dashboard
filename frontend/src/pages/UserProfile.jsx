import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="grid grid-cols-3 gap-4">
        {user &&
          Object.entries(user).map(([key, value]) => (
            <div className="p-4 bg-slate-300 rounded-xl text-xl font-bold">
              {key} : {value}
            </div>
          ))}
        {!user && (
          <div className="p-4 bg-slate-300 rounded-xl text-xl font-bold">
            No data
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
