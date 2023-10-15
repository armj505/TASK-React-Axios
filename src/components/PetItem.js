import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePet } from "../api/pets";
import { useMutation } from "@tanstack/react-query";

const PetItem = ({ pet }) => {
  const navigate = useNavigate();
  const { mutate: removePet } = useMutation({
    mutationFn: () => deletePet(pet.id),
    onSuccess: () => {
      navigate(-1);
    },
  });
  return (
    <div className="w-[300px] h-[400px]  border border-black rounded-md flex flex-col justify-between items-center p-4">
      <h1 className="text-md font-bold">{pet.name}</h1>
      <img
        src={pet.image}
        alt={`${pet.name}-image`}
        className="w-[200px] rounded-md
      "
      />
      <Link to={`/pets/${pet.id}`}>
        <button className=" border border-black px-5 py-1 rounded-md hover:bg-[black] hover:text-white">
          View
        </button>
        <button
          onClick={removePet}
          className=" border border-black px-5 py-1 ms-2 rounded-md  hover:bg-red-400"
        >
          Delete
        </button>
      </Link>
    </div>
  );
};

export default PetItem;
