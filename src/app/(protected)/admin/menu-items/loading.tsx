import CardWrapper from "@/components/auth/CardWrapper";
import LoadingSpinner from "@/components/share/LoadingSpinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full flex justify-center items-center shadow-2xl">
      <CardWrapper
        headerLabel="Fetching..."
        backButtonLabel="Back to home"
        backButtonHref="/"
      >
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner className="w-24 h-24 text-primary dark:text-primary-foreground" />
        </div>
      </CardWrapper>
    </div>
  );
};

export default Loading;
