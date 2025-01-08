import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import md5 from "crypto-js/md5";
import moment from "moment";

export const Home = () => {
  const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const API_KEY = import.meta.env.VITE_PUB_KEY;
  const TS = moment().format("YYYY-MM-DD HH:MM:SS");
  const HASH = md5(
    `${TS}${API_KEY}${import.meta.env.VITE_PRIV_KEY}`
  ).toString();
  const QUERY_PARAMS = `ts=${TS}&apikey=${API_KEY}&hash=${HASH}`;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<{
    characterName: string;
  }>();

  const onSubmit: SubmitHandler<{
    characterName: string;
  }> = async (data) => {
    console.log(data);

    // TODO: use .env variable - Adam Curl 2025-01-07
    // const res = fetch(`${ENDPOINT}/${data.characterName}`, {
    //   method: "GET",
    // }).then((res) => res.json());

    // console.log(res);
  };

  useEffect(() => {
    const charRes = fetch(`${ENDPOINT}/characters?${QUERY_PARAMS}`).then(
      (res) => {
        console.log(res.json());
        res.json();
      }
    );
    // console.log(charRes);
  }, [watch("characterName")]);

  return (
    <div>
      <h1>Marvel Stats</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter a Marvel character name"
          {...register("characterName", { required: true })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
