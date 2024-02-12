import LoadingSpinner from "@/components/share/LoadingSpinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="">
        <h1 className="uppercase mt-4">Loading...</h1>
        <LoadingSpinner className="w-24 h-24 text-primary" />
      </div>
    </section>
  );
};

export default Loading;
