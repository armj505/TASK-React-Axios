import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePet, getPetsById, updatePet } from "../api/pets";
// import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PetDetail = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  // const [petAdopt, setPetAdopt] = useState();
  // const [petData, setPetData] = useState({});

  // const callAPI = async () => {
  //   const res = await getPetsById(petId);
  //   setPetData(res);
  // };

  // useEffect(() => {
  //   callAPI();
  // }, []);
  // const adoptPet = () => {
  //   updatePet(petId, pet.name, pet.type, pet.image, pet.adopted);
  // };
  const newQueryClient = useQueryClient();
  const { data: petData, isLoading } = useQuery({
    queryKey: ["pets", petId],
    queryFn: () => getPetsById(petId),
  });
  const { mutate: adoptPet } = useMutation({
    mutationFn: () =>
      updatePet(petId, pet.name, pet.type, pet.image, !pet.adopted),
    onSuccess: () => {
      newQueryClient.invalidateQueries({ queryKey: ["pets", petId] });
    },
  });
  const { mutate: removePet } = useMutation({
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      navigate(-1);
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  const pet = petData;
  if (!pet) {
    return <h1>There is no pet with the id: {petId}</h1>;
  }

  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button
            onClick={adoptPet}
            className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5"
          >
            {pet.adopted ? "Set not adopted" : "Adopt"}
          </button>

          <button
            onClick={removePet}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
